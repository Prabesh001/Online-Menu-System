import React from "react";
import { useNavigate } from "react-router-dom";
function PaymentSuccess({clearAll}) {
  const navigate = useNavigate();
  setTimeout(() => {
    navigate("/");
  }, 5000);

  return (
    <div>
      <div>PaymentSuccess</div>
    </div>
  );
}

export default PaymentSuccess;
