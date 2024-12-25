import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
const Dialog = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="dialog-overlay">
      <div className="dialog-content">
        <h1>Edit Task</h1>
        <label
          className={`input-label ${true ? "focused" : ""}`}
          htmlFor="TaskName"
        >
          TaskName
        </label>
        <input
          type="text"
          name="TaskName"
          // value={value}
          // onChange={onChange}
          className="input-field"
          id="TaskName"
          required
        />
        <textarea name="" id=""></textarea>
        <input type="text" />
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </div>,
    document.getElementById("dialog-root")
  );
};

export default Dialog;
