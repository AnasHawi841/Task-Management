import React, { useState } from "react";
import SelectCategory from "../CategorySelector/SelectCategory ";
import Category from "../../utils/enums/Category";
import "./style.css";

// Modal content for upsert
const UpsertContent = ({ onClose }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (updatedCategories) => {
    setSelectedCategories(updatedCategories);
  };

  return (
    <form id="upsert">
      <div>
        <input type="text" placeholder="Task Name" />
      </div>
      <div>
        <textarea rows="3" placeholder="Task description (optional)"></textarea>
      </div>
      <div>
        <SelectCategory
          categories={Object.values(Category)}
          selectedCategories={selectedCategories}
          onChange={handleCategoryChange}
        />
      </div>
      <div className="footer">
        <button className="cancel_button" onClick={onClose}>
          Cancel
        </button>
        <button className="upsert_button">Create</button>
      </div>
    </form>
  );
};

// Modal content for delete
const DeleteContent = ({ onClose }) => (
  <div id="delete">
    <img src="/Images/DeleteDialog.png" alt="Delete Icon" />
    <h1>Delete Task!</h1>
    <p>Are you sure that you want to delete [Task_Name]?</p>
    <div style={{ display: "flex", gap: "10px" }}>
      <button className="cancel_button" onClick={onClose}>
        Cancel
      </button>
      <button className="delete_button">
        <i
          className="fas fa-trash"
          style={{ color: "white", marginRight: "10px" }}
        ></i>
        Delete
      </button>
    </div>
  </div>
);

// Update the MODES object to use the components
const MODES = {
  upsert: {
    header: "Create New Task",
    content: (onClose) => <UpsertContent onClose={onClose} />,
  },
  delete: {
    content: (onClose) => <DeleteContent onClose={onClose} />,
  },
};

export default MODES;
