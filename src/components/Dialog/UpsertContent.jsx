import React, { useState } from "react";
import SelectCategory from "../CategorySelector/SelectCategory ";
import Category from "../../utils/enums/Category";
import "./style.css";

const UpsertContent = ({
  onClose,
  taskName,
  setTaskName,
  taskDescription,
  setTaskDescription,
  onUpsertTask,
  setCategories,
  categories,
  isComplete,
}) => {
  const [selectedCategories, setSelectedCategories] = useState(categories);
  const handleCategoryChange = (updatedCategories) => {
    setSelectedCategories(updatedCategories);
    setCategories(updatedCategories);
  };
  console.log("taskName", taskName);
  const handleCreateTask = () => {
    const newTask = {
      name: taskName,
      description: taskDescription,
      categories: selectedCategories,
      isComplete: isComplete,
    };
    console.log(newTask);
    onUpsertTask(newTask);
    onClose();
  };

  return (
    <form
      id="upsert"
      onSubmit={(e) => {
        e.preventDefault();
        handleCreateTask();
      }}
    >
      <div>
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => {
            setTaskName(e.target.value);
          }}
        />
      </div>
      <div>
        <textarea
          rows="3"
          placeholder="Task description (optional)"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
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
        <button className="upsert_button" onClick={handleCreateTask}>
          {taskName ? "Save Changes" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default UpsertContent;
