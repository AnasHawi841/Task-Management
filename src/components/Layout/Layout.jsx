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
      <div>
        <Sidebar />
      </div>
    </div>
  );
};

export default Layout;
