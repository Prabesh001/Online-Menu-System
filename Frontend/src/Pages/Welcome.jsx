import React from "react";
import { Link } from "react-router-dom";
import "./Styles/Welcome.css";

function Welcome() {
  return (
    <div className="welcome-page">
      <div>
        <Link to="/home">
          <button className="welcome-button">Guest</button>
        </Link>
      </div>

      <div>
        <Link to="/login">
          <button className="welcome-button">Login</button>
        </Link>
      </div>
    </div>
  );
}

export default Welcome;
