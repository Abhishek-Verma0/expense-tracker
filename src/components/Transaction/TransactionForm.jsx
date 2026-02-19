import { useState } from "react";
import "./TransactionForm.css";

const TransactionForm = ({ onClose, onSave }) => {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await onSave({
        title: form.title.trim(),
        amount: Number(form.amount),
        type: form.type,
        category: form.category.trim(),
        date: form.date,
      });
      onClose(); // Close modal on success
    } catch (err) {
      console.error(err);
      setError("Failed to save transaction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Transaction</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="transaction-form">
          <div className="form-group">
            <input
              className="form-input"
              name="title"
              placeholder="Title (e.g. Salary, Rent)"
              value={form.title}
              onChange={handleChange}
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <input
              className="form-input"
              name="amount"
              type="number"
              min="0"
              placeholder="Amount (₹)"
              value={form.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <select
              className="form-select"
              name="type"
              value={form.type}
              onChange={handleChange}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="form-group">
            <input
              className="form-input"
              name="category"
              placeholder="Category (e.g. Food, Bills)"
              value={form.category}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <input
              className="form-input"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="error-msg">{error}</p>}

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Saving..." : "Add Transaction"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
