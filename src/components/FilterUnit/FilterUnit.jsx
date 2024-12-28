import React, { useState } from "react";
import "./FilterUnit.css";

const FilterUnit = ({ title = [], onFilter }) => {
  const [selectedCategories, setSelectedCategories] = useState(["All"]);
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Change the status
  const handleStatusChange = (e) => {
    const status = e.target.value;
    setSelectedStatus(status);
    // Trigger filter update
    filterTitle(status, selectedCategories);
  };

  // Change the category
  const handleCategoryChange = (category) => {
    let newCategories;
    if (category === "All") {
      // Reset to "All" if "All" is selected
      newCategories = ["All"];
    } else {
      // Toggle category selection
      newCategories = selectedCategories.includes(category)
        ? selectedCategories.filter((cat) => cat !== category)
        : [...selectedCategories.filter((cat) => cat !== "All"), category];
    }

    setSelectedCategories(newCategories);

    // Trigger filter update
    filterTitle(selectedStatus, newCategories);
  };

  // Handle the title of the filter
  const filterTitle = (status, categories) => {
    if (Array.isArray(title) && title.length >= 2) {
      onFilter({
        [title[0]]: status,
        [title[1]]: categories,
      });
    } else if (title.length === 1) {
      onFilter({
        [title[0]]: status,
      });
    } else {
      console.error(
        "Invalid title prop. Expected an array with one or two elements."
      );
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
        {["All", "Completed", "Incomplete"].map((status) => (
          <div className="completion_filter" key={status}>
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
          (category) => (
            <div key={category} className="completion_filter">
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
