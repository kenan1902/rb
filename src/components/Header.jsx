import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import hourglassLogo from "../assets/hourglass.png";
import plusLogo from "../assets/plus.png";
import ButtonStyles from "../ui/ButtonStyles";
import Modal from "./Modal"; // Import the Modal component

const Header = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateTaskClick = () => {
    navigate("/create-task");
  };

  const handleEmployeeCreationClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "30px 120px",
          backgroundColor: "#FFFFFF",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
          onClick={() => navigate("/")} // Navigate to home on click
        >
          <h1
            style={{
              fontFamily: "'Fredoka One', sans-serif",
              fontWeight: 400,
              fontSize: "31px",
              lineHeight: "100%",
              letterSpacing: "0%",
              margin: 0,
              color: "#8338EC",
            }}
          >
            Momentum
          </h1>
          <img
            src={hourglassLogo}
            alt="Hourglass Logo"
            style={{ width: "38px", height: "38px" }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
          <button
            style={ButtonStyles.secondaryButton}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = "#B588F4";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = "#8338EC";
            }}
            onClick={handleEmployeeCreationClick} // Open modal on click
          >
            თანამშრომლის შექმნა
          </button>

          <button
            style={ButtonStyles.primaryButton}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#B588F4";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#8338EC";
            }}
            onClick ={handleCreateTaskClick}
          >
            <img
              src={plusLogo}
              alt="Plus Logo"
              style={{ width: "20px", height: "20px" }}
            />
            შექმენი ახალი დავალება
          </button>
        </div>
      </header>

      {isModalOpen && <Modal onClose={closeModal} />} {/* Render modal if open */}
    </>
  );
};

export default Header;