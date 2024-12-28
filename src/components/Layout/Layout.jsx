import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import "./Layout.css";

const Layout = ({ onFilter, onAddTask, children }) => {
  return (
    <div>
      <div>
        <Navbar onAddTask={onAddTask} />
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <Sidebar onFilter={onFilter} />
        <div className="children">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
