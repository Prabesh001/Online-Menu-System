import React, { useState, useContext, useEffect } from "react";
import "../Styles/EmployeePage.css";
import { Toaster, toast } from "sonner";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Hidden,
} from "@mui/material";
import { fetchOrders } from "../../JavaScript/fetchData";
import { CartContext, ItemContext } from "../../App.jsx";
import EmployeeNavbar from "./EmployeeNavbar";
import Footer from "../../Components/Footer";
import LoadingComponent from "../../Components/Loading/loading.jsx";
import Popup from "../../Components/Popup/index.jsx";
import { base_url } from "../../../../render.js";

function EmployeePage() {
  document.title = "TableMate | Employee";
  const [selectedTable, setSelectedTable] = useState(0);
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [reservedTable, setReservedTable] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [updateRow, setUpdateRow] = useState([]);

  console.log(selectedTable);

  const { loading, setLoading } = useContext(ItemContext);
  const { popupVisiblilty, setPopupVisiblilty } = useContext(CartContext);

  const handleChange = (event) => {
    setSelectedTable(event.target.value);
  };

  useEffect(() => {
    const myData = filteredOrders.filter((item) => item.id === selectedRows[0]);
    if (myData.length > 0) {
      setUpdateRow(myData);
    }
  }, [selectedRows]);

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (updateRow.length > 0) {
      setFormData({
        id: updateRow[0].id,
        name: updateRow[0].name,
        quantity: updateRow[0].quantity,
        amountDelivered: "",
      });
    }
  }, [updateRow]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "amountDelivered" && value > formData.quantity) {
      toast.error("Delivered amount cannot exceed available quantity!");
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeliverAll = async () => {
    try {
      for (const orderId of selectedRows) {
        const response = await fetch(
          `${base_url}/api/table/move-order/full-delivery`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId, selectedTable }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to move order");
        }
      }

      toast.success("Delivered successfully!");
      setSelectedRows([]);
      setFilteredOrders(
        filteredOrders.filter((order) => !selectedRows.includes(order.id))
      );
    } catch (err) {
      toast.error("Operation Failed: " + err.message);
    } finally {
      setPopupVisiblilty(null);
    }
  };

  const handleDeliverAmount = async () => {
    if (!formData.amountDelivered || formData.amountDelivered <= 0) {
      toast.error("Enter a valid amount to deliver!");
      return;
    }

    try {
      const response = await fetch(
        `${base_url}/api/table/move-order/partial-delivery`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: formData.id,
            selectedTable,
            deliveredAmount: formData.amountDelivered,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update order delivery");
      }

      toast.success("Amount Delivered Successfully!");
      setSelectedRows([]);

      // Update local state: Reduce quantity if partially delivered
      setFilteredOrders((prevOrders) =>
        prevOrders
          .map((order) =>
            order.id === formData.id
              ? {
                  ...order,
                  quantity: order.quantity - formData.amountDelivered,
                }
              : order
          )
          .filter((order) => order.quantity > 0)
      );

      setPopupVisiblilty(null);
      setFormData({ id: "", name: "", quantity: 0, amountDelivered: "" });
    } catch (err) {
      toast.error("Operation Failed: " + err.message);
    }
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
    const refreshTimer = setInterval(fetchAllOrders, 60000);

    return () => clearInterval(refreshTimer);
  }, []);

  useEffect(() => {
    if (selectedTable) {
      const tableData = allOrders.find(
        (item) => Number(item.table) === Number(selectedTable)
      );

      if (tableData?.orders) {
        const formattedData = tableData.orders.map(({ _id, ...ele }, i) => ({
          rank: i,
          id: _id,
          ...ele,
        }));
        setFilteredOrders(formattedData);
      } else {
        setFilteredOrders([]);
      }
    }
  }, [selectedTable, allOrders]);

  const columns = [
    { field: "rank", headerName: "S.N.", width: 90 },
    { field: "id", headerName: "ID", width: 10 },
    { field: "name", headerName: "Item Name", flex: 2 },
    { field: "quantity", headerName: "Quantity", width: 100 },
    { field: "discountedPrice", headerName: "Price", flex: 1 },
    { field: "orderedTime", headerName: "Ordered Time", flex: 1 },
  ];

  return (
    <div>
      <EmployeeNavbar reservedTable={reservedTable} />
      {loading ? (
        <LoadingComponent mh={46.7} />
      ) : (
        <div style={{ padding: "20px 15px" }}>
          <span
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginRight: "10px",
            }}
          >
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
              style={
                selectedTable
                  ? { height: "40px" }
                  : { height: "40px", width: "90px" }
              }
            >
              {reservedTable
                .sort((a, b) => a.table - b.table)
                .map((table) => (
                  <MenuItem key={table.table} value={table.table}>
                    {table.table}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Box sx={{ minHeight: 277, width: "100%", marginTop: "20px" }}>
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
              rowSelectionModel={selectedRows}
              onRowSelectionModelChange={(newSelection) => {
                setSelectedRows(newSelection);
              }}
            />
          </Box>
        </div>
      )}

      <button
        className="update border-1"
        style={{
          margin: "5px",
          border: "1px solid green",
          backgroundColor: "green",
          color: "white",
          padding: "4px 8px",
        }}
        onClick={() => setPopupVisiblilty("update")}
      >
        Update
      </button>

      <button
        className="deliverAll border-1 text-bg-dark"
        style={{ margin: "5px", padding: "4px 8px" }}
        onClick={() => setPopupVisiblilty("deliverAll")}
      >
        Deliver All
      </button>

      <Footer />

      {selectedRows.length !== 0 && popupVisiblilty === "deliverAll" && (
        <Popup
          greeting={"Deliver All!"}
          message={"Are you sure you delivered all?"}
          addButtons={
            <button
              className="close-btn"
              style={{ backgroundColor: "green" }}
              onClick={handleDeliverAll}
            >
              Deliver All
            </button>
          }
        />
      )}

      {selectedRows.length !== 0 && popupVisiblilty === "update" && (
        <Popup
          greeting={"Update"}
          message={
            <form
              className="flex flex-col gap-2 mt-3 text-[18px]"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <input
                type="hidden"
                name="id"
                className="w-full p-2 border border-gray-400 rounded-md"
                placeholder="Order ID"
                value={formData.id}
                readOnly
              />
              <input
                type="text"
                name="name"
                className="w-full p-2 border border-gray-400 rounded-md"
                placeholder="Item Name"
                value={formData.name}
                readOnly
              />
              <input
                type="number"
                name="quantity"
                className="w-full p-2 border border-gray-400 rounded-md"
                placeholder="Quantity"
                value={formData.quantity}
                readOnly
              />
              <input
                type="number"
                name="amountDelivered"
                className="w-full p-2 border border-gray-400 rounded-md"
                placeholder="Amount to Deliver"
                value={formData.amountDelivered}
                onChange={handleInputChange}
                max={formData.quantity}
              />
            </form>
          }
          addButtons={
            <button
              className="close-btn"
              style={{ backgroundColor: "green" }}
              onClick={handleDeliverAmount}
            >
              Deliver Amount
            </button>
          }
        />
      )}
    </div>
  );
}

export default EmployeePage;
