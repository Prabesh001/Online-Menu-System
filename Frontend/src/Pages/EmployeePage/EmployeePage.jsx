import React, { useState, useContext, useEffect } from "react";
import "../Styles/EmployeePage.css";
import { Toaster, toast } from "sonner";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { fetchOrders } from "../../JavaScript/fetchData";
import { ItemContext } from "../../App.jsx";
import EmployeeNavbar from "./EmployeeNavbar";
import Footer from "../../Components/Footer";
import LoadingComponent from "../../Components/Loading/loading.jsx";

function EmployeePage() {
  document.title = "TableMate | Employee";
  const [selectedTable, setSelectedTable] = useState("");
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const { loading, setLoading } = useContext(ItemContext);
  const [reservedTable, setReservedTable] = useState([]);

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
        
        const reservedTable = data.filter((ele) => ele.available === false);
        setReservedTable(reservedTable);

        if (myTable) {
          setSelectedTable(myTable.table);
        }
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
        <MenuItem value="True">true</MenuItem>
        <MenuItem value="False">false</MenuItem>
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
      <EmployeeNavbar reservedTable={ reservedTable } />
      {loading ? (
        <LoadingComponent mh={46.7} />
      ) : (
        <div style={{ padding: "20px 15px" }}>
          <span style={{ fontSize: "20px", fontWeight: "bold", marginRight:"10px" }}>
            Orders from Table No.
          </span>

          <FormControl>
            <InputLabel id="demo-simple-select-label">Table</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedTable}
              label="Table No."
              onChange={handleChange}
              style={{height:"40px"}}
            >
              {reservedTable.map((table) => (
                <MenuItem key={table.table} value={table.table}>
                  {table.table}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ minHeight: 277, width: "100%", marginTop:"20px" }}>
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
      )}
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
