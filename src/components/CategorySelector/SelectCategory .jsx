import React, { useState } from "react";

const SelectCategory = ({ categories, onChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleCategory = (category) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updated);
    onChange(updated);
  };

  return (
    <div className="category-selector">
      {categories.map((category) => (
        <button
          key={category}
          className={selectedCategories.includes(category) ? "selected" : ""}
          onClick={() => toggleCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default SelectCategory;
