import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, signup, logout } from "../services/authService";
import "./profile.css";

const Profile = ({ user, transactions = [] }) => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ===== Stats Calculation =====
  const totalTransactions = transactions.length;

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  // =============================

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isSignup) {
        await signup(form.email, form.password);
      } else {
        await login(form.email, form.password);
      }
      navigate("/dashboard");
    } catch (err) {
      setError("Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/profile");
  };

  return (
    <div className="profile-page">
      <h1>Profile</h1>

      {user ? (
        <>
          {/* User Info */}
          <div className="profile-card">
            <p>
              <strong>Email:</strong> {user.email}
            </p>
           
            <button onClick={handleLogout}>Logout</button>
          </div>

          {/* Account Stats */}
          <div className="profile-card">
            <h3>Account Summary</h3>
            <p>Total Transactions: {totalTransactions}</p>
            <p>Total Income: ₹ {totalIncome}</p>
            <p>Total Expense: ₹ {totalExpense}</p>
          </div>
        </>
      ) : (
        <div className="profile-card">
          <h2>{isSignup ? "Create Account" : "Login"}</h2>

          <form onSubmit={handleSubmit} className="auth-form">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            {error && <p className="profile-error">{error}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Please wait..." : isSignup ? "Sign Up" : "Login"}
            </button>
          </form>

          <p className="auth-toggle">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <span
              onClick={() => {
                setIsSignup(!isSignup);
                setError("");
              }}
            >
              {isSignup ? "Login" : "Sign Up"}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
