import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { toast } from "sonner";
import { AuthContext } from "../App.jsx";
import "./Styles/login.css";
import { base_url } from "../../render.js";

const LoginPage = () => {
  document.title = "TableMate | Login";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${base_url}/api/employee/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Login failed!");
        setError(true);
        return;
      }

      localStorage.setItem("token", data.token);
      setIsAuthenticated(true);

      toast.success("Login successful!");
      navigate("/employee");
    } catch (error) {
      toast.error("Error logging in!");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h1 style={{color:"white", textShadow:"1px 1px 3px black"}}>TableMate</h1>
      <i style={{color:"white", textShadow:"1px 1px 3px black"}}>(Employee Only)</i>
      <div className="login-container">
        <h2 style={{color:"white", textShadow:"3px 2px 3px black"}}>Log In</h2>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className={error ? "input error-input" : "input"}
          />
          <p className="error-msg">
            {error ? "*Check your email properly" : ""}
          </p>
          <div className="password-field">
            <div
              className="eye-field"
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? (
                <IoEyeOffOutline fontSize={20} />
              ) : (
                <IoEyeOutline fontSize={20} />
              )}
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              id="login-password"
              value={formData.password}
              onChange={handleInputChange}
              className={error ? "input error-input" : "input"}
              required
            />
          </div>
          <p className="error-msg">
            {error ? "*Check your password properly" : ""}
          </p>
          <button type="submit" className="login-button">
            {loading ? <CircularProgress size={10} color="white" /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
