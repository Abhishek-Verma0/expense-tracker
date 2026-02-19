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
        <div className="edit-grid">
          <input
            name="title"
            value={editForm.title}
            onChange={handleChange}
            placeholder="Title"
            className="edit-input"
          />
          <input
            name="amount"
            type="number"
            min="0"
            value={editForm.amount}
            onChange={handleChange}
            placeholder="Amount"
            className="edit-input"
          />
          <select name="type" value={editForm.type} onChange={handleChange} className="edit-select">
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <input
            name="category"
            value={editForm.category}
            onChange={handleChange}
            placeholder="Category"
            className="edit-input"
          />
          <input
            name="date"
            type="date"
            value={editForm.date}
            onChange={handleChange}
            className="edit-input"
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
      <div className="txn-col txn-title" data-label="Title">
        {txn.title}
      </div>

      <div
        className={`txn-col txn-amount ${txn.type === "income" ? "income" : "expense"}`}
        data-label="Amount"
      >
        {txn.type === "income" ? "+" : "-"} ₹
        {Number(txn.amount).toLocaleString("en-IN")}
      </div>

      <div className="txn-col txn-category" data-label="Category">
        {txn.category || "-"}
      </div>

      <div className="txn-col txn-date" data-label="Date">
        {txn.date || "-"}
      </div>

      <div className="txn-col txn-actions">
        <button className="btn-icon edit" onClick={() => setIsEditing(true)} title="Edit">
           ✎
        </button>
        <button className="btn-icon delete" onClick={() => onDelete(txn.id)} title="Delete">
           🗑
        </button>
      </div>
    </div>
  );
};

export default TransactionItem;
