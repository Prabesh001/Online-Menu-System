import React, { useState, useContext, useEffect } from "react";
import bcrypt from "bcryptjs";
import "./Styles/login.css";
import { AuthContext } from "../App.jsx";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { Toaster, toast } from "sonner";

const LoginPage = () => {
  document.title = "TableMate | Login";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const button = document.querySelector(".login-button");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    button.style.backgroundColor = "#f0620a";

    try {
      const response = await fetch("http://localhost:5000/api/employee");
      if (!response.ok) {
        throw new Error("Failed to fetch employee data.");
      }

      const employees = await response.json();

      const user = employees.find(
        (employee) => employee.email === formData.email
      );
      console.log(user)

      if (!user) {
        setError(true);
        toast.error("Invalid Email!");
        if (!user.password) {
          toast.error("Invalid Password!");
        }
        return;
      }

      // Compare the password using bcrypt
      const isPasswordValid = await bcrypt.compare(
        formData.password,
        user.hashedPassword
      );

      if (isPasswordValid) {
        setIsAuthenticated(true);
        setError(false);
        localStorage.setItem("employee-profile", JSON.stringify(user))
        if (user.access_level === "employee") {
          navigate("/employee")
        }
        if (user.access_level === "admin") {
          // window.location.href="https://mui.com/material-ui/react-app-bar/#app-bar-with-responsive-menu"
          navigate("/employee")
        }
      } else {
        toast.error("Invalid Password!");
        setError(true);
      }
    } catch (error) {
      console.error("Error during login process:", error);
      setError(true);
    } finally {
      setLoading(false);
      button.style.backgroundColor = "#ff914d";
    }
  };

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
            className={error ? "input error-input" : "input"}
          />
          <p className="error-msg">{error ? "*required" : ""}</p>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className={error ? "input error-input" : "input"}
            required
          />
          <p className="error-msg">{error ? "*required" : ""}</p>
          <div
            style={{ borderTop: "1px solid lightgray", marginBottom: "10px" }}
          ></div>
          <button type="submit" className="login-button">
            {loading ? <CircularProgress size={10} color="white" /> : "Login"}
          </button>
        </form>
      </div>
      <Toaster richColors />
    </div>
  );
};

export default LoginPage;
