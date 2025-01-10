import React, { useContext, useEffect, useState } from "react";
import Table from "../Components/assets/OrderTable.png";
import "./Styles/TableReserve.css";
import { CartContext } from "../App";
import { useNavigate } from "react-router-dom";

function TableReserve({ noOfTables }) {
  const { setTableNumber } = useContext(CartContext);
  const navigate = useNavigate();

  const enterTable = (TableNumber) => {
    setTableNumber(TableNumber);
    console.log(TableNumber);
    navigate("/Home");
    localStorage.setItem("TableNumber", TableNumber);
  };

  return (
    <>
      <center>
        <h1>Reserve Your Table:</h1>

        <div className="table-warning">Alert! Please check your Table no. carefully before selecting table. In case you choose wrong table no. then your food may not reach you.</div>
      </center>
      <div className="table-collection">
        {[...Array(noOfTables)].map((element, i) => {
          const TableNumber = i + 1;
          return (
            <div
              className="booking-table"
              onClick={() => enterTable(TableNumber)}
              key={i}
            >
              <img src={Table} alt="" />
              <p>Table No. {TableNumber}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default TableReserve;
