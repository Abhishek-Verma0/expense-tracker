

import React from 'react'
import { NavLink } from 'react-router-dom';
import "./nav.css";
const Navbar = () => {
  return (
    <>
      <div className="nav">
        <div className="app-title">FinFusion</div>
        <div className='navLink'>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/addTransaction">Add Transaction</NavLink>
          <NavLink to="/profile">Profile</NavLink>
        </div>
      </div>
    </>
  );
}

export default Navbar
