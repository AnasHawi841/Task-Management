import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import MODES from "./DialogModes";
const Dialog = ({ isOpen, mode, onClose }) => {
  if (!isOpen) return null;
  const currentMode = MODES[mode];
  if (!currentMode) {
    console.error(
      `Invalid mode "${mode}" provided. Valid modes are: Add, Edit, Delete.`
    );
    return null;
  }
  return ReactDOM.createPortal(
    <div className="dialog-overlay">
      {/* Apply different layout based on 'upsert' or 'delete' mode */}
      <div
        className={`dialog-content${mode === "delete" ? "-delete" : "-upsert"}`}
      >
        {/* Hide the h1 element by applying the 'delete' style */}
        {mode === "upsert" && <h1>{currentMode.header}</h1>}
        <div>{currentMode.content(onClose)}</div>
      </div>
    </div>,
    document.getElementById("dialog-root")
  );
};

export default Dialog;
