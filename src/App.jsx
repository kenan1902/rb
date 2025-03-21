import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TaskDetails from "./pages/TaskDetails";
import CreateTask from "./pages/CreateTask";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task/:taskId" element={<TaskDetails />} />
        <Route path="/create-task" element={<CreateTask />} />
      </Routes>
    </Router>
  );
};

export default App;