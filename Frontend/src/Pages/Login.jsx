import React, { useState, useContext, useEffect } from "react";
import bcrypt from "bcryptjs";
import "./Styles/login.css";
import { AuthContext } from "../App.jsx";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  document.title = "TableMate | Login";

  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Fetch user data from the API
      const response = await fetch("http://localhost:5000/api/employee");
      if (!response.ok) {
        throw new Error("Failed to fetch employee data.");
      }

      const employees = await response.json();

      // Find the employee with the matching email
      const user = employees.find(
        (employee) => employee.email === formData.email
      );

      if (!user || !user.password) {
        alert("Invalid email or password.");
        return;
      }

      // Compare the password using bcrypt
      const isPasswordValid = await bcrypt.compare(
        formData.password, // Plain text password
        user.password // Hashed password from the database
      );

      if (isPasswordValid) {
        setIsAuthenticated(true);
        console.log(isAuthenticated);
        navigate("/employee");
      } else {
        alert("Invalid email or password.");
      }
    } catch (error) {
      console.error("Error during login process:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (
  //     formData.email === "prabeshdaahal123@gmail.com" &&
  //     formData.password === "dahal"
  //   ) {
  //     setIsAuthenticated(true);
  //     console.log(isAuthenticated)
  //     navigate("/employee");
  //   } else {
  //     alert("Sign In Failed");
  //   }
  // };

  return (
    <div className="login-page">
      <h1>TableMate</h1>
      <i>(Employee Only)</i>
      <div className="container">
        <h2>Log In</h2>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="input"
            required
          />
          <button type="submit" className="button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
