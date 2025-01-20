import React, { useEffect, useContext, useState } from "react";
import Table from "../Components/assets/OrderTable.png";
import "./Styles/TableReserve.css";
import { CartContext } from "../App";
import { useNavigate } from "react-router-dom";
import { fetchOrders } from "../JavaScript/fetchData";
import Footer from "../Components/Footer";
import LoadingComponent from "../Components/Loading/loading";

function TableReserve() {
  const { tableNumber, setTableNumber } = useContext(CartContext);
  const navigate = useNavigate();
  const [availableTable, setAvailableTable] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const tabledata = await fetchOrders();
        const myTable = tabledata.filter((tab)=>tab.available===true)
        setAvailableTable(myTable)
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false)
      }
    };
    
    fetchData();
  }, []);

  const bookTable = (TableNumber) => {
    if (tableNumber !== null) {
      navigate("/Home");
    } else {
      setTableNumber(TableNumber);
      localStorage.setItem("TableNumber", TableNumber);
      navigate("/Home");
    }
  };

  return (
    <>
      <center>
        <h1>Reserve Your Table:</h1>

        <div className="table-warning">
          Alert! Please check your Table no. carefully before selecting table.
          In case you choose wrong table no. then your food may not reach you.
        </div>
      </center>
      {loading?<LoadingComponent mh={36.9}/>:<div className="table-collection">
        {availableTable.map((element, i) => {
          const TableNumber = element.table;
          return (
            <div
              className="booking-table"
              onClick={() => bookTable(TableNumber)}
              key={i}
            >
              <img src={Table} alt="" />
              <p>Table No. {TableNumber}</p>
            </div>
          );
        })}
      </div>}
      <Footer/>
    </>
  );
}

export default TableReserve;
