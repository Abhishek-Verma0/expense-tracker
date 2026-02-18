import React, { useState } from "react";
import "./transaction.css";

const TransactionItem = ({ txn, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: txn.title,
    amount: txn.amount,
    type: txn.type,
    category: txn.category,
    date: txn.date,
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    await onEdit(txn.id, {
      title: editForm.title.trim(),
      amount: Number(editForm.amount),
      type: editForm.type,
      category: editForm.category.trim(),
      date: editForm.date,
    });
    setSaving(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      title: txn.title,
      amount: txn.amount,
      type: txn.type,
      category: txn.category,
      date: txn.date,
    });
    setIsEditing(false);
  };

  // ── Edit mode ──
  if (isEditing) {
    return (
      <div className="transaction-item editing">
        <div className="edit-fields">
          <input
            name="title"
            value={editForm.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <input
            name="amount"
            type="number"
            min="0"
            value={editForm.amount}
            onChange={handleChange}
            placeholder="Amount"
          />
          <select name="type" value={editForm.type} onChange={handleChange}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <input
            name="category"
            value={editForm.category}
            onChange={handleChange}
            placeholder="Category"
          />
          <input
            name="date"
            type="date"
            value={editForm.date}
            onChange={handleChange}
          />
        </div>
        <div className="txn-actions">
          <button className="btn-save" onClick={handleSave} disabled={saving}>
            {saving ? "..." : "Save"}
          </button>
          <button className="btn-cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // ── View mode ──
  return (
    <div className="transaction-item">
      <div className="txn-left">
        <h4>{txn.title}</h4>
        <p>
          {txn.category && <span>{txn.category}</span>}
          {txn.category && txn.date && <span> • </span>}
          {txn.date && <span>{txn.date}</span>}
        </p>
      </div>

      <div
        className={`txn-amount ${txn.type === "income" ? "income" : "expense"}`}
      >
        {txn.type === "income" ? "+" : "-"} ₹
        {Number(txn.amount).toLocaleString("en-IN")}
      </div>

      <div className="txn-actions">
        <button className="btn-edit" onClick={() => setIsEditing(true)}>
          Edit
        </button>
        <button className="btn-delete" onClick={() => onDelete(txn.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TransactionItem;
