import React, { useState } from "react";
import "./Task.css";

const TaskItem = ({ task, onEdit, onDelete, onToggleComplete }) => {
  const [status, setStatus] = useState(
    task.completed ? "Complete" : "Incomplete"
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setIsDropdownOpen(false); // Close dropdown after selection
    onToggleComplete(task.id); // Toggle task completion in the parent component
  };

  return (
    <div className="mainTask">
      <div className="task-info">
        <div
          className="task-name"
          onMouseEnter={() => setIsTooltipVisible(true)}
          onMouseLeave={() => setIsTooltipVisible(false)}
        >
          {task.name}

          {/* Tooltip */}
          {isTooltipVisible && (
            <div className="tooltip">{task.description}</div>
          )}
        </div>
        <div className="categoryTask">
          {task.category.map((category, index) => {
            return (
              <div className="taskItems" key={index}>
                {category}
              </div>
            );
          })}
        </div>
      </div>
      <div className="task-actions">
        <div className="task-status">
          <div className="custom-dropdown">
            <div
              className="dropdown-selected"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              style={{
                background: status === "Completed" ? "#E1FFDE" : "#FFF2DE",
                color: status === "Completed" ? "#0A7900" : "#FF6B00",
              }}
            >
              {status}
              <span
                className="dropdown-arrow"
                style={{
                  borderTopColor:
                    status === "Completed" ? "#0A7900" : "#FF6B00",
                }}
              ></span>
            </div>
            {isDropdownOpen && (
              <div className="dropdown-options">
                <div
                  onClick={() => handleStatusChange("Completed")}
                  className="dropdown-option"
                >
                  <span
                    className="status-indicator"
                    style={{
                      backgroundColor: "#0A7900",
                    }}
                  ></span>
                  Completed
                </div>

                <div
                  onClick={() => handleStatusChange("Incomplete")}
                  className="dropdown-option"
                >
                  <span
                    className="status-indicator"
                    style={{
                      backgroundColor: "#FF6B00",
                    }}
                  ></span>
                  Incomplete
                </div>
              </div>
            )}
          </div>
        </div>

        <button onClick={() => onEdit(task)}>
          <i className="fas fa-edit"></i>
        </button>
        <button onClick={() => onDelete(task)}>
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
