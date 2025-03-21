import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TaskDetails from "./pages/TaskDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task/:taskId" element={<TaskDetails />} />
      </Routes>
    </Router>
  );
};

export default App;