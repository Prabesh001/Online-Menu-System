import React, { useEffect, useContext } from "react";
import "./popup.css";
import { CartContext } from "../../App";

function Popup({ greeting, message, addButtons }) {
  const { setPopupVisiblilty } = useContext(CartContext);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  
  function closePopup() {
    setPopupVisiblilty(false);
  }

  return (
    <div className="popup-overlay">
      <div className="popup-window">
        <h2 style={{ color: "red" }}>{greeting}</h2>
        <div className="popup-message">{message}</div>
        <div className="popup-btn-section">
          {addButtons}
          <button className="close-btn" onClick={() => closePopup()}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
