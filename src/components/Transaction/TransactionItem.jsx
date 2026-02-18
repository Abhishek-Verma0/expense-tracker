import React from 'react'
    import "./transaction.css"
const TransactionItem = ({ txn }) => {
  return (
    <div className="transaction-item">
      <div className="txn-left">
        <h4>{txn.title}</h4>
        <p>
          {txn.category} • {txn.date}
        </p>
      </div>

      <div
        className={`txn-amount ${txn.type === "income" ? "income" : "expense"}`}
      >
        {txn.type === "income" ? "+" : "-"} ₹{txn.amount}
      </div>

      <div className="txn-actions">
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default TransactionItem;
