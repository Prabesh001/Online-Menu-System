import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles/Welcome.css";
import { CartContext } from "../App.jsx";
import { GoogleLogin } from "@react-oauth/google";

function Welcome() {
  const { setCoupen, tableNumber } = useContext(CartContext);
  const navigate = useNavigate();

  function handleEntry() {
    if (tableNumber !== null) {
      navigate("/Home");
    } else {
      navigate("/reserve-seat");
    }
  }

  const handleLoginSuccess = (response) => {
    console.log("login successful: ", response);
    setCoupen(true);
    handleEntry();
  };

  const handleLoginFailure = (error) => {
    console.error("Login Failed: ", error);
    <p>Login Failed! Try Again!</p>;
  };

  function handleGuestId() {
    handleEntry();
    setCoupen(false);
  }

  document.addEventListener("offline", () => {
    return <p>Hello</p>;
  });
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
