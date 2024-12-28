import React, { useState, useRef } from "react";
import SelectCategory from "../CategorySelector/SelectCategory ";
import useDebounce from "../../hooks/useDebounce";
import Loading from "../Loading/Loading";
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
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(categories);
  // Validate if task name is filled
  const taskNameRef = useRef(null);
  // Debounce task name,Description and selectedCategories  with 400ms delay
  const debouncedTaskName = useDebounce(taskName, 400);
  const debouncedDescription = useDebounce(taskDescription, 400);
  const debouncedCategories = useDebounce(selectedCategories, 400);
  // change the category
  const handleCategoryChange = (updatedCategories) => {
    setSelectedCategories(updatedCategories);
    setCategories(updatedCategories);
  };
  // create a task
  const handleCreateTask = () => {
    setIsLoading(true);
    const newTask = {
      name: debouncedTaskName,
      description: debouncedDescription,
      categories: debouncedCategories,
      isComplete: isComplete,
    };
    setTimeout(() => {
      onUpsertTask(newTask);
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  // Check if task name has a value using useRef
  const isTaskNameFilled =
    taskNameRef.current && taskNameRef.current.value.trim() !== "";

  return (
    <form
      id="upsert"
      onSubmit={(e) => {
        e.preventDefault();
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
            isLoading ||
            (!taskName && !isTaskNameFilled) ||
            selectedCategories.length === 0
          }
        >
          {taskName ? "Save Changes" : "Create"}
        </button>
      </div>
      {isLoading && <Loading></Loading>}
    </form>
  );
};

export default Form;
