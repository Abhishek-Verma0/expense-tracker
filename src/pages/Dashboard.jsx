import React, { useEffect, useState } from "react";
import SpotlightCard from "../components/summary/SpotlightCard";
import FiltersBar from "../components/FilterItem/FiltersBar";
import TransactionItem from "../components/Transaction/TransactionItem";
import {
  fetchTransactions,
  deleteTransaction,
  updateTransaction,
} from "../services/transactionService";
import "./dashboard.css";

const Dashboard = ({ user }) => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ── Load transactions from Firestore on mount ──
  useEffect(() => {
    if (!user) return;
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchTransactions(user.uid);
        setTransactions(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load transactions. Please refresh.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user]);

  // ── Delete ──
  const handleDelete = async (txnId) => {
    try {
      await deleteTransaction(user.uid, txnId);
      setTransactions((prev) => prev.filter((t) => t.id !== txnId));
    } catch (err) {
      console.error(err);
      setError("Failed to delete transaction.");
    }
  };

  // ── Edit (inline save) ──
  const handleEdit = async (txnId, updatedFields) => {
    try {
      await updateTransaction(user.uid, txnId, updatedFields);
      setTransactions((prev) =>
        prev.map((t) => (t.id === txnId ? { ...t, ...updatedFields } : t)),
      );
    } catch (err) {
      console.error(err);
      setError("Failed to update transaction.");
    }
  };

  // ── Filtered list ──
  const filtered = transactions.filter((txn) =>
    txn.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalIncome = filtered
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + Number(t.amount), 0);

  const totalExpense = filtered
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + Number(t.amount), 0);

  const totalBalance = totalIncome - totalExpense;

  return (
    <div className="dashboard">
      <h1 className="dash-head">Dashboard</h1>

      {/* Summary Cards */}
      <div className="summary-cards">
        <SpotlightCard spotlightColor="rgba(0,229,255,0.2)">
          <h2>Total Balance</h2>
          <h3 className={totalBalance >= 0 ? "amt-positive" : "amt-negative"}>
            ₹ {totalBalance.toLocaleString("en-IN")}
          </h3>
        </SpotlightCard>

        <SpotlightCard spotlightColor="rgba(0,255,100,0.2)">
          <h2>Total Income</h2>
          <h3 className="amt-positive">
            ₹ {totalIncome.toLocaleString("en-IN")}
          </h3>
        </SpotlightCard>

        <SpotlightCard spotlightColor="rgba(255,80,80,0.2)">
          <h2>Total Expense</h2>
          <h3 className="amt-negative">
            ₹ {totalExpense.toLocaleString("en-IN")}
          </h3>
        </SpotlightCard>
      </div>

      {/* Error banner */}
      {error && <p className="dash-error">{error}</p>}

      {/* Filter / Search */}
      <FiltersBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Transactions List */}
      <div className="transactions-list">
        {loading ? (
          <p className="dash-status">Loading transactions...</p>
        ) : filtered.length === 0 ? (
          <p className="dash-status">
            {searchTerm
              ? "No transactions match your search."
              : "No transactions yet. Add one!"}
          </p>
        ) : (
          filtered.map((txn) => (
            <TransactionItem
              key={txn.id}
              txn={txn}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
