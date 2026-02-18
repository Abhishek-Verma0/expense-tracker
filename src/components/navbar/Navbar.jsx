import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./nav.css";

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    await onLogout();
    navigate("/profile"); // redirect after logout
  };

  return (
    <div className="nav">
      {/* App Title */}
      <div className="app-title" onClick={() => navigate("/dashboard")}>
        FinFusion
      </div>

      {/* Navigation Links */}
      <div className="navLink">
        {user ? (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/addTransaction">Add Transaction</NavLink>
            <NavLink to="/profile">Profile</NavLink>

            <button className="logout-btn" onClick={handleLogoutClick}>
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/profile">Login</NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
