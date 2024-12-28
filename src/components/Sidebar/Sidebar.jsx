import React from "react";
import "./Sidebar.css";
import FilterUnit from "../FilterUnit/FilterUnit";

const Sidebar = ({ onFilter }) => {
  return (
    <aside className="sidebar">
      <FilterUnit onFilter={onFilter}></FilterUnit>
    </aside>
  );
};

export default Sidebar;
