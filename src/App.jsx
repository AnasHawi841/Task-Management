import React, { useState } from "react";
import Admin from "./pages/Admin";
import Layout from "./components/Layout/Layout";
import "./App.css";
function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const handleTaskUpdate = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };
  return (
    <Layout onAddTask={addTask}>
      <Admin tasks={tasks} onTaskUpdate={handleTaskUpdate} />
    </Layout>
  );
}

export default App;
