import React, { useState } from "react";

const Form = ({ initialData = {}, onSubmit }) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        value={formData.title || ""}
        onChange={handleChange}
        placeholder="Task Title"
      />
      <textarea
        name="description"
        value={formData.description || ""}
        onChange={handleChange}
        placeholder="Task Description"
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default Form;
