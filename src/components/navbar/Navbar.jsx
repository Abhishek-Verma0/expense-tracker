import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import "./nav.css";

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogoutClick = async () => {
    await onLogout();
    setIsMenuOpen(false);
    navigate("/profile");
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="nav">
      <div className="nav-container">
        {/* Logo */}
        <div className="app-title" onClick={() => navigate("/dashboard")}>
          FinFusion
        </div>

        {/* Desktop & Mobile Menu */}
        <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          {user ? (
            <>
              <NavLink to="/dashboard" onClick={closeMenu}>
                Dashboard
              </NavLink>

              <NavLink to="/profile" onClick={closeMenu}>
                Profile
              </NavLink>
              <button className="logout-btn" onClick={handleLogoutClick}>
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/profile" onClick={closeMenu}>
              Login
            </NavLink>
          )}

          {/* Theme Toggle (Inside menu on mobile, inline on desktop) */}
          <button className="theme-toggle-btn" onClick={toggleTheme}>
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        {/* Hamburger Icon */}
        <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
