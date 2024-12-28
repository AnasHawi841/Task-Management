import React, { useState } from "react";
import "./FilterUnit.css";

const FilterUnit = ({ onFilter }) => {
  const [selectedCategories, setSelectedCategories] = useState(["All"]);
  const [selectedStatus, setSelectedStatus] = useState("All");

  const handleStatusChange = (e) => {
    const status = e.target.value;
    setSelectedStatus(status);
    onFilter({ status, categories: selectedCategories });
  };

  const handleCategoryChange = (category) => {
    if (category === "All") {
      // If "All" is selected, reset to only "All"
      setSelectedCategories(["All"]);
      onFilter({ status: selectedStatus, categories: ["All"] });
    } else {
      // Toggle category selection
      const newCategories = selectedCategories.includes(category)
        ? selectedCategories.filter((cat) => cat !== category)
        : [...selectedCategories.filter((cat) => cat !== "All"), category];

      setSelectedCategories(newCategories);
      onFilter({ status: selectedStatus, categories: newCategories });
    }
  };

  return (
    <>
      <div className="sidebar_title">Filter</div>

      {/* Status Filter */}
      <div className="sidebar_section">
        <h4 className="sidebar_titleSection" title="status">
          Completion Status
        </h4>
        {["All", "Completed", "InComplete"].map((status, index) => (
          <div className="completion_filter" key={index}>
            <input
              type="radio"
              name="status"
              value={status}
              checked={selectedStatus === status}
              onChange={handleStatusChange}
            />
            <span>{status}</span>
          </div>
        ))}
      </div>

      {/* Category Filter */}
      <div className="sidebar_section">
        <h4 className="sidebar_titleSection" title="category">
          Categories
        </h4>
        {["All", "Category 01", "Category 02", "Category 03"].map(
          (category, index) => (
            <div key={index} className="completion_filter">
              <input
                type="checkbox"
                name={category}
                value={category}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              <span>{category}</span>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default FilterUnit;
