import React, { useState, useContext, useEffect } from "react";
import "./Styles/login.css";
import { AuthContext } from "../App.jsx";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
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

  // const handleSubmit = async (e) => {

  // try {
  //   const response = await fetch("https://your-backend-api.com/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email: formData.email,
  //       password: formData.password,
  //     }),
  //   });

  //   if (response.ok) {
  //     const data = await response.json();
  //     console.log("Sign In Success:", data);
  //     alert("Signed in successfully!");
  //   } else {
  //     const error = await response.json();
  //     alert(`Sign In Failed: ${error.message}`);
  //   }
  // } catch (error) {
  //   console.error("Error during sign in:", error);
  //   alert("An error occurred. Please try again.");
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.email === "prabeshdaahal123@gmail.com" &&
      formData.password === "dahal"
    ) {
      setIsAuthenticated(true);
      navigate("/employee");
    } else {
      alert("Sign In Failed");
    }
  };

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

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
