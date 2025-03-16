import React from "react";
import hourglassLogo from "../assets/hourglass.png";
import plusLogo from "../assets/plus.png";

const buttonStyles = {
  secondaryButton: {
    width: "225px",
    height: "39px",
    border: "1px solid #8338EC",
    borderRadius: "5px",
    backgroundColor: "#FFFFFF",
    color: "#000000",
    padding: "10px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    cursor: "pointer",
    transition: "background-color 0.3s, color 0.3s",
  },
  primaryButton: {
    width: "268px",
    height: "40px",
    backgroundColor: "#8338EC",
    borderRadius: "5px",
    padding: "10px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    color: "#FFFFFF",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s, color 0.3s, border 0.3s",
  },
};

const Header = () => {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "30px 120px",
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid #E0E0E0",
        width: "100%", 
        boxSizing: "border-box",
      }}
    >
      
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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
          style={buttonStyles.secondaryButton}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#8338EC";
            e.currentTarget.style.color = "#FFFFFF";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#FFFFFF";
            e.currentTarget.style.color = "#000000";
          }}
        >
          თანამშრომლის შექმნა
        </button>

        <button
          style={buttonStyles.primaryButton}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#FFFFFF";
            e.currentTarget.style.color = "#000000";
            e.currentTarget.style.border = "1px solid #8338EC";
            e.currentTarget.querySelector("img").style.filter =
              "brightness(0)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#8338EC";
            e.currentTarget.style.color = "#FFFFFF";
            e.currentTarget.style.border = "none";
            e.currentTarget.querySelector("img").style.filter =
              "brightness(1)";
          }}
        >
          <img
            src={plusLogo}
            alt="Plus Logo"
            style={{ width: "20px", height: "20px", transition: "filter 0.3s" }}
          />
          შექმენი ახალი დავალება
        </button>
      </div>
    </header>
  );
};

export default Header;