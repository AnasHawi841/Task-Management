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

  return (
    <Layout onAddTask={addTask} onFilter={addFilter}>
      <Admin tasks={tasks} filters={filters} />
    </Layout>
  );
}

export default App;
