import React, { useState, useContext, useEffect } from "react";
import "../Styles/EmployeePage.css";
import { AuthContext } from "../../App";
import { Toaster, toast } from "sonner";
import Popup from "../../Components/Popup";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Select, MenuItem } from "@mui/material"; // Added import
import { fetchOrders } from "../../JavaScript/fetchData";
import EmployeeNavbar from "./EmployeeNavbar";
import Footer from "../../Components/Footer";

function EmployeePage() {
  document.title = "TableMate | Employee";
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [selectedTable, setSelectedTable] = useState("");
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const displayTime = (time) => {
    const date = new Date(time);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes}:${seconds} ${period}`;
  };

  const handleChange = (event) => {
    setSelectedTable(event.target.value);
  };

  useEffect(() => {
    const fetchAllOrders = async () => {
      setLoading(true);
      try {
        const data = await fetchOrders();
        setAllOrders(data);
        const myTable = data.find((ele) => ele.orders.length !== 0);
        if (myTable) setSelectedTable(myTable.table);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllOrders();
  }, []);

  useEffect(() => {
    if (selectedTable) {
      const tableData = allOrders.find(
        (item) => Number(item.table) === Number(selectedTable)
      );

      if (tableData?.orders) {
        const formattedData = tableData.orders.map(
          ({ _id, ...rest }, index) => ({
            id: index,
            ...rest,
          })
        );
        setFilteredOrders(formattedData);
      } else {
        setFilteredOrders([]);
      }
    }
  }, [selectedTable, allOrders]);

  function EditDeliveryCell(props) {
    const { id, value, api } = props;

    const handleChange = (event) => {
      const newValue = event.target.value;
      api.setEditCellValue({ id, field: "isDelivered", value: newValue });
      api.stopCellEditMode({ id, field: "isDelivered" });
    };

    return (
      <Select value={value || ""} onChange={handleChange} fullWidth>
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
      </Select>
    );
  }

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Item Name", flex: 2 },
    { field: "quantity", headerName: "Quantity", width: 100 },
    { field: "price", headerName: "Price(Unit)", flex: 1 },
    { field: "orderedTime", headerName: "Ordered Time", flex: 1 },
    {
      field: "isDelivered",
      headerName: "Delivered",
      description: "Is item delivered?",
      flex: 1,
      editable: true,
      renderEditCell: (params) => <EditDeliveryCell {...params} />,
    },
  ];

  return (
    <div>
      <EmployeeNavbar />
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
        <Box sx={{ minHeight: 300, width: "100%" }}>
          <DataGrid
            rows={filteredOrders}
            columns={columns}
            checkboxSelection
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 100,
                },
              },
            }}
            pageSizeOptions={[100]}
          />
        </Box>
      </div>
      <Footer />
    </div>
  );
}

export default EmployeePage;

// {loading ? (
//   <p>Loading orders...</p>
// ) : filteredOrders.length > 0 ? (
//   <DataGrid
//     rows={filteredOrders}
//     columns={columns}
//     checkboxSelection
//     initialState={{
//       pagination: {
//         paginationModel: {
//           pageSize: 100,
//         },
//       },
//     }}
//     pageSizeOptions={[100]}
//   />
// ) : (
//   <DataGrid
//     rows={filteredOrders}
//     columns={columns}
//     checkboxSelection
//     initialState={{
//       pagination: {
//         paginationModel: {
//           pageSize: 100,
//         },
//       },
//     }}
//     pageSizeOptions={[100]}
//   />
// )}
