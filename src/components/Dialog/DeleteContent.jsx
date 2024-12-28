import React, { useState } from "react";
import Loading from "../Loading/Loading";
import "./style.css";

const DeleteContent = ({ onDelete, onClose, taskName }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = () => {
    setIsLoading(true);
    setTimeout(() => {
      onDelete();
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  return (
    <div id="delete">
      <img src="/Images/DeleteDialog.png" alt="Delete Icon" />
      <h1>Delete Task!</h1>
      <p>
        Are you sure that you want to delete this <strong>{taskName}</strong>?
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button className="cancel_button" onClick={onClose}>
          Cancel
        </button>
        <button
          className="delete_button"
          onClick={handleDelete}
          disabled={isLoading}
        >
          <i
            className="fas fa-trash"
            style={{ color: "white", marginRight: "10px" }}
          ></i>
          Delete
        </button>
      </div>
      {isLoading && <Loading />}
    </div>
  );
};

export default DeleteContent;
