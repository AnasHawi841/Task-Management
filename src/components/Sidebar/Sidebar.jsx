import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar_title">Filter</div>
      <div className="sidebar_section">
        <h4 className="sidebar_titleSection">Completion Status</h4>
        {["All", "Completed", "InComplete"].map((status) => {
          return (
            <div className="completion_filter">
              <input type="radio" name="choice" value={status} />
              <span>{status}</span>
            </div>
          );
        })}
      </div>
      <div className="sidebar_section">
        <h4 className="sidebar_titleSection">Categories</h4>
        {["All", "Category 01", "Category 02", "Category 03"].map(
          (category) => {
            return (
              <div className="completion_filter">
                <input type="radio" name="choice" value={category} />
                <span>{category}</span>
              </div>
            );
          }
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
