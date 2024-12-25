import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Task Management</div>
      <button className="navbarButton">
        <span>+</span> New Task
      </button>
    </nav>
  );
};

export default Navbar;
