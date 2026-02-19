import React, { useState, useMemo } from "react";
import SpotlightCard from "../components/summary/SpotlightCard";
import FiltersBar from "../components/FilterItem/FiltersBar";
import TransactionItem from "../components/Transaction/TransactionItem";
import TransactionForm from "../components/Transaction/TransactionForm";
import ExpenseChart from "../components/Charts/ExpenseChart";
import { FaPlus } from "react-icons/fa";
import "./dashboard.css";

const Dashboard = ({ user, transactions, onDelete, onEdit, onAdd }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  // ── Filtered Transactions ──
  const filteredTransactions = useMemo(() => {
    if (!searchTerm) return transactions;
    return transactions.filter((txn) =>
      txn.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [transactions, searchTerm]);

  // ── Summary ──
  const { totalIncome, totalExpense, totalBalance } = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    return {
      totalIncome: income,
      totalExpense: expense,
      totalBalance: income - expense,
    };
  }, [transactions]);

  return (
    <div className="dashboard">
      <div className="dash-header-row">
        <h1 className="dash-head">Dashboard</h1>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <SpotlightCard spotlightColor="rgba(14,165,233,0.2)">
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

      {/* Charts */}
      {transactions.length > 0 && <ExpenseChart transactions={transactions} />}

      {/* Search / Filter */}
      <FiltersBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Transactions List */}
      <div className="transactions-list">
        {/* Table Header (Visual only, to match wireframe "List/Table") */}
        {filteredTransactions.length > 0 && (
           <div className="txn-header-row">
             <span>Title</span>
             <span>Amount</span>
             <span>Category</span>
             <span>Date</span>
             <span>Actions</span>
           </div>
        )}

        {filteredTransactions.length === 0 ? (
          <p className="dash-status">
            {searchTerm
              ? "No transactions match your search."
              : "No transactions yet. Add one!"}
          </p>
        ) : (
          filteredTransactions.map((txn) => (
            <TransactionItem
              key={txn.id}
              txn={txn}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))
        )}
      </div>

      {/* Floating Add Button */}
      <button
        className="fab-add"
        onClick={() => setShowModal(true)}
        aria-label="Add Transaction"
      >
        <FaPlus />
      </button>

      {/* Add Transaction Modal */}
      {showModal && (
        <TransactionForm
          onClose={() => setShowModal(false)}
          onSave={onAdd}
        />
      )}
    </div>
  );
};

export default Dashboard;
