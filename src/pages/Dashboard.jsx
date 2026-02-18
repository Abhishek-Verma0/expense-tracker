import React from "react";
import SpotlightCard from "../components/summary/SpotlightCard";
import "./dashboard.css";
import { useState } from "react";
import FiltersBar from "../components/FilterItem/FiltersBar";
import TransactionItem from "../components/Transaction/TransactionItem";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // Dummy transactions
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      title: "Salary",
      amount: 50000,
      type: "income",
      category: "Job",
      date: "2026-02-01",
    },
    {
      id: 2,
      title: "Groceries",
      amount: 2000,
      type: "expense",
      category: "Food",
      date: "2026-02-02",
    },
    {
      id: 3,
      title: "Electricity Bill",
      amount: 1500,
      type: "expense",
      category: "Bills",
      date: "2026-02-03",
    },
  ]);
    const handleAddTransaction = (newTxn) => {
      setTransactions([newTxn, ...transactions]);
    };


  const filteredTransactions = transactions.filter((txn) =>
    txn.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Total Income
  const totalIncome = filteredTransactions
    .filter((txn) => txn.type === "income")
    .reduce((sum, txn) => sum + txn.amount, 0);

  // Total Expense
  const totalExpense = filteredTransactions
    .filter((txn) => txn.type === "expense")
    .reduce((sum, txn) => sum + txn.amount, 0);

  // Balance
  const totalBalance = totalIncome - totalExpense;

  return (
    <>
      <div className="dashboard">
        <h1 className="dash-head">Dashboard</h1>
        <div className="summary-cards">
          <SpotlightCard
            className="custom-spotlight-card"
            spotlightColor="rgba(0, 229, 255, 0.2)"
          >
            <h2>Total Balance</h2>
            <h3>₹ {totalBalance}</h3>
          </SpotlightCard>

          <SpotlightCard
            className="custom-spotlight-card"
            spotlightColor="rgba(0, 255, 100, 0.2)"
          >
            <h2>Total Income</h2>
            <h3>₹ {totalIncome}</h3>
          </SpotlightCard>
          <SpotlightCard
            className="custom-spotlight-card"
            spotlightColor="rgba(0, 255, 100, 0.2)"
          >
            <h2>Total Expense</h2>
            <h3>₹ {totalExpense}</h3>
          </SpotlightCard>
        </div>
        
        <FiltersBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="transactions-list">
          {filteredTransactions.length === 0 ? (
            <p>No transactions found</p>
          ) : (
            filteredTransactions.map((txn) => (
              <TransactionItem key={txn.id} txn={txn} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
