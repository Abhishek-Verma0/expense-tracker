import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

import Navbar from "./components/navbar/Navbar";
import Dashboard from "./pages/Dashboard";
import AddTransaction from "./pages/AddTransaction";
import { getTransactions } from "./services/transactionService";

import Profile from "./pages/Profile";
import LandingPage from "./components/landing/LandingPage";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useEffect, useState } from "react";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ===== Global Transactions State =====
  const [transactions, setTransactions] = useState([]);

  // Add transaction (used by AddTransaction page)
  const handleAddTransaction = (newTxn) => {
    setTransactions((prev) => [newTxn, ...prev]);
  };

  // Delete transaction (future use)
  const handleDeleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((txn) => txn.id !== id));
  };

  // ===== Firebase Auth Listener =====
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Load user transactions from Firestore
  useEffect(() => {
    const loadTransactions = async () => {
      if (user) {
        const data = await getTransactions(user.uid);
        setTransactions(data);
      }
    };

    loadTransactions();
  }, [user]);

  // ===== Logout =====
  const handleLogout = async () => {
    await signOut(auth);
    setTransactions([]); // clear user data
  };

  // ===== Loading Screen =====
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
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Add Transaction */}
        <Route
          path="/addTransaction"
          element={
            user ? (
              <AddTransaction user={user} onAdd={handleAddTransaction} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={<Profile user={user} transactions={transactions} />}
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} />} />
      </Routes>
    </BrowserRouter>
  );
};;

export default App;
