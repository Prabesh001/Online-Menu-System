import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Styles/Welcome.css";
import { GoogleLogin } from "@react-oauth/google";

function Welcome() {
  const navigate = useNavigate();
  const handleLoginSuccess = (response) => {
    console.log("login successful: ", response);
    navigate("/home");
  };
  
  const handleLoginFailure = (error) => {
    console.error("Login Failed: ", error);
    <p>Login Failed! Try Again!</p>
  };
  return (
    <div className="welcome-page">
      <div>
        <Link to="/home">
          <button className="welcome-button">Guest</button>
        </Link>
      </div>

      <div>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
        />
      </div>
    </div>
  );
}

export default Welcome;
