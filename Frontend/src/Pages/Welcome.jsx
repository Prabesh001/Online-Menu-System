import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles/Welcome.css";
import { CartContext } from "../App.jsx";
import { GoogleLogin } from "@react-oauth/google";

function Welcome() {
  const { coupen, setCoupen } = useContext(CartContext);
  const navigate = useNavigate();
  const handleLoginSuccess = (response) => {
    console.log("login successful: ", response);
    setCoupen(true);
    navigate("/Home");
  };
  
  const handleLoginFailure = (error) => {
    console.error("Login Failed: ", error);
    <p>Login Failed! Try Again!</p>;
  };
  
  function handleGuestId() {
    navigate("/Home");
    setCoupen(false);
  }
  return (
    <div className="welcome-page">
      <div className="window-overlay"></div>
      <div className="user-btn">
        <div>
            <button className="welcome-button" onClick={() => handleGuestId()}>
              Guest
            </button>
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
