import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Styles/Welcome.css";
import { GoogleLogin } from "@react-oauth/google";

function Welcome({coupen, setCoupen}) {
  const navigate = useNavigate();
  const handleLoginSuccess = (response) => {
    console.log("login successful: ", response);
    navigate("/Home");
    setCoupen(true);
  };
  
  const handleLoginFailure = (error) => {
    console.error("Login Failed: ", error);
    <p>Login Failed! Try Again!</p>
  };

  function handleGuestId(){
    setCoupen(false)
    localStorage.setItem("user", coupen)
  }
  return (
    <div className="welcome-page">
      <div className="window-overlay"></div>
      <div className="user-btn">
        <div>
          <Link to="/home">
            <button className="welcome-button" onClick={()=>handleGuestId()}>Guest</button>
          </Link>
        </div>
  
        <div>
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
          />
        </div>
      </div>
    </div>
  );
}

export default Welcome;
