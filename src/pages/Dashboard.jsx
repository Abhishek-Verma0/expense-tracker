import React from "react";
import SpotlightCard from "../components/summary/SpotlightCard";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <>
      <div className="dashboard">
        <h1 className="dash-head">Dashboard</h1>
        <div className="summary-cards">
          <SpotlightCard
            className="custom-spotlight-card"
            spotlightColor="rgba(0, 229, 255, 0.2)"
          >
            <h2>Total Balance</h2>
            <h3>₹ 42,000</h3>
          </SpotlightCard>

          <SpotlightCard
            className="custom-spotlight-card"
            spotlightColor="rgba(0, 255, 100, 0.2)"
          >
            <h2>Total Income</h2>
            <h3>₹ 60,000</h3>
          </SpotlightCard>
          <SpotlightCard
            className="custom-spotlight-card"
            spotlightColor="rgba(0, 255, 100, 0.2)"
          >
            <h2>Total Expense</h2>
            <h3>₹ 60,000</h3>
          </SpotlightCard>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
