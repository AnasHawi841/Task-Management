import React, { useState } from "react";
import Admin from "./pages/Admin";
import Layout from "./components/Layout/Layout";
import "./App.css";
function App() {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({
    status: "All",
    categories: ["All"],
  });
  // add a task
  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };
  // add a filter
  const addFilter = (filter) => {
    setFilters(filter);
  };
  //delete a task
  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };
  return (
    <Layout onAddTask={addTask} onFilter={addFilter}>
      <Admin tasks={tasks} filters={filters} onDeleteTask={deleteTask} />
    </Layout>
  );
}

export default App;
