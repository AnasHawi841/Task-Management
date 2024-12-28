import React, { useState, useRef } from "react";
import SelectCategory from "../CategorySelector/SelectCategory ";
import Category from "../../utils/enums/Category";
import "./Form.css";
const Form = ({
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
  // Validate if task name is filled
  const taskNameRef = useRef(null);

  const handleCategoryChange = (updatedCategories) => {
    setSelectedCategories(updatedCategories);
    setCategories(updatedCategories);
  };

  const handleCreateTask = () => {
    const newTask = {
      name: taskName,
      description: taskDescription,
      categories: selectedCategories,
      isComplete: isComplete,
    };
    onUpsertTask(newTask);
    onClose();
  };

  // Check if task name has a value using useRef
  const isTaskNameFilled =
    taskNameRef.current && taskNameRef.current.value.trim() !== "";

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
          ref={taskNameRef}
          type="text"
          placeholder="Task Name"
          value={taskName}
          required
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
        <button
          className="upsert_button"
          onClick={handleCreateTask}
          disabled={
            (!taskName && !isTaskNameFilled) || selectedCategories.length === 0
          }
        >
          {taskName ? "Save Changes" : "Create"}
        </button>
      </div>
    </form>
  );
};

export default Form;
