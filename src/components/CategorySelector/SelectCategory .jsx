import React, { useState, useEffect } from "react";
import Category from "../../utils/enums/Category";
import "./SelectCategory.css";

const SelectCategory = ({
  categories = Object.values(Category),
  selectedCategories = [],
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Ensure selectedCategories is always an array
  const selectedCategoriesArray = Array.isArray(selectedCategories)
    ? selectedCategories
    : [];

  const toggleCategory = (category) => {
    const updatedCategories = selectedCategoriesArray.includes(category)
      ? selectedCategoriesArray.filter((c) => c !== category)
      : [...selectedCategoriesArray, category];

    onChange(updatedCategories);
  };

  const handleInputClick = () => {
    setIsOpen(!isOpen);
  };

  const removeCategory = (category) => {
    const updatedCategories = selectedCategoriesArray.filter(
      (c) => c !== category
    );
    onChange(updatedCategories);
  };

  const handleOutsideClick = (e) => {
    if (e.target.closest(".category-selector")) return;
    setIsOpen(false);
  };

  // Close dropdown when clicking outside the component
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="category-selector">
      <div className="input-container">
        <input
          type="text"
          placeholder="Select Categories"
          value={selectedCategoriesArray.join(",  ")} // Ensure it's always an array
          onClick={handleInputClick}
          readOnly
        />
        {/* Render selected categories as chips */}
        {selectedCategoriesArray.length > 0 && (
          <div className="input-buttons">
            {selectedCategoriesArray.map((category) => (
              <div key={category} className="category-chip">
                <span>{category}</span>
                <button
                  className="remove-category-button"
                  onClick={() => removeCategory(category)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Dropdown list */}
      {isOpen && (
        <div className="category-dropdown">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-button ${
                selectedCategoriesArray.includes(category) ? "disabled" : ""
              }`}
              onClick={() => toggleCategory(category)}
              disabled={selectedCategoriesArray.includes(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectCategory;
