import { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";
import { CartContext } from "../../App.jsx";

const Payment = ({ amount }) => {
  const { setClickPayment } = useContext(CartContext);
  amount = Number(amount);
  const [formData, setformData] = useState({
    amount: amount,
    tax_amount: "0",
    total_amount: amount,
    transaction_uuid: uuidv4(),
    product_service_charge: "0",
    product_delivery_charge: "0",
    product_code: "EPAYTEST",
    success_url: "http://localhost:5173/paymentsuccess",
    failure_url: "http://localhost:5173/paymentfailure",
    signed_field_names: "total_amount,transaction_uuid,product_code",
    signature: "",
    secret: "8gBm/:&EnhH.1/q",
  });

  // generate signature function
  const generateSignature = (
    total_amount,
    transaction_uuid,
    product_code,
    secret
  ) => {
    const hashString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    const hash = CryptoJS.HmacSHA256(hashString, secret);
    return CryptoJS.enc.Base64.stringify(hash);
  };

  // useeffect
  useEffect(() => {
    const { total_amount, transaction_uuid, product_code, secret } = formData;
    const hashedSignature = generateSignature(
      total_amount,
      transaction_uuid,
      product_code,
      secret
    );

    setformData({ ...formData, signature: hashedSignature });
  }, [formData.amount]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setClickPayment(true);
  
    setTimeout(() => {
      document.getElementById("payment-form").submit();
    }, 100);
  };
  

  return (
    <div>
      <form
        id="payment-form"
        action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
        method="POST"
      >
        <div className="field">
          <input
            type="hidden"
            id="amount"
            name="amount"
            autoComplete="off"
            value={formData.amount}
            required
          />
        </div>
        <input
          type="hidden"
          id="tax_amount"
          name="tax_amount"
          value={formData.tax_amount}
        />
        <input
          type="hidden"
          id="total_amount"
          name="total_amount"
          value={formData.total_amount}
        />
        <input
          type="hidden"
          id="transaction_uuid"
          name="transaction_uuid"
          value={formData.transaction_uuid}
        />
        <input
          type="hidden"
          id="product_code"
          name="product_code"
          value={formData.product_code}
        />
        <input
          type="hidden"
          id="product_service_charge"
          name="product_service_charge"
          value={formData.product_service_charge}
        />
        <input
          type="hidden"
          id="product_delivery_charge"
          name="product_delivery_charge"
          value={formData.product_delivery_charge}
        />
        <input
          type="hidden"
          id="success_url"
          name="success_url"
          value={formData.success_url}
        />
        <input
          type="hidden"
          id="failure_url"
          name="failure_url"
          value={formData.failure_url}
        />
        <input
          type="hidden"
          id="signed_field_names"
          name="signed_field_names"
          value={formData.signed_field_names}
        />
        <input
          type="hidden"
          id="signature"
          name="signature"
          value={formData.signature}
        />
        <button className="payment-btn" type="submit" onClick={handleSubmit}>
          Payment
        </button>
      </form>
    </div>
  );
};

export default Payment;
