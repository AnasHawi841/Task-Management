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
      ? selectedCategoriesArray.filter((c) => c !== category) // Remove if already selected
      : [...selectedCategoriesArray, category]; // Add if not selected

    onChange(updatedCategories);
  };

  const handleInputClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };
  // remove categories
  const removeCategory = (category) => {
    const updatedCategories = selectedCategoriesArray.filter(
      (c) => c !== category
    );
    onChange(updatedCategories);
  };
  // when click outside this component the list will close
  const handleOutsideClick = (e) => {
    if (e.target.closest(".category-selector")) return;
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="category-selector">
      <div className="input-container" onClick={handleInputClick}>
        <input
          type="text"
          placeholder={
            selectedCategoriesArray.length ? "" : "Select Categories"
          }
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
                  onClick={(e) => {
                    e.stopPropagation();
                    removeCategory(category);
                  }}
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
