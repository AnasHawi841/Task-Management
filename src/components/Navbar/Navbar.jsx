import React, { useState } from "react";
import "./Navbar.css";
import Dialog from "../Dialog/Dialog";
import { v4 as uuidv4 } from "uuid";

const Navbar = ({ onAddTask }) => {
  const [dialogData, setDialogData] = useState({
    isOpen: false,
    mode: "upsert",
    taskName: "",
    taskDescription: "",
    categories: [],
    isComplete: false,
  });
  // open the dialog
  const openDialog = (type) => {
    setDialogData({
      isOpen: true,
      mode: type,
      taskName: "",
      taskDescription: "",
      categories: [],
      isComplete: false,
    });
  };
  // close the dialog
  const closeDialog = () => {
    setDialogData({ ...dialogData, isOpen: false });
  };
  // create a task
  const handleCreateTask = () => {
    const newTask = {
      name: dialogData.taskName,
      description: dialogData.taskDescription,
      categories: dialogData.categories,
      isComplete: dialogData.isComplete,
      id: uuidv4(),
    };
    onAddTask(newTask);
    closeDialog();
  };
  // change the category
  const handleCategoryChange = (updatedCategories) => {
    setDialogData((prevState) => ({
      ...prevState,
      categories: updatedCategories,
    }));
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Task Management</div>
      <button className="navbarButton" onClick={() => openDialog("upsert")}>
        <span className="span_symbol ">+</span>
        <span className="span_text">New Task</span>
      </button>
      <Dialog
        isOpen={dialogData.isOpen}
        mode={dialogData.mode}
        onClose={closeDialog}
        onUpsertTask={handleCreateTask}
        task={dialogData.task}
        setTaskName={(name) => setDialogData({ ...dialogData, taskName: name })}
        taskDescription={dialogData.taskDescription}
        setTaskDescription={(description) =>
          setDialogData({ ...dialogData, taskDescription: description })
        }
        categories={dialogData.categories}
        setCategories={handleCategoryChange}
      />
    </nav>
  );
};

export default Navbar;
