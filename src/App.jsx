import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

import Navbar from "./components/navbar/Navbar";
import Dashboard from "./pages/Dashboard";
import {
  getTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} from "./services/transactionService";

import Profile from "./pages/Profile";
import LandingPage from "./components/landing/LandingPage";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useEffect, useState } from "react";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [transactions, setTransactions] = useState([]);

  // Load transactions
  useEffect(() => {
    const loadTransactions = async () => {
      if (user) {
        const data = await getTransactions(user.uid);

        setTransactions(data);
      }
    };

    loadTransactions();
  }, [user]);

  // Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Handlers
  const handleAddTransaction = async (newTxn) => {
    try {
      if (!user) return;
      const id = await addTransaction(user.uid, newTxn);
      const savedTxn = { id, ...newTxn };
      setTransactions((prev) => [savedTxn, ...prev]);
    } catch (error) {
      console.error("Error adding transaction:", error);
      alert("Failed to add transaction");
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      if (!user) return;
      await deleteTransaction(user.uid, id);
      setTransactions((prev) => prev.filter((txn) => txn.id !== id));
    } catch (error) {
      console.error("Error deleting transaction:", error);
      alert("Failed to delete transaction");
    }
  };

  const handleUpdateTransaction = async (id, updatedFields) => {
    try {
      if (!user) return;
      await updateTransaction(user.uid, id, updatedFields);
      setTransactions((prev) =>
        prev.map((txn) => (txn.id === id ? { ...txn, ...updatedFields } : txn))
      );
    } catch (error) {
      console.error("Error updating transaction:", error);
      alert("Failed to update transaction");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setTransactions([]);
  };

  if (loading) {
    return (
      <div
        style={{
          padding: "40px",
          color: "#fff",
          background: "#0f0f13",
          minHeight: "100vh",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={handleLogout} />

      <Routes>
        {/* Landing */}
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <LandingPage />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard
                user={user}
                transactions={transactions}
                onDelete={handleDeleteTransaction}
                onEdit={handleUpdateTransaction}
                onAdd={handleAddTransaction}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            <Profile user={user} transactions={transactions} />
          }
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
