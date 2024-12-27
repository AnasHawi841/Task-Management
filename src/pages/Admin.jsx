import React, { useState } from "react";
import Form from "../components/Form/Form";
import Dialog from "../components/Dialog/Dialog";
import SelectCategory from "../components/CategorySelector/SelectCategory ";
import FilterUnit from "../components/FilterUnit/FilterUnit";
import TaskList from "../components/Task/TaskList";
import MODES from "../components/Dialog/DialogModes";
const Admin = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "tasks",
      description: "loreddsadasdsadsa",
      category: ["category01", "category02"],
    },
    {
      id: 2,
      name: "tasksaaaaaaa",
      description:
        "loreddsadasdsadssadasdsadadssadsadasddasadsadsadsadsaadsadssadsdadsasdadasdsaa",
      category: ["category01", "category02", "category03"],
    },
    {
      id: 3,
      name: "tasksaaaaaaa",
      description: "loreddsadasdsadsa",
      category: ["category01", "category02", "category03"],
    },
  ]);
  const [categories, setCategories] = useState([
    "category 01",
    "category 02",
    "category 03",
  ]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [filter, setFilter] = useState("All");

  const [isLoading, setIsLoading] = useState(false);

  // Add Task Handler
  // const handleAddTask = (newTask) => {
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setTasks([...tasks, { ...newTask, id: Date.now(), completed: false }]);
  //     setDialogState({ isOpen: false, type: "", task: null });
  //     setIsLoading(false);
  //   }, 400); // Simulate delay with debouncing
  // };

  // Edit Task Handler
  // const handleEditTask = (updatedTask) => {
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setTasks(
  //       tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
  //     );
  //     setDialogState({ isOpen: false, type: "", task: null });
  //     setIsLoading(false);
  //   }, 400);
  // };

  // Delete Task Handler
  // const handleDeleteTask = (taskId) => {
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setTasks(tasks.filter((task) => task.id !== taskId));
  //     setDialogState({ isOpen: false, type: "", task: null });
  //     setIsLoading(false);
  //   }, 400);
  // };

  // Filter and Categorize Tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return task;
    if (filter === "Incomplete") return !task.completed;
    if (filter === "Category") return selectedCategory.includes(task.category);
    return true;
  });

  const [dialogData, setDialogData] = useState({
    isOpen: false,
    mode: "Add", // Default mode
  });

  const openDialog = (type) => {
    setDialogData({
      isOpen: true,
      mode: type, // Pass mode correctly
    });
  };

  const closeDialog = () => {
    setDialogData({ ...dialogData, isOpen: false });
  };

  return (
    <div className="admin-container">
      {/* Filter Section */}
      {/* <div className="filter-section">
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
      </div> */}

      {/* Task List */}
      <TaskList
        tasks={filteredTasks}
        onEdit={(task) => openDialog("upsert")}
        onDelete={(task) => openDialog("delete")}
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
      {/* <button
        onClick={() =>
          setDialogState({ isOpen: true, type: "Add", task: null })
        }
        className="add-task-button"
      >
        Add Task
      </button> */}

      {/* Dialog */}
      <Dialog
        isOpen={dialogData.isOpen}
        mode={dialogData.mode}
        onClose={closeDialog}
      />

      {/* Loading Indicator */}
      {isLoading && <div className="loading-indicator">Loading...</div>}
    </div>
  );
};

export default Admin;
