import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Filters from "../components/Filters"; 
import Status from "../components/Status"; 
import Card from "../components/Card";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartments, setSelectedDepartments] = useState(() => {
    const savedDepartments = localStorage.getItem("selectedDepartments");
    return savedDepartments ? JSON.parse(savedDepartments) : [];
  });
  const [selectedPriorities, setSelectedPriorities] = useState(() => {
    const savedPriorities = localStorage.getItem("selectedPriorities");
    return savedPriorities ? JSON.parse(savedPriorities) : [];
  });
  const [selectedEmployees, setSelectedEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem("selectedEmployees");
    return savedEmployees ? JSON.parse(savedEmployees) : [];
  });

  useEffect(() => {
    fetch("https://momentum.redberryinternship.ge/api/tasks", {
      headers: {
        Authorization: "Bearer 9e74145e-719b-4838-9eef-0f916cac0f3b",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("API Response:", data);
        setTasks(data);
      })
      .catch((error) => console.error("Error fetching tasks:", error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedDepartments", JSON.stringify(selectedDepartments));
    localStorage.setItem("selectedPriorities", JSON.stringify(selectedPriorities));
    localStorage.setItem("selectedEmployees", JSON.stringify(selectedEmployees));
  }, [selectedDepartments, selectedPriorities, selectedEmployees]);

  const groupTasksByStatus = (tasks) => {
    const groupedTasks = {
      1: [],
      2: [], 
      3: [], 
      4: [], 
    };

    tasks.forEach((task) => {
      if (groupedTasks[task.status.id]) {
        groupedTasks[task.status.id].push(task);
      }
    });

    return groupedTasks;
  };

  const filterTasks = (tasks) => {
    console.log("Selected Employees:", selectedEmployees);
    return tasks.filter((task) => {
      const matchesDepartment = selectedDepartments.length === 0 || selectedDepartments.some(department => department.id === task.department.id);
      const matchesPriority = selectedPriorities.length === 0 || selectedPriorities.some(priority => priority.id === task.priority.id);
      const matchesEmployee = selectedEmployees.length === 0 || (selectedEmployees[0] && selectedEmployees[0].id === task.employee.id);

      return matchesDepartment && matchesPriority && matchesEmployee;
    });
  };

  const filteredTasks = filterTasks(tasks);
  const groupedTasks = groupTasksByStatus(filteredTasks);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />

      <h1
        style={{
          fontFamily: "FiraGO, sans-serif",
          fontWeight: 600,
          fontSize: "34px",
          lineHeight: "100%",
          letterSpacing: "0%",
          margin: "20px 0",
          padding: "0 120px"
        }}
      >
        დავალებების გვერდი
      </h1>

      <Filters 
        setSelectedDepartments={setSelectedDepartments}
        setSelectedPriorities={setSelectedPriorities}
        setSelectedEmployees={setSelectedEmployees}
        selectedDepartments={selectedDepartments} 
        selectedPriorities={selectedPriorities} 
        selectedEmployees={selectedEmployees} 
      />

      <div
        style={{
          paddingLeft: "120px", 
          paddingRight: "120px", 
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px", 
          }}
        >
          <div>
            <Status statusId={1} statusName="დასწაყები" />
            <div style={{ marginTop: "10px" }}>
              {groupedTasks[1].map((task) => (
                <Card key={task.id} task={task} />
              ))}
            </div>
          </div>

          <div>
            <Status statusId={2} statusName="პროგრესში" />
            <div style={{ marginTop: "10px" }}>
              {groupedTasks[2].map((task) => (
                <Card key={task.id} task={task} />
              ))}
            </div>
          </div>

          <div>
            <Status statusId={3} statusName="მზად ტესტირებისთვის" />
            <div style={{ marginTop: "10px" }}>
              {groupedTasks[3].map((task) => (
                <Card key={task.id} task={task} />
              ))}
            </div>
          </div>

          <div>
            <Status statusId={4} statusName="დასრულებული" />
            <div style={{ marginTop: "10px" }}>
              {groupedTasks[4].map((task) => (
                <Card key={task.id} task={task} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;