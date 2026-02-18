import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-wrapper">
      {/* Hero Section */}
      <section className="landing-hero">
        <div className="landing-hero-content">
          <div className="landing-badge">Personal Finance Tracker</div>
          <h1 className="landing-title">
            Take Control of <span className="landing-accent">Your Money</span>
          </h1>
          <p className="landing-subtitle">
            Track income, manage expenses, and visualize your financial health —
            all in one clean, modern dashboard.
          </p>
          <div className="landing-cta-group">
            <button
              className="landing-btn-primary"
              onClick={() => navigate("/profile")}
            >
              Get Started Free
            </button>
            <button
              className="landing-btn-secondary"
              onClick={() => navigate("/profile")}
            >
              Login
            </button>
          </div>
        </div>

        {/* Decorative card preview */}
        <div className="landing-preview">
          <div className="preview-card balance">
            <span className="preview-label">Total Balance</span>
            <span className="preview-amount">₹ 46,500</span>
          </div>
          <div className="preview-card income">
            <span className="preview-label">Income</span>
            <span className="preview-amount">₹ 50,000</span>
          </div>
          <div className="preview-card expense">
            <span className="preview-label">Expenses</span>
            <span className="preview-amount">₹ 3,500</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="landing-features">
        <h2 className="features-heading">Everything you need</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Dashboard Analytics</h3>
            <p>Get a bird's-eye view of your finances with live summary cards and totals.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">➕</div>
            <h3>Add Transactions</h3>
            <p>Quickly log income or expenses with category, date, and amount.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Filter & Search</h3>
            <p>Find any transaction instantly with keyword and category filters.</p>
          </div>

        </div>
      </section>

      {/* Footer CTA */}
      <section className="landing-footer-cta">
        <h2>Ready to start managing your finances?</h2>
        <button
          className="landing-btn-primary"
          onClick={() => navigate("/profile")}
        >
          Create Free Account
        </button>
      </section>
    </div>
  );
};

export default LandingPage;
