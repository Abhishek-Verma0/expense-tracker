import { useState } from "react";
import "./AddTransaction.css";

const AddTransaction = ({ onAdd }) => {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "",
    date: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTxn = {
      id: Date.now(),
      title: form.title,
      amount: Number(form.amount),
      type: form.type,
      category: form.category,
      date: form.date,
    };

    onAdd(newTxn);

    setForm({
      title: "",
      amount: "",
      type: "expense",
      category: "",
      date: "",
    });
  };

  return (
    <div className="add-page">
      <div className="add-container">
        <h2>Add Transaction</h2>

        <form onSubmit={handleSubmit} className="add-form">
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <input
            name="amount"
            type="number"
            placeholder="Amount"
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
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
          />

          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
          />

          <button type="submit">Add Transaction</button>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
