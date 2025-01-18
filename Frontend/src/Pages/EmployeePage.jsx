import React, { useState, useContext, useEffect } from "react";
import "./Styles/EmployeePage.css";
import { CartContext, ItemContext, AuthContext } from "../App";
import { Toaster, toast } from "sonner";
import LoadingComponent from "../Components/Loading/loading";
import Popup from "../Components/Popup";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { fetchItems } from "../JavaScript/fetchData";
import { fetchOrders } from "../JavaScript/fetchData";

function EmployeePage() {
  document.title = "TableMate | Employee";
  const { loading, setLoading } = useContext(ItemContext);
  const { popupVisiblilty, setPopupVisiblilty } = useContext(CartContext);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [selectedTable, setSelectedTable] = useState("");
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  
  const displayTime = (time) => {
    const date = new Date(time);

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");

    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    const formattedTime = `${hours}:${minutes}:${seconds} ${period}`;
    return formattedTime;
  };

  const handleChange = (event) => {
    setSelectedTable(event.target.value);
  };

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const data = await fetchOrders();
        setAllOrders(data);

        const myTable = data.find(ele=>ele.orders.length!==0)
        setSelectedTable(myTable.table)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllOrders();
  }, []);

  useEffect(() => {
    if (selectedTable) {
      const tableData = allOrders.find(
        (item) => Number(item.table) === Number(selectedTable)
      );

      if (tableData && tableData.orders) {
        const formattedData = tableData.orders.map(({ _id, ...rest }, index) => ({
          id: index,
          ...rest,
        }));
        setFilteredOrders(formattedData);
      } else {
        setFilteredOrders([]);
      }
    }
  }, [selectedTable, allOrders]);

  console.log(filteredOrders);


  function handleLogout() {
    setLoading(true);
    setTimeout(() => {
      setPopupVisiblilty(false);
      setLoading(false);
      setIsAuthenticated(!isAuthenticated);
    }, 2000);
  }

  if (loading) {
    return <LoadingComponent />;
  }
  const styleButton = { backgroundColor: "red" };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Item Name",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 200,
    },
    {
      field: "price",
      headerName: "Price(Unit)",
      flex: 1,
    },
    {
      field: "orderedTime",
      headerName: "Ordered Time",
      flex: 1,
    },
    {
      field: "isDelivered",
      headerName: "Delivery",
      description: "Is item delivered?",
      flex: 1,
      editable: true,
    },
  ];

  return (
    <div style={{ padding: "10px" }}>
      <Toaster richColors />
      <span style={{ fontSize: "20px", fontWeight: "bold" }}>
        Orders from Table No.{" "}
      </span>

      <select name="Table No" value={selectedTable} onChange={handleChange}>
        <option value="" disabled>
          Select a table
        </option>
        {Array.from({ length: 25 }, (_, index) => (
          <option key={index + 1} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>

      <Box sx={{ height: 700, width: "100%" }}>
        <DataGrid
          rows={filteredOrders}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 100,
              },
            },
          }}
          pageSizeOptions={[100]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
      <br />
      <button
        className="close-btn"
        style={styleButton}
        onClick={() => setPopupVisiblilty(true)}
      >
        Logout
      </button>
      {popupVisiblilty && (
        <Popup
          greeting="Logout!"
          message={<p>Are you sure you want to Logout?</p>}
          addButtons={
            <button
              className="close-btn"
              style={styleButton}
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          }
        />
      )}
    </div>
  );
}

export default EmployeePage;
