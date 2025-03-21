import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import downLogo from "../assets/down.png";
import mediumLogo from "../assets/medium.png";
import upLogo from "../assets/up.png";
import pieChartLogo from "../assets/pieChart.png"; 
import portraitLogo from "../assets/portrait.png";
import calendarLogo from "../assets/calendar.png";
import downArrowLogo from "../assets/down.png"; 
import upArrowLogo from "../assets/up.png"; 

const TaskDetails = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null); 

  const priorityStyles = {
    1: {
      color: "#08A508",
      logo: downLogo,
      filter: "brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%)",
    },
    2: {
      color: "#FFBE0B",
      logo: mediumLogo,
      filter: "brightness(0) saturate(100%) invert(77%) sepia(49%) saturate(878%) hue-rotate(331deg) brightness(102%) contrast(91%)",
    },
    3: {
      color: "#FA4D4D",
      logo: upLogo,
      filter: "brightness(0) saturate(100%) invert(37%) sepia(49%) saturate(2000%) hue-rotate(331deg) brightness(93%) contrast(101%)",
    },
  };

  const departmentStyles = {
    1: { backgroundColor: "#FFB6C1", color: "#FFFFFF" },
    2: { backgroundColor: "#FF7F50", color: "#FFFFFF" },
    3: { backgroundColor: "#FFD700", color: "#FFFFFF" },
    4: { backgroundColor: "#FD9A6A", color: "#FFFFFF" },
    5: { backgroundColor: "#89B6FF", color: "#FFFFFF" },
    6: { backgroundColor: "#FFD86D", color: "#FFFFFF" },
    7: { backgroundColor: "#FF66A8", color: "#FFFFFF" },
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const formatDueDate = (dateString) => {
    const date = new Date(dateString);
    const days = ["ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ", "კვი"];
    const dayName = days[date.getDay()]; 
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();
    return `${dayName} - ${day}/${month}/${year}`;
  };

  useEffect(() => {
    fetch(`https://momentum.redberryinternship.ge/api/tasks/${taskId}`, {
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
        setTask(data);
        setSelectedStatus(data.status);
      })
      .catch((error) => console.error("Error fetching task details:", error))
      .finally(() => setLoading(false));
  }, [taskId]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
    setIsDropdownOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!task) {
    return <div>Task not found</div>;
  }

  const priority = priorityStyles[task.priority.id] || {};
  const department = departmentStyles[task.department.id] || { backgroundColor: "#CCCCCC", color: "#000000" };

  const statusOptions = [
    { id: 1, name: "დასაწყისი" },
    { id: 2, name: "პროგრესში" },
    { id: 3, name: "მზად ტესტირებისთვის" },
    { id: 4, name: "დასრულებული" },
  ];

  return (
    <div>
      <Header />

      <div
        style={{
          width: "715px",
          margin: "50px 120px",
          display: "flex",
          flexDirection: "column",
          gap: "26px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span
            style={{
              width: "106px",
              height: "32px",
              borderRadius: "3px",
              border: `0.5px solid ${priority.color || "#DEE2E6"}`,
              padding: "4px 5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
              color: priority.color || "#000000",
              fontFamily: "FiraGO, sans-serif",
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "150%",
              letterSpacing: "0%",
            }}
          >
            <img
              src={priority.logo}
              alt="Priority Logo"
              style={{
                width: "16px",
                height: "18px",
                objectFit: "contain",
                filter: priority.filter,
              }}
            />
            {task.priority.name}
          </span>

          <span
            style={{
              width: "88px",
              height: "29px",
              borderRadius: "15px",
              padding: "5px 10px",
              backgroundColor: department.backgroundColor,
              color: department.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "FiraGO, sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "100%",
              letterSpacing: "0%",
            }}
          >
            {truncateText(task.department.name, 10)}
          </span>
        </div>

        <h2
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 600,
            fontSize: "34px",
            lineHeight: "100%",
            letterSpacing: "0%",
            color: "#212529",
            margin: 0,
          }}
        >
          {task.name}
        </h2>

        <p
          style={{
            fontFamily: "FiraGO, sans-serif",
            fontWeight: 400,
            fontSize: "18px",
            lineHeight: "150%",
            letterSpacing: "0%",
            color: "#343A40",
            margin: "26px 0 0",
          }}
        >
          {task.description}
        </p>

        <h2
          style={{
            fontFamily: "FiraGO, sans-serif",
            fontWeight: 500,
            fontSize: "24px",
            lineHeight: "100%",
            letterSpacing: "0%",
            color: "#2A2A2A",
            margin: "30px 0 0",
          }}
        >
          დავალების დეტალები
        </h2>

        <div
          style={{
            width: "493px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "50px",
          }}
        >

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img src={pieChartLogo} alt="Pie Chart Logo" style={{ width: "24px", height: "24px" }} />
            <span style={{ fontFamily: "FiraGO, sans-serif", fontWeight: 400, fontSize: "14px", color: "#474747" }}>
              სტატუსი
            </span>
          </div>
          <div style={{ position: "relative" }}>
            <div
              style={{
                width: "259px",
                height: "45px",
                borderRadius: "5px",
                border: "1px solid #CED4DA",
                padding: "4px 14px", 
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontFamily: "FiraGO, sans-serif",
                fontWeight: 300,
                fontSize: "14px",
                lineHeight: "100%",
                letterSpacing: "0%",
                color: "#0D0F10",
                cursor: "pointer",
              }}
              onClick={toggleDropdown}
            >
              {selectedStatus ? selectedStatus.name : "Select Status"}
              <img
                src={isDropdownOpen ? upArrowLogo : downArrowLogo}
                alt="Dropdown Arrow"
                style={{ width: "14px", height: "7px", filter: "brightness(0) saturate(100%) invert(8%) sepia(10%) saturate(2000%) hue-rotate(170deg) brightness(93%) contrast(101%)" }} // Updated color
              />
            </div>

            {isDropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  gap: "6px",
                  padding: "4px, 14px",
                  top: "45px", 
                  width: "287.4px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #CED4DA",
                  borderTop: "none",
                  borderRadius: "0 0 5px 5px",
                  zIndex: 1,
                }}
              >
                {statusOptions.map((status) => (
                  <div
                    key={status.id}
                    style={{
                      padding: "12px 14px",
                      fontFamily: "FiraGO, sans-serif",
                      fontWeight: 300,
                      fontSize: "14px",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                      color: "#0D0F10",
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#F8F9FA",
                      },
                    }}
                    onClick={() => handleStatusSelect(status)}
                  >
                    {status.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img src={portraitLogo} alt="Portrait Logo" style={{ width: "24px", height: "24px" }} />
            <span style={{ fontFamily: "FiraGO, sans-serif", fontWeight: 400, fontSize: "14px", color: "#474747" }}>
              თანამშრომელი
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src={task.employee.avatar}
              alt="Employee Avatar"
              style={{ width: "32px", height: "32px", borderRadius: "50%" }}
            />
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "2px" }}>
              <span
                style={{
                  fontFamily: "FiraGO, sans-serif",
                  fontWeight: 300,
                  fontSize: "11px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  textAlign: "right",
                  color: "#474747",
                }}
              >
                {task.department.name}
              </span>
              <span
                style={{
                  fontFamily: "FiraGO, sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  lineHeight: "150%",
                  letterSpacing: "0%",
                  color: "#0D0F10",
                }}
              >
                {task.employee.name} {task.employee.surname}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img src={calendarLogo} alt="Calendar Logo" style={{ width: "24px", height: "24px" }} />
            <span style={{ fontFamily: "FiraGO, sans-serif", fontWeight: 400, fontSize: "14px", color: "#474747" }}>
              დავალების ვადა
            </span>
          </div>
          <span
            style={{
              fontFamily: "FiraGO, sans-serif",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "150%",
              letterSpacing: "0%",
              color: "#0D0F10",
            }}
          >
            {formatDueDate(task.due_date)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;