import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addTransaction } from "../services/transactionService";
import "./AddTransaction.css";

const AddTransaction = ({ user }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await addTransaction(user.uid, {
        title: form.title.trim(),
        amount: Number(form.amount),
        type: form.type,
        category: form.category.trim(),
        date: form.date,
      });

      setSuccess(true);
      setForm({
        title: "",
        amount: "",
        type: "expense",
        category: "",
        date: "",
      });

      // Go to dashboard after short delay
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      console.error(err);
      setError("Failed to save transaction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-page">
      <div className="add-container">
        <h2>Add Transaction</h2>

        <form onSubmit={handleSubmit} className="add-form">
          <input
            name="title"
            placeholder="Title (e.g. Salary, Rent)"
            value={form.title}
            onChange={handleChange}
            required
          />

          <input
            name="amount"
            type="number"
            min="0"
            placeholder="Amount (₹)"
            value={form.amount}
            onChange={handleChange}
            required
          />

          <select name="type" value={form.type} onChange={handleChange}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <input
            name="category"
            placeholder="Category (e.g. Food, Bills)"
            value={form.category}
            onChange={handleChange}
          />

          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
          />

          {error && <p className="add-error">{error}</p>}
          {success && (
            <p className="add-success">✓ Transaction saved! Redirecting...</p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Add Transaction"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
