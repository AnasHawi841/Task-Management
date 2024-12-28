import React, { useState, useEffect } from "react";
import Dialog from "../components/Dialog/Dialog";
import TaskList from "../components/Task/TaskList";

const Admin = ({ tasks, filters }) => {
  const [tasksList, setTasksList] = useState([]);

  // Use useEffect to set the initial state with the tasks prop
  useEffect(() => {
    let filteredTasks = tasks;

    // Filter by status
    if (filters.status === "Completed") {
      filteredTasks = filteredTasks.filter((task) => task.isComplete);
    } else if (filters.status === "InComplete") {
      filteredTasks = filteredTasks.filter((task) => !task.isComplete);
    }

    // Filter by categories
    if (!filters.categories.includes("All")) {
      filteredTasks = filteredTasks.filter((task) =>
        filters.categories.some((category) =>
          task.categories.includes(category)
        )
      );
    }

    setTasksList(filteredTasks);
  }, [tasks, filters]);

  const [isLoading, setIsLoading] = useState(false);

  const [dialogData, setDialogData] = useState({
    isOpen: false,
    mode: "upsert",
    taskName: "",
    taskDescription: "",
    categories: [],
    isComplete: false,
    taskId: "",
  });

  const openDialog = (type, task) => {
    setDialogData({
      isOpen: true,
      mode: type,
      taskName: task.name,
      taskDescription: task.description,
      categories: task.categories,
      taskId: task.id,
      isComplete: task.isComplete,
    });
  };

  const closeDialog = () => {
    setDialogData({ ...dialogData, isOpen: false });
  };

  const handleDeleteTask = (taskId) => {
    setTasksList(tasksList.filter((task) => task.id !== taskId)); // Remove the task by ID
  };
  const onToggleComplete = (taskId, isComplete) => {
    const indexOfTask = tasks.findIndex((task) => task.id === taskId);
    if (indexOfTask !== -1) tasks[indexOfTask].isComplete = isComplete;
    setTasksList((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isComplete } : task
      )
    );
  };
  const handleUpsertTask = () => {
    const newTask = {
      name: dialogData.taskName,
      description: dialogData.taskDescription,
      categories: dialogData.categories,
      isComplete: dialogData.isComplete,
      id: dialogData.taskId,
    };
    setTasksList(
      tasksList.map((task) => {
        if (task.id === newTask.id) {
          return newTask;
        }
        return task;
      })
    );
    closeDialog();
  };

  const handleCategoryChange = (updatedCategories) => {
    const indexOfTask = tasks.findIndex(
      (task) => task.id === dialogData.taskId
    );
    if (indexOfTask !== -1) tasks[indexOfTask].categories = updatedCategories;
    setDialogData((prevState) => ({
      ...prevState,
      categories: updatedCategories,
    }));
  };

  return (
    <div className="admin-container">
      {/* Task List */}
      <TaskList
        tasks={tasksList}
        onToggleComplete={onToggleComplete}
        onEdit={(task) => openDialog("upsert", task)}
        onDelete={(task) => openDialog("delete", task)}
      />
      {/* Dialog */}
      <Dialog
        isOpen={dialogData.isOpen}
        mode={dialogData.mode}
        onClose={closeDialog}
        onUpsertTask={handleUpsertTask}
        onDelete={handleDeleteTask}
        setTaskName={(name) => setDialogData({ ...dialogData, taskName: name })}
        setTaskDescription={(description) =>
          setDialogData({ ...dialogData, taskDescription: description })
        }
        taskName={dialogData.taskName}
        taskId={dialogData.taskId}
        taskDescription={dialogData.taskDescription}
        categories={dialogData.categories}
        setCategories={handleCategoryChange}
        isComplete={dialogData.isComplete}
      />
      {/* Loading Indicator */}
      {isLoading && <div className="loading-indicator">Loading...</div>}
    </div>
  );
};

export default Admin;
