import React, { useState } from "react";
import "././Styles/login.css";

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Sign In and Sign Up
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleToggle = () => {
    setIsSignUp((prev) => !prev);
    setFormData({ email: "", password: "", confirmPassword: "" }); // Reset form
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      console.log("Sign Up Data:", formData);
      alert("Account created successfully!");
    } else {
      console.log("Sign In Data:", formData);
      alert("Signed in successfully!");
    }
  };

  return (
    <div className="login-page">
      <div className="container">
      <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
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
        {isSignUp && (
          <>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="input"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.formNumber}
            onChange={handleInputChange}
            className="input"
            required
          />
          </>
        )}
        <button type="submit" className="button">
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </form>
      <p className="toggleText">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <button onClick={handleToggle} className="toggleButton">
          {isSignUp ? "Sign In" : "Sign Up"}
        </button>
      </p>
    </div>
    </div>
  );
};

export default LoginPage;
