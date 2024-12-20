import React, { useEffect } from "react";
import "./popup.css";

function Popup({ greeting, message, closePopup, addButtons }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="popup-overlay">
      <div className="popup-window">
        <h2 style={{ color: "red" }}>{greeting}</h2>
        <div>{message}</div>
        <div className="popup-btn-section">
          {addButtons}
          <button className="close-btn" onClick={closePopup}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
