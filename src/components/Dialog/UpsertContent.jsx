import React from "react";
import Form from "../Form/Form";
const UpsertContent = ({
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
  return (
    <Form
      onClose={onClose}
      taskName={taskName}
      setTaskName={setTaskName}
      taskDescription={taskDescription}
      setTaskDescription={setTaskDescription}
      onUpsertTask={onUpsertTask}
      setCategories={setCategories}
      categories={categories}
      isComplete={isComplete}
    ></Form>
  );
};

export default UpsertContent;
