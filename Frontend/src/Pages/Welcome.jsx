import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles/Welcome.css";
import { CartContext } from "../App.jsx";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { handlePostUser } from "../JavaScript/fetchData.js";

function Welcome() {
  const [user, setUser] = useState(null);
  const { setCoupen, tableNumber } = useContext(CartContext);
  const navigate = useNavigate();

  function handleEntry() {
    if (tableNumber !== null) {
      navigate("/Home");
    } else {
      navigate("/reserve-seat");
    }
  }

  const handleLoginSuccess = async(response) => {
    console.log("Login successful: ", response);
    localStorage.setItem("credential", response.credential)
    const decodedUser = jwtDecode(response.credential);
    await handlePostUser({name:decodedUser.name, email:decodedUser.email, credential:response.credential})

    setUser(decodedUser);
    console.log(user)

    setCoupen(true);
    handleEntry();
  };

  const handleLoginFailure = (error) => {
    console.error("Login Failed: ", error);
    <p>Login Failed! Try Again!</p>;
  };

  const handleGuestId=()=> {
    handleEntry();
    setCoupen(false);
  }

  return (
    <div className="welcome-page">
      <div className="window-overlay"></div>
      <div className="user-btn">
        <div>
          <button className="welcome-button" onClick={handleGuestId}>
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
