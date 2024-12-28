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

  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };
  const addFilter = (filter) => {
    setFilters(filter);
  };
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
