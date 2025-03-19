import React from "react";

const Status = ({ statusId, statusName }) => {
  const statusStyles = {
    1: { backgroundColor: "#F7BC30", color: "#FFFFFF", fontSize: "20px", fontWeight: 500 },
    2: { backgroundColor: "#FB5607", color: "#FFFFFF", fontSize: "20px", fontWeight: 500 },
    3: { backgroundColor: "#FF006E", color: "#FFFFFF", fontSize: "20px", fontWeight: 500 },
    4: { backgroundColor: "#3A86FF", color: "#FFFFFF", fontSize: "20px", fontWeight: 500 },
  };

  const style = statusStyles[statusId] || {};

  return (
    <div
      style={{
        width: "381px",
        height: "54px",
        borderRadius: "10px",
        padding: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #DEE2E6",
        ...style,
      }}
    >
      {statusName}
    </div>
  );
};

export default Status;