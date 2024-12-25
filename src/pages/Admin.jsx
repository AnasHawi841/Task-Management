import React, { useState } from "react";
import Form from "../components/Form/Form";
import Dialog from "../components/Dialog/Dialog";
import SelectCategory from "../components/CategorySelector/SelectCategory ";
import FilterUnit from "../components/FilterUnit/FilterUnit";
import TaskList from "../components/Task/TaskList";

const Admin = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState(["Work", "Personal", "Urgent"]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [filter, setFilter] = useState("All");
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    type: "",
    task: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Add Task Handler
  const handleAddTask = (newTask) => {
    setIsLoading(true);
    setTimeout(() => {
      setTasks([...tasks, { ...newTask, id: Date.now(), completed: false }]);
      setDialogState({ isOpen: false, type: "", task: null });
      setIsLoading(false);
    }, 400); // Simulate delay with debouncing
  };

  // Edit Task Handler
  const handleEditTask = (updatedTask) => {
    setIsLoading(true);
    setTimeout(() => {
      setTasks(
        tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
      setDialogState({ isOpen: false, type: "", task: null });
      setIsLoading(false);
    }, 400);
  };

  // Delete Task Handler
  const handleDeleteTask = (taskId) => {
    setIsLoading(true);
    setTimeout(() => {
      setTasks(tasks.filter((task) => task.id !== taskId));
      setDialogState({ isOpen: false, type: "", task: null });
      setIsLoading(false);
    }, 400);
  };

  // Filter and Categorize Tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") return task.completed;
    if (filter === "Incomplete") return !task.completed;
    if (filter === "Category") return selectedCategory.includes(task.category);
    return true;
  });

  return (
    <div className="admin-container">
      <h1>Admin Task Management</h1>

      {/* Filter Section */}
      <div className="filter-section">
        <FilterUnit
          title="Filter by Status"
          filterOptions={["All", "Completed", "Incomplete"]}
          onFilter={(option) => setFilter(option)}
        />
        <SelectCategory
          categories={categories}
          onChange={(selected) => {
            setSelectedCategory(selected);
            setFilter("Category");
          }}
        />
      </div>

      {/* Task List */}
      <TaskList
        tasks={filteredTasks}
        onEdit={(task) => setDialogState({ isOpen: true, type: "Edit", task })}
        onDelete={(task) =>
          setDialogState({ isOpen: true, type: "Delete", task })
        }
        onToggleComplete={(taskId) =>
          setTasks(
            tasks.map((task) =>
              task.id === taskId
                ? { ...task, completed: !task.completed }
                : task
            )
          )
        }
      />

      {/* Add Task Button */}
      <button
        onClick={() =>
          setDialogState({ isOpen: true, type: "Add", task: null })
        }
        className="add-task-button"
      >
        Add Task
      </button>

      {/* Dialog */}
      <Dialog
        isOpen={dialogState.isOpen}
        onClose={() => setDialogState({ isOpen: false, type: "", task: null })}
      >
        {dialogState.type === "Add" && <Form onSubmit={handleAddTask} />}
        {dialogState.type === "Edit" && (
          <Form initialData={dialogState.task} onSubmit={handleEditTask} />
        )}
        {dialogState.type === "Delete" && (
          <div>
            <p>Are you sure you want to delete this task?</p>
            <button onClick={() => handleDeleteTask(dialogState.task.id)}>
              Yes
            </button>
            <button
              onClick={() =>
                setDialogState({ isOpen: false, type: "", task: null })
              }
            >
              No
            </button>
          </div>
        )}
      </Dialog>

      {/* Loading Indicator */}
      {isLoading && <div className="loading-indicator">Loading...</div>}
    </div>
  );
};

export default Admin;