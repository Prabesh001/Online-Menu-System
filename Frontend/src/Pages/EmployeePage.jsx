import React, { useState, useContext, useEffect } from "react";
import "./Styles/EmployeePage.css";
import { CartContext, ItemContext, AuthContext } from "../App";
import { Toaster, toast } from "sonner";
import LoadingComponent from "../Components/Loading/loading";
import Popup from "../Components/Popup";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { fetchItems } from "../JavaScript/fetchData";
import data from "../Javascript/MOCK_DATA.json";

function EmployeePage() {
  const { loading, setLoading } = useContext(ItemContext);
  const { popupVisiblilty, setPopupVisiblilty } = useContext(CartContext);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

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
      field: "description",
      headerName: "Quantity",
      width:200
    },
    {
      field: "price",
      headerName: "Price(Unit)",
      flex: 1,
    },
    {
      field: "",
      headerName: "Ordered Time",
      flex: 1,
    },
    {
      field: "fullName",
      headerName: "Delivery",
      description: "Is item delivered?",
      flex: 1,
      valueGetter: (value, row) =>
        `${row.firstName || ""} ${row.lastName || ""}`,
    },
  ];

  const [items, setItems] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchItems();
        const formattedData = data.map(({ _id, ...rest }, index) => ({
          id: index,
          ...rest,
        }));
        setItems(formattedData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    getData();
  }, []);

  return (
    <div style={{ padding: "10px" }}>
      <Toaster richColors />
      <span style={{ fontSize: "20px", fontWeight: "bold" }}>
        Orders from Table No.{" "}
      </span>

      <select name="Table No" id="">
        <option value="1">1</option>
        <option value="1">2</option>
      </select>

      <Box sx={{ height: 700, width: "100%" }}>
        <DataGrid
          rows={items}
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
