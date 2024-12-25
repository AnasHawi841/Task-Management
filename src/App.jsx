import React, { useState } from "react";
import Admin from "./pages/Admin";
import Layout from "./components/Layout/Layout";
import "./App.css";
function App() {
  const [tasks, setTasks] = useState([]);

  const handleTaskUpdate = (updatedTasks) => {
    setTasks(updatedTasks);
  };
  return (
    <Layout>
      <Admin tasks={tasks} onTaskUpdate={handleTaskUpdate} />
    </Layout>
  );
}

export default App;
