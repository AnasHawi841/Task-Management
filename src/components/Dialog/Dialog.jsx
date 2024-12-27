import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import UpsertContent from "./UpsertContent";
import DeleteContent from "./DeleteContent";

const Dialog = ({
  isOpen,
  onClose,
  onDelete,
  mode,
  onUpsertTask,
  taskName,
  setTaskName,
  taskDescription,
  setTaskDescription,
  taskId,
  setCategories,
  categories,
  isComplete,
}) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className="dialog-overlay">
      <div
        className={`dialog-content${mode === "delete" ? "-delete" : "-upsert"}`}
      >
        {mode === "upsert" && (
          <>
            <h1>{taskName ? "Edit Task" : "Create New Task"}</h1>
            <UpsertContent
              onClose={onClose}
              taskName={taskName}
              setTaskName={setTaskName}
              taskDescription={taskDescription}
              setTaskDescription={setTaskDescription}
              categories={categories}
              setCategories={setCategories}
              onUpsertTask={onUpsertTask}
              isComplete={isComplete}
            />
          </>
        )}
        {mode === "delete" && (
          <>
            <DeleteContent
              onClose={onClose}
              onDelete={() => onDelete(taskId)}
              taskName={taskName}
            />
          </>
        )}
      </div>
    </div>,
    document.getElementById("dialog-root")
  );
};

export default Dialog;
