import React from "react";
import downLogo from "../assets/down.png";
import mediumLogo from "../assets/medium.png";
import upLogo from "../assets/up.png";
import commentsLogo from "../assets/comments.png";

const georgianMonths = {
  Jan: "იან",
  Feb: "თებ",
  Mar: "მარ",
  Apr: "აპრ",
  May: "მაი",
  Jun: "ივნ",
  Jul: "ივლ",
  Aug: "აგვ",
  Sep: "სექ",
  Oct: "ოქტ",
  Nov: "ნოე",
  Dec: "დეკ",
};

const formatDateInGeorgian = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const englishMonth = formattedDate.split(" ")[0];

  const georgianDate = formattedDate.replace(englishMonth, georgianMonths[englishMonth]);

  const [month, dayWithComma, year] = georgianDate.split(" ");
  const day = dayWithComma.replace(",", "");
  return `${day} ${month}, ${year}`;
};

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

const statusStyles = {
  1: { backgroundColor: "#F7BC30", color: "#FFFFFF" },
  2: { backgroundColor: "#FB5607", color: "#FFFFFF" },
  3: { backgroundColor: "#FF006E", color: "#FFFFFF" },
  4: { backgroundColor: "#3A86FF", color: "#FFFFFF" },
};

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

const Card = ({ task, onClick }) => {
  const priority = priorityStyles[task.priority.id] || {};
  const department = departmentStyles[task.department.id] || { backgroundColor: "#CCCCCC", color: "#000000" };
  const status = statusStyles[task.status.id] || { backgroundColor: "#CCCCCC", color: "#000000" };

  return (
    <div
      style={{
        width: "381px",
        height: "217px",
        padding: "8px",
        borderRadius: "15px",
        border: `1px solid ${status.backgroundColor || "#DEE2E6"}`,
        backgroundColor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        margin: "25px 0",
        cursor: "pointer", // Add cursor pointer to indicate it's clickable
      }}
      onClick={onClick} // Attach the onClick handler
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              width: "86px",
              height: "26px",
              borderRadius: "4px",
              border: "0.5px solid",
              borderColor: priority.color || "#DEE2E6",
              padding: "4px",
              margin: "10px 0 0 10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
              color: priority.color || "#000000",
              fontFamily: "FiraGO, sans-serif",
              fontWeight: 500,
              fontSize: "12px",
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
              height: "24px",
              borderRadius: "15px",
              padding: "5px 9px",
              margin: "10px 0 0 0",
              backgroundColor: department.backgroundColor,
              color: department.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "FiraGO, sans-serif",
              fontWeight: 400,
              fontSize: "12px",
              lineHeight: "100%",
              letterSpacing: "0%",
            }}
          >
            {truncateText(task.department.name, 10)}
          </span>
        </div>

        <span
          style={{
            fontFamily: "FiraGO, sans-serif",
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "100%",
            letterSpacing: "0%",
            color: "#212529",
            margin: "10px 10px 0 0"
          }}
        >
          {formatDateInGeorgian(task.due_date)}
        </span>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          textAlign: "left",
          paddingLeft: "20px",
        }}
      >
        <h3
          style={{
            margin: "0 20px 20px 0",
            fontFamily: "FiraGO, sans-serif",
            fontWeight: 500,
            fontSize: "15px",
            lineHeight: "100%",
            letterSpacing: "0%",
            color: "#212529",
          }}
        >
          {task.name}
        </h3>

        <p
          style={{
            margin: "0 20px 0 0px",
            fontFamily: "FiraGO, sans-serif",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "100%",
            letterSpacing: "0%",
            color: "#343A40",
          }}
        >
          {task.description}
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <img
          src={task.employee.avatar}
          alt="Employee Avatar"
          style={{ width: "31px", height: "31px", borderRadius: "50%", margin: "0 0 10px 10px" }}
        />

        <div style={{ display: "flex", alignItems: "center", margin: "0 10px 10px 0" }}>
          <img
            src={commentsLogo}
            alt="Comments Logo"
            style={{ width: "22px", height: "22px", marginRight: "5px" }}
          />
          <span
            style={{
              fontFamily: "FiraGO, sans-serif",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "100%",
              letterSpacing: "0%",
              color: "#212529",
            }}
          >
            {task.total_comments || 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;