import React, { useState } from "react";
import Category from "../../utils/enums/Category";
import "./SelectCategory.css";

const SelectCategory = ({
  categories = Object.values(Category),
  selectedCategories = [],
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCategory = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    onChange(updatedCategories);
  };

  const handleInputClick = () => {
    setIsOpen(!isOpen);
  };

  const removeCategory = (category) => {
    const updatedCategories = selectedCategories.filter((c) => c !== category);
    onChange(updatedCategories);
  };

  const handleOutsideClick = (e) => {
    if (e.target.closest(".category-selector")) return;
    setIsOpen(false);
  };

  // Close dropdown when clicking outside the component
  React.useEffect(() => {
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
          value={selectedCategories.join(",  ")}
          onClick={handleInputClick}
          readOnly
        />
        {/* Render selected categories as chips */}
        {selectedCategories.length > 0 && (
          <div className="input-buttons">
            {selectedCategories.map((category) => (
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
                selectedCategories.includes(category) ? "disabled" : ""
              }`}
              onClick={() => toggleCategory(category)}
              disabled={selectedCategories.includes(category)}
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
