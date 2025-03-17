import React, { useState, useEffect, useRef } from "react";
import downLogo from "../assets/down.png";
import upLogo from "../assets/up.png"; 
import closeLogo from "../assets/close.png";

const buttonStyles = {
  tertiaryButton: {
    width: "155px",
    height: "35px",
    padding: "8px 20px",
    borderRadius: "20px",
    backgroundColor: "#8338EC",
    color: "#FFFFFF",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
    fontFamily: "'FiraGO', sans-serif",
    fontWeight: 400,
    fontSize: "16px",
  },
};

const Filters = () => {
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedPriorities, setSelectedPriorities] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const [tempDepartments, setTempDepartments] = useState([]);
  const [tempPriorities, setTempPriorities] = useState([]);
  const [tempEmployees, setTempEmployees] = useState([]);

  const dropdownRef = useRef(null);
  const parentRef = useRef(null);

  useEffect(() => {
    fetch("https://momentum.redberryinternship.ge/api/departments")
      .then((response) => response.json())
      .then((data) => setDepartments(data))
      .catch((error) => console.error("Error fetching departments:", error));
  }, []);

  useEffect(() => {
    fetch("https://momentum.redberryinternship.ge/api/priorities")
      .then((response) => response.json())
      .then((data) => setPriorities(data))
      .catch((error) => console.error("Error fetching priorities:", error));
  }, []);

  useEffect(() => {
    fetch("https://momentum.redberryinternship.ge/api/employees", {
      headers: {
        Authorization: "Bearer 9e72b0cd-f5cb-45a9-bc41-d390579b9cd3",
      },
    })
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  const handleFilterClick = (filter) => {
    if (selectedFilter === filter) {
      setIsDropdownOpen((prev) => !prev);
    } else {
      setSelectedFilter(filter);
      setIsDropdownOpen(true);
    }
  };

  const handleDepartmentSelect = (department) => {
    if (tempDepartments.includes(department)) {
      setTempDepartments(tempDepartments.filter((d) => d !== department));
    } else {
      setTempDepartments([...tempDepartments, department]);
    }
  };

  const handlePrioritySelect = (priority) => {
    if (tempPriorities.includes(priority)) {
      setTempPriorities(tempPriorities.filter((p) => p !== priority));
    } else {
      setTempPriorities([...tempPriorities, priority]);
    }
  };

  const handleEmployeeSelect = (employee) => {
    if (tempEmployees.includes(employee)) {
      setTempEmployees(tempEmployees.filter((e) => e !== employee));
    } else {
      setTempEmployees([...tempEmployees, employee]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        parentRef.current &&
        !parentRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
        setSelectedFilter(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

const renderDropdownContent = () => {
  switch (selectedFilter) {
    case "დეპარტამენტი":
      return departments.map((department) => (
        <div
          key={department.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "15px",
            cursor: "pointer",
          }}
          onClick={() => handleDepartmentSelect(department)}
        >
          <input
            type="checkbox"
            checked={tempDepartments.includes(department)}
            onChange={() => handleDepartmentSelect(department)}
            style={{
              width: "16px",
              height: "16px",
              cursor: "pointer",
            }}
          />
          <span
            style={{
              fontFamily: "'FiraGO', sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              color: "#000000",
            }}
          >
            {department.name}
          </span>
        </div>
      ));
    case "პრიორიტეტი":
      return priorities.map((priority) => (
        <div
          key={priority.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "15px",
            cursor: "pointer",
          }}
          onClick={() => handlePrioritySelect(priority)}
        >
          <input
            type="checkbox"
            checked={tempPriorities.includes(priority)}
            onChange={() => handlePrioritySelect(priority)}
            style={{
              width: "16px",
              height: "16px",
              cursor: "pointer",
            }}
          />
          <span
            style={{
              fontFamily: "'FiraGO', sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              color: "#000000",
            }}
          >
            {priority.name}
          </span>
        </div>
      ));
    case "თანამშრომელი":
      return employees.map((employee) => (
        <div
          key={employee.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "15px",
            cursor: "pointer",
          }}
          onClick={() => handleEmployeeSelect(employee)}
        >
          <input
            type="checkbox"
            checked={tempEmployees.includes(employee)}
            onChange={() => handleEmployeeSelect(employee)}
            style={{
              width: "16px",
              height: "16px",
              cursor: "pointer",
            }}
          />
          <span
            style={{
              fontFamily: "'FiraGO', sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              color: "#000000",
            }}
          >
            {employee.name}
          </span>
        </div>
      ));
    default:
      return null;
  }
};

  const applySelectedFilters = () => {
    setSelectedDepartments(tempDepartments);
    setSelectedPriorities(tempPriorities);
    setSelectedEmployees(tempEmployees);
    setIsDropdownOpen(false);
    setSelectedFilter(null);
  };

  const removeSelectedFilter = (filterType, filter) => {
    switch (filterType) {
      case "department":
        setSelectedDepartments(selectedDepartments.filter((d) => d !== filter));
        setTempDepartments(tempDepartments.filter((d) => d !== filter));
        break;
      case "priority":
        setSelectedPriorities(selectedPriorities.filter((p) => p !== filter));
        setTempPriorities(tempPriorities.filter((p) => p !== filter));
        break;
      case "employee":
        setSelectedEmployees(selectedEmployees.filter((e) => e !== filter));
        setTempEmployees(tempEmployees.filter((e) => e !== filter));
        break;
      default:
        break;
    }
  };

  const resetFilters = () => {
    setSelectedDepartments([]);
    setSelectedPriorities([]);
    setSelectedEmployees([]);
    setTempDepartments([]);
    setTempPriorities([]);
    setTempEmployees([]);
  };

  const renderSelectedFilters = () => {
    const selectedFilters = [
      ...selectedDepartments.map((d) => ({ name: d.name, type: "department", filter: d })),
      ...selectedPriorities.map((p) => ({ name: p.name, type: "priority", filter: p })),
      ...selectedEmployees.map((e) => ({ name: e.name, type: "employee", filter: e })),
    ];

    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "15px" }}>
        {selectedFilters.map((filter, index) => (
          <div
            key={index}
            style={{
              height: "20px",
              border: "1px solid #CED4DA",
              borderRadius: "43px",
              backgroundColor: "#FFFFFF",
              padding: "6px 10px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontSize: "14px",
              color: "#343A40",
            }}
          >
            {filter.name}
            <img
              src={closeLogo}
              alt="Remove"
              style={{ width: "14px", height: "14px", cursor: "pointer" }}
              onClick={() => removeSelectedFilter(filter.type, filter.filter)}
            />
          </div>
        ))}
        {selectedFilters.length > 0 && (
          <button
            onClick={resetFilters}
            style={{
              border: "none",
              background: "none",
              color: "#343A40",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            გასუფთავება
          </button>
        )}
      </div>
    );
  };

  return (
    <div style={{ width: "688px" }}>
      <div
        ref={parentRef}
        style={{
          height: "44px",
          position: "relative",
          display: "flex",
          alignItems: "center",
          borderRadius: "10px",
          border: "1px solid #DEE2E6",
          backgroundColor: "#FFFFFF",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            cursor: "pointer",
          }}
          onClick={() => handleFilterClick("დეპარტამენტი")}
        >
          <span
            style={{
              fontFamily: "'FiraGO', sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              color: selectedFilter === "დეპარტამენტი" ? "#8338EC" : "#000000",
            }}
          >
            დეპარტამენტი
          </span>
          <img
            src={selectedFilter === "დეპარტამენტი" && isDropdownOpen ? upLogo : downLogo}
            alt="Arrow Logo"
            style={{
              width: "14px",
              height: "8px",
              filter: selectedFilter === "დეპარტამენტი" ? "brightness(0) saturate(100%) invert(29%) sepia(98%) saturate(7483%) hue-rotate(267deg) brightness(93%) contrast(93%)" : "brightness(0)",
            }}
          />
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            cursor: "pointer",
          }}
          onClick={() => handleFilterClick("პრიორიტეტი")}
        >
          <span
            style={{
              fontFamily: "'FiraGO', sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              color: selectedFilter === "პრიორიტეტი" ? "#8338EC" : "#000000",
            }}
          >
            პრიორიტეტი
          </span>
          <img
            src={selectedFilter === "პრიორიტეტი" && isDropdownOpen ? upLogo : downLogo}
            alt="Arrow Logo"
            style={{
              width: "14px",
              height: "8px",
              filter: selectedFilter === "პრიორიტეტი" ? "brightness(0) saturate(100%) invert(29%) sepia(98%) saturate(7483%) hue-rotate(267deg) brightness(93%) contrast(93%)" : "brightness(0)",
            }}
          />
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            cursor: "pointer",
          }}
          onClick={() => handleFilterClick("თანამშრომელი")}
        >
          <span
            style={{
              fontFamily: "'FiraGO', sans-serif",
              fontWeight: 400,
              fontSize: "16px",
              color: selectedFilter === "თანამშრომელი" ? "#8338EC" : "#000000",
            }}
          >
            თანამშრომელი
          </span>
          <img
            src={selectedFilter === "თანამშრომელი" && isDropdownOpen ? upLogo : downLogo}
            alt="Arrow Logo"
            style={{
              width: "14px",
              height: "8px",
              filter: selectedFilter === "თანამშრომელი" ? "brightness(0) saturate(100%) invert(29%) sepia(98%) saturate(7483%) hue-rotate(267deg) brightness(93%) contrast(93%)" : "brightness(0)",
            }}
          />
        </div>

        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            style={{
              width: "627px",
              height: "274px",
              position: "absolute",
              top: "49px",
              left: "0",
              padding: "40px 30px 20px 30px",
              borderRadius: "10px",
              border: "0.5px solid #8338EC",
              backgroundColor: "#FFFFFF",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              zIndex: 1000,
            }}
          >
            {renderDropdownContent()}

            <div
              style={{
                position: "absolute",
                bottom: "20px",
                right: "30px",
                width: "155px",
                height: "35px",
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <button
                style={buttonStyles.tertiaryButton}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#B588F4";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#8338EC";
                }}
                onClick={applySelectedFilters}
              >
                არჩევა
              </button>
            </div>
          </div>
        )}
      </div>

      {renderSelectedFilters()}
    </div>
  );
};

export default Filters;