import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import downLogo from "../assets/down.png";
import upLogo from "../assets/up.png";
import mediumLogo from "../assets/medium.png";
import plusLogo from "../assets/plus.png";
import calendarIcon from "../assets/calendar.png";
import Modal from "../components/Modal";

const CreateTask = () => {
    const navigate = useNavigate();
    const [priorities, setPriorities] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [allEmployees, setAllEmployees] = useState([]);
    const [selectedPriority, setSelectedPriority] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [isPriorityDropdownOpen, setIsPriorityDropdownOpen] = useState(false);
    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
    const [isDepartmentDropdownOpen, setIsDepartmentDropdownOpen] = useState(false);
    const [isEmployeeDropdownOpen, setIsEmployeeDropdownOpen] = useState(false);
    const [deadline, setDeadline] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [titleError, setTitleError] = useState("");
    const [descriptionError, setDescriptionError] = useState("");
    const [deadlineError, setDeadlineError] = useState(false);
    const [deadlineTouched, setDeadlineTouched] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchPriorities = async () => {
            try {
                const response = await fetch(
                    "https://momentum.redberryinternship.ge/api/priorities",
                    {
                        headers: {
                            Authorization: "Bearer 9e74145e-719b-4838-9eef-0f916cac0f3b",
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setPriorities(data);
                const defaultPriority = data.find((priority) => priority.id === 2);
                setSelectedPriority(defaultPriority);
            } catch (error) {
                console.error("Error fetching priorities:", error);
            }
        };

        fetchPriorities();
    }, []);

    useEffect(() => {
        const fetchStatuses = async () => {
            try {
                const response = await fetch(
                    "https://momentum.redberryinternship.ge/api/statuses",
                    {
                        headers: {
                            Authorization: "Bearer 9e74145e-719b-4838-9eef-0f916cac0f3b",
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setStatuses(data);
                const defaultStatus = data.find((status) => status.id === 1);
                setSelectedStatus(defaultStatus);
            } catch (error) {
                console.error("Error fetching statuses:", error);
            }
        };

        fetchStatuses();
    }, []);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await fetch(
                    "https://momentum.redberryinternship.ge/api/departments",
                    {
                        headers: {
                            Authorization: "Bearer 9e74145e-719b-4838-9eef-0f916cac0f3b",
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setDepartments(data);
            } catch (error) {
                console.error("Error fetching departments:", error);
            }
        };

        fetchDepartments();
    }, []);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch(
                    "https://momentum.redberryinternship.ge/api/employees",
                    {
                        headers: {
                            Authorization: "Bearer 9e74145e-719b-4838-9eef-0f916cac0f3b",
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setAllEmployees(data);
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        };

        fetchEmployees();
    }, []);

    useEffect(() => {
        if (selectedDepartment) {
            const filteredEmployees = allEmployees.filter(
                (employee) => employee.department.id === selectedDepartment.id
            );
            setEmployees(filteredEmployees);
            setSelectedEmployee(null);
        } else {
            setEmployees([]);
        }
    }, [selectedDepartment, allEmployees]);

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

    const handleAddEmployeeClick = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const togglePriorityDropdown = () => {
        setIsPriorityDropdownOpen(!isPriorityDropdownOpen);
        setIsStatusDropdownOpen(false);
    };

    const toggleStatusDropdown = () => {
        setIsStatusDropdownOpen(!isStatusDropdownOpen);
        setIsPriorityDropdownOpen(false);
    };

    const toggleDepartmentDropdown = () => {
        setIsDepartmentDropdownOpen(!isDepartmentDropdownOpen);
        setIsEmployeeDropdownOpen(false);
    };

    const toggleEmployeeDropdown = () => {
        setIsEmployeeDropdownOpen(!isEmployeeDropdownOpen);
        setIsDepartmentDropdownOpen(false);
    };

    const handlePrioritySelect = (priority) => {
        setSelectedPriority(priority);
        setIsPriorityDropdownOpen(false);
    };

    const handleStatusSelect = (status) => {
        setSelectedStatus(status);
        setIsStatusDropdownOpen(false);
    };

    const handleDepartmentSelect = (department) => {
        setSelectedDepartment(department);
        setIsDepartmentDropdownOpen(false);
        setSelectedEmployee(null);
    };

    const handleEmployeeSelect = (employee) => {
        setSelectedEmployee(employee);
        setIsEmployeeDropdownOpen(false);
    };

    const handleTitleChange = (e) => {
        const value = e.target.value;
        setTitle(value);
        if (value.length < 3) {
            setTitleError("მინიმუმ 3 სიმბოლო");
        } else if (value.length > 255) {
            setTitleError("მაქსიმუმ 255 სიმბოლო");
        } else {
            setTitleError("");
        }
    };

    const handleDescriptionChange = (e) => {
        const value = e.target.value;
        setDescription(value);
        const wordCount = value.trim().split(/\s+/).length;
        if (wordCount < 4 && value.length > 0) {
            setDescriptionError("მინიმუმ 4 სიტყვა");
        } else if (value.length > 255) {
            setDescriptionError("მაქსიმუმ 255 სიმბოლო");
        } else {
            setDescriptionError("");
        }
    };

    const handleDeadlineChange = (e) => {
        const selectedDate = new Date(e.target.value);
        const today = new Date();
        setDeadlineTouched(true);
        if (selectedDate < today) {
            setDeadlineError(true);
            alert("თქვენ არ შეგიძლიათ წარსული თარიღის არჩევა");
            return;
        }
        setDeadlineError(false);
        setDeadline(e.target.value);
    };

    useEffect(() => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const formattedDate = tomorrow.toISOString().split("T")[0];
        setDeadline(formattedDate);
    }, []);

    const handleCreateTask = async () => {
        if (
            !title ||
            !selectedPriority ||
            !selectedStatus ||
            !selectedDepartment ||
            !selectedEmployee ||
            deadlineError
        ) {
            alert("გთხოვთ შეავსოთ ყველა სავალდებულო ველი");
            return;
        }

        const taskData = {
            name: title,
            description: description,
            due_date: deadline,
            status_id: selectedStatus.id,
            employee_id: selectedEmployee.id,
            priority_id: selectedPriority.id,
        };

        try {
            const response = await fetch(
                "https://momentum.redberryinternship.ge/api/tasks",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer 9e74145e-719b-4838-9eef-0f916cac0f3b",
                    },
                    body: JSON.stringify(taskData),
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const result = await response.json();
            console.log("Task created successfully:", result);
            alert("დავალება წარმატებით შეიქმნა!");
            navigate("/");
        } catch (error) {
            console.error("Error creating task:", error);
            alert("დავალების შექმნა ვერ მოხერხდა. გთხოვთ სცადოთ ხელახლა.");
        }
    };

    return (
        <div>
            <Header />

            <div
                style={{
                    padding: "0 120px",
                }}
            >
                <h1
                    style={{
                        fontFamily: "FiraGO",
                        fontWeight: 600,
                        fontSize: "34px",
                        lineHeight: "100%",
                        letterSpacing: "0%",
                        color: "#212529",
                        margin: "20px 0 30px",
                    }}
                >
                    შექმენი ახალი დავალება
                </h1>

                <div
                    style={{
                        width: "1648px",
                        height: "958px",
                        borderRadius: "4px",
                        border: "0.3px solid #DDD2FF",
                        backgroundColor: "#FBF9FFA6",
                        marginTop: "20px",
                        padding: "65px 55px",
                        boxSizing: "border-box",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "30px",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                gap: "70px",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "30px",
                                    width: "550px",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "5px",
                                    }}
                                >
                                    <label
                                        style={{
                                            fontFamily: "FiraGO",
                                            fontWeight: 400,
                                            fontSize: "16px",
                                            lineHeight: "100%",
                                            letterSpacing: "0%",
                                            color: "#343A40",
                                        }}
                                    >
                                        სათაური <span style={{ color: "#343A40" }}>*</span>
                                    </label>

                                    <input
                                        type="text"
                                        value={title}
                                        onChange={handleTitleChange}
                                        style={{
                                            width: "550px",
                                            height: "45px",
                                            borderRadius: "5px",
                                            border: `1px solid ${titleError ? "#FA4D4D" : title ? "#08A508" : "#DEE2E6"}`,
                                            padding: "4px 10px",
                                            backgroundColor: "#FFFFFF",
                                            fontFamily: "FiraGO",
                                            fontSize: "16px",
                                            outline: "none",
                                        }}
                                    />

                                    <div
                                        style={{
                                            width: "550px",
                                            height: "26px",
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "2px",
                                            padding: "0 1px",
                                            fontFamily: "FiraGO",
                                            fontWeight: 300,
                                            fontSize: "10px",
                                            lineHeight: "100%",
                                            letterSpacing: "0%",
                                            color: titleError ? "#FA4D4D" : title ? "#08A508" : "#6C757D",
                                        }}
                                    >
                                        <span>{titleError || "მინიმუმ 3 სიმბოლო"}</span>
                                        <span>მაქსიმუმ 255 სიმბოლო</span>
                                    </div>
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "5px",
                                    }}
                                >
                                    <label
                                        style={{
                                            fontFamily: "FiraGO",
                                            fontWeight: 400,
                                            fontSize: "16px",
                                            lineHeight: "100%",
                                            letterSpacing: "0%",
                                            color: "#343A40",
                                        }}
                                    >
                                        აღწერა
                                    </label>

                                    <textarea
                                        value={description}
                                        onChange={handleDescriptionChange}
                                        style={{
                                            width: "550px",
                                            height: "133px",
                                            borderRadius: "5px",
                                            border: `1px solid ${descriptionError ? "#FA4D4D" : description ? "#08A508" : "#DEE2E6"}`,
                                            padding: "14px",
                                            backgroundColor: "#FFFFFF",
                                            fontFamily: "FiraGO",
                                            fontSize: "16px",
                                            outline: "none",
                                            resize: "none",
                                        }}
                                    />

                                    {description && (
                                        <div
                                            style={{
                                                width: "550px",
                                                height: "26px",
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "2px",
                                                padding: "0 1px",
                                                fontFamily: "FiraGO",
                                                fontWeight: 300,
                                                fontSize: "10px",
                                                lineHeight: "100%",
                                                letterSpacing: "0%",
                                                color: descriptionError ? "#FA4D4D" : description ? "#08A508" : "#6C757D",
                                            }}
                                        >
                                            <span>{descriptionError || "მინიმუმ 4 სიტყვა"}</span>
                                            <span>მაქსიმუმ 255 სიმბოლო</span>
                                        </div>
                                    )}
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        gap: "32px",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "5px",
                                            width: "259px",
                                        }}
                                    >
                                        <label
                                            style={{
                                                fontFamily: "FiraGO",
                                                fontWeight: 400,
                                                fontSize: "16px",
                                                lineHeight: "100%",
                                                letterSpacing: "0%",
                                                color: "#343A40",
                                            }}
                                        >
                                            პრიორიტეტი <span style={{ color: "#343A40" }}>*</span>
                                        </label>

                                        <div style={{ position: "relative" }}>
                                            <div
                                                style={{
                                                    width: "259px",
                                                    height: "46px",
                                                    borderRadius: "5px",
                                                    border: "1px solid #DEE2E6",
                                                    padding: "4px 14px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                    cursor: "pointer",
                                                    backgroundColor: "#FFFFFF",
                                                }}
                                                onClick={togglePriorityDropdown}
                                            >
                                                {selectedPriority ? (
                                                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                                        <img
                                                            src={priorityStyles[selectedPriority.id].logo}
                                                            alt="Priority Logo"
                                                            style={{
                                                                width: "16px",
                                                                height: "8px",
                                                                filter: priorityStyles[selectedPriority.id].filter,
                                                            }}
                                                        />
                                                        <span style={{ color: priorityStyles[selectedPriority.id].color }}>
                                                            {selectedPriority.name}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span>Select Priority</span>
                                                )}
                                                <img
                                                    src={isPriorityDropdownOpen ? upLogo : downLogo}
                                                    alt="Dropdown Arrow"
                                                    style={{ width: "14px", height: "7px", filter: "brightness(0) saturate(100%) invert(8%) sepia(7%) saturate(1045%) hue-rotate(169deg) brightness(94%) contrast(93%)" }}
                                                />
                                            </div>

                                            {isPriorityDropdownOpen && (
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        top: "50px",
                                                        width: "287px",
                                                        backgroundColor: "#FFFFFF",
                                                        border: "1px solid #DEE2E6",
                                                        borderTop: "none",
                                                        borderRadius: "0 0 5px 5px",
                                                        zIndex: 1,
                                                    }}
                                                >
                                                    {priorities.map((priority) => (
                                                        <div
                                                            key={priority.id}
                                                            style={{
                                                                padding: "14px",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                gap: "6px",
                                                                cursor: "pointer",
                                                                "&:hover": {
                                                                    backgroundColor: "#F8F9FA",
                                                                },
                                                            }}
                                                            onClick={() => handlePrioritySelect(priority)}
                                                        >
                                                            <img
                                                                src={priorityStyles[priority.id].logo}
                                                                alt="Priority Logo"
                                                                style={{
                                                                    width: "16px",
                                                                    height: "8px",
                                                                    filter: priorityStyles[priority.id].filter,
                                                                }}
                                                            />
                                                            <span style={{ color: priorityStyles[priority.id].color }}>
                                                                {priority.name}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "5px",
                                            width: "259px",
                                        }}
                                    >
                                        <label
                                            style={{
                                                fontFamily: "FiraGO",
                                                fontWeight: 400,
                                                fontSize: "16px",
                                                lineHeight: "100%",
                                                letterSpacing: "0%",
                                                color: "#343A40",
                                            }}
                                        >
                                            სტატუსი <span style={{ color: "#343A40" }}>*</span>
                                        </label>

                                        <div style={{ position: "relative" }}>
                                            <div
                                                style={{
                                                    width: "259px",
                                                    height: "46px",
                                                    borderRadius: "5px",
                                                    border: "1px solid #DEE2E6",
                                                    padding: "4px 14px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                    cursor: "pointer",
                                                    backgroundColor: "#FFFFFF",
                                                }}
                                                onClick={toggleStatusDropdown}
                                            >
                                                {selectedStatus ? (
                                                    <span>{selectedStatus.name}</span>
                                                ) : (
                                                    <span>Select Status</span>
                                                )}
                                                <img
                                                    src={isStatusDropdownOpen ? upLogo : downLogo}
                                                    alt="Dropdown Arrow"
                                                    style={{ width: "14px", height: "7px", filter: "brightness(0) saturate(100%) invert(8%) sepia(7%) saturate(1045%) hue-rotate(169deg) brightness(94%) contrast(93%)" }}
                                                />
                                            </div>

                                            {isStatusDropdownOpen && (
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        top: "50px",
                                                        width: "287px",
                                                        backgroundColor: "#FFFFFF",
                                                        border: "1px solid #DEE2E6",
                                                        borderTop: "none",
                                                        borderRadius: "0 0 5px 5px",
                                                        zIndex: 1,
                                                    }}
                                                >
                                                    {statuses.map((status) => (
                                                        <div
                                                            key={status.id}
                                                            style={{
                                                                padding: "14px",
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
                                    </div>
                                </div>
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "30px",
                                    width: "550px",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "5px",
                                    }}
                                >
                                    <label
                                        style={{
                                            fontFamily: "FiraGO",
                                            fontWeight: 400,
                                            fontSize: "16px",
                                            lineHeight: "100%",
                                            letterSpacing: "0%",
                                            color: "#343A40",
                                        }}
                                    >
                                        დეპარტამენტი <span style={{ color: "#343A40" }}>*</span>
                                    </label>

                                    <div style={{ position: "relative" }}>
                                        <div
                                            style={{
                                                width: "550px",
                                                height: "46px",
                                                borderRadius: "5px",
                                                border: "1px solid #DEE2E6",
                                                padding: "4px 14px",
                                                marginBottom: "29px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                cursor: "pointer",
                                                backgroundColor: "#FFFFFF",
                                            }}
                                            onClick={toggleDepartmentDropdown}
                                        >
                                            {selectedDepartment ? (
                                                <span>{selectedDepartment.name}</span>
                                            ) : (
                                                <span>Select Department</span>
                                            )}
                                            <img
                                                src={isDepartmentDropdownOpen ? upLogo : downLogo}
                                                alt="Dropdown Arrow"
                                                style={{ width: "14px", height: "7px", filter: "brightness(0) saturate(100%) invert(8%) sepia(7%) saturate(1045%) hue-rotate(169deg) brightness(94%) contrast(93%)" }}
                                            />
                                        </div>

                                        {isDepartmentDropdownOpen && (
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    top: "50px",
                                                    width: "578px",
                                                    backgroundColor: "#FFFFFF",
                                                    border: "1px solid #DEE2E6",
                                                    borderTop: "none",
                                                    borderRadius: "0 0 5px 5px",
                                                    zIndex: 1,
                                                }}
                                            >
                                                {departments.map((department) => (
                                                    <div
                                                        key={department.id}
                                                        style={{
                                                            padding: "14px",
                                                            cursor: "pointer",
                                                            "&:hover": {
                                                                backgroundColor: "#F8F9FA",
                                                            },
                                                        }}
                                                        onClick={() => handleDepartmentSelect(department)}
                                                    >
                                                        {department.name}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {selectedDepartment && (
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "5px",
                                        }}
                                    >
                                        <label
                                            style={{
                                                fontFamily: "FiraGO",
                                                fontWeight: 400,
                                                fontSize: "16px",
                                                lineHeight: "100%",
                                                letterSpacing: "0%",
                                                color: "#343A40",
                                            }}
                                        >
                                            პასუხისმგებელი თანამშრომელი <span style={{ color: "#343A40" }}>*</span>
                                        </label>

                                        <div style={{ position: "relative" }}>
                                            <div
                                                style={{
                                                    width: "550px",
                                                    height: "46px",
                                                    borderRadius: "5px",
                                                    border: "1px solid #DEE2E6",
                                                    padding: "4px 14px",
                                                    marginBottom: "108px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                    cursor: "pointer",
                                                    backgroundColor: "#FFFFFF",
                                                }}
                                                onClick={toggleEmployeeDropdown}
                                            >
                                                {selectedEmployee ? (
                                                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                                        <img
                                                            src={selectedEmployee.avatar}
                                                            alt="Employee Avatar"
                                                            style={{
                                                                width: "24px",
                                                                height: "24px",
                                                                borderRadius: "50%",
                                                            }}
                                                        />
                                                        <span>
                                                            {selectedEmployee.name} {selectedEmployee.surname}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span>თანამშრომელი</span>
                                                )}
                                                <img
                                                    src={isEmployeeDropdownOpen ? upLogo : downLogo}
                                                    alt="Dropdown Arrow"
                                                    style={{ width: "14px", height: "7px", filter: "brightness(0) saturate(100%) invert(8%) sepia(7%) saturate(1045%) hue-rotate(169deg) brightness(94%) contrast(93%)" }}
                                                />
                                            </div>

                                            {isEmployeeDropdownOpen && (
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        top: "50px",
                                                        width: "578px",
                                                        backgroundColor: "#FFFFFF",
                                                        border: "1px solid #DEE2E6",
                                                        borderTop: "none",
                                                        borderRadius: "0 0 5px 5px",
                                                        zIndex: 1,
                                                    }}
                                                >
                                                    <div style={{ padding: "14px", display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", color: "#8338EC", "&:hover": { backgroundColor: "#F8F9FA" } }} onClick={handleAddEmployeeClick}>
                                                        <img src={plusLogo} alt="Add Employee" style={{ width: "16px", height: "16px", borderRadius: "50%", border: "1px solid #8338EC", padding: "4px", filter: "brightness(0) saturate(100%) invert(37%) sepia(49%) saturate(2000%) hue-rotate(331deg) brightness(93%) contrast(101%)" }} />
                                                        <span>დაამატე თანამშრომელი</span>
                                                    </div>

                                                    {employees.map((employee) => (
                                                        <div
                                                            key={employee.id}
                                                            style={{
                                                                padding: "14px",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                gap: "6px",
                                                                cursor: "pointer",
                                                                "&:hover": {
                                                                    backgroundColor: "#F8F9FA",
                                                                },
                                                            }}
                                                            onClick={() => handleEmployeeSelect(employee)}
                                                        >
                                                            <img
                                                                src={employee.avatar}
                                                                alt="Employee Avatar"
                                                                style={{
                                                                    width: "24px",
                                                                    height: "24px",
                                                                    borderRadius: "50%",
                                                                }}
                                                            />
                                                            <span>
                                                                {employee.name} {employee.surname}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "5px",
                                    }}
                                >
                                    <label
                                        style={{
                                            fontFamily: "FiraGO",
                                            fontWeight: 400,
                                            fontSize: "16px",
                                            lineHeight: "100%",
                                            letterSpacing: "0%",
                                            color: "#343A40",
                                        }}
                                    >
                                        დედლაინი
                                    </label>

                                    <div
                                        style={{
                                            width: "550px",
                                            height: "46px",
                                            borderRadius: "5px",
                                            border: `1px solid ${deadlineError ? "#FA4D4D" : deadlineTouched && !deadlineError ? "#08A508" : "#DEE2E6"}`,
                                            padding: "4px 14px",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "6px",
                                            backgroundColor: "#FFFFFF",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => document.getElementById("deadline").showPicker()}
                                    >
                                        <img
                                            src={calendarIcon}
                                            alt="Calendar Icon"
                                            style={{
                                                width: "16px",
                                                height: "16px",
                                                filter: "brightness(0) saturate(100%) invert(8%) sepia(7%) saturate(1045%) hue-rotate(169deg) brightness(94%) contrast(93%)",
                                            }}
                                        />
                                        <input
                                            type="date"
                                            id="deadline"
                                            value={deadline}
                                            onChange={handleDeadlineChange}
                                            min={new Date().toISOString().split("T")[0]}
                                            style={{
                                                width: "100%",
                                                border: "none",
                                                outline: "none",
                                                fontFamily: "FiraGO",
                                                fontSize: "16px",
                                                cursor: "pointer",
                                            }}
                                        />
                                    </div>
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                    }}
                                >
                                    <button
                                        style={{
                                            width: "208px",
                                            height: "42px",
                                            borderRadius: "5px",
                                            padding: "10px 20px",
                                            marginTop: "50px",
                                            fontFamily: "FiraGO",
                                            fontWeight: 400,
                                            fontSize: "18px",
                                            lineHeight: "100%",
                                            letterSpacing: "0%",
                                            backgroundColor: "#8338EC",
                                            color: "#FFFFFF",
                                            border: "none",
                                            cursor: "pointer",
                                        }}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.backgroundColor = "#B588F4";
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.backgroundColor = "#8338EC";
                                        }}
                                        onClick={handleCreateTask}
                                    >
                                        დავალების შექმნა
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && <Modal onClose={closeModal} />} 
        </div>
    );
};

export default CreateTask;