import React from "react";
import { useNavigate } from "react-router-dom";

function PaymentFailure() {
  const navigate = useNavigate();
  return (
    <div>
      <div>PaymentFailure</div>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Return Home
      </button>
    </div>
  );
}

export default PaymentFailure;
