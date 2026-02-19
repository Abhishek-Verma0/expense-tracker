import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, signup, logout } from "../services/authService";
import { useTheme } from "../context/ThemeContext";
import "./profile.css";

const Profile = ({ user, transactions = [] }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
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
      {user ? (
        <>
          <h1 className="profile-title">Profile</h1>
          {/* User Info */}
          <div className="profile-card">
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            
            <div className="profile-actions">
               <div className="theme-toggle-row">
                 <span>Theme: {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
                 <button className="theme-btn" onClick={toggleTheme}>
                   Switch to {theme === 'dark' ? 'Light' : 'Dark'}
                 </button>
               </div>
               <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          </div>

          {/* Account Stats */}
          <div className="profile-card">
            <h3>Account Summary</h3>
            <p>Total Transactions: {totalTransactions}</p>
            <p>Total Income: ₹ {totalIncome.toLocaleString("en-IN")}</p>
            <p>Total Expense: ₹ {totalExpense.toLocaleString("en-IN")}</p>
          </div>
        </>
      ) : (
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-header">
              <h1 className="brand-title">FinFusion</h1>
              <p className="brand-subtitle">Track your expenses, master your finances.</p>
            </div>

            <h2>{isSignup ? "Create Account" : "Welcome Back"}</h2>

            <form onSubmit={handleSubmit} className="auth-form">
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
                className="auth-input"
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="auth-input"
              />

              {error && <p className="profile-error">{error}</p>}

              <button type="submit" disabled={loading} className="auth-submit-btn">
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
        </div>
      )}
    </div>
  );
};

export default Profile;
