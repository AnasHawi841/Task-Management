import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <Sidebar />
        <div className="children">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
