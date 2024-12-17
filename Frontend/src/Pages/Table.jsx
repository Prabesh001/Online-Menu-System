import React from "react";
import tableImage from "../Components/assets/Table.png";
import "./Styles/Table.css";

function Table({ value, onclick }) {
  return (
    <div className="table-container" title="Your Orders!" onClick={onclick}>
      <img src={tableImage} alt="Table" className="table-image" />
      <div className="counter" title={value}>
        {value}
      </div>
    </div>
  );
}

export default Table;
