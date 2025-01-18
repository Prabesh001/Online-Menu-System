import { Box, Typography, useTheme } from "@mui/material";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { fetchItems } from "../../../../Frontend/src/JavaScript/fetchData";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Index = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchItems();
        const formattedData = data.map((item, index) => ({
          id: index,
          _id: item._id,
          ...item,
        }));
        setItems(formattedData);
        console.log(formattedData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    getData();
  }, []);
  const handleToggleClick = (item) => {
    const updatedItems = items.map((i) =>
      i._id === item._id ? { ...i, availability: !i.availability } : i
    );
    setItems(updatedItems);
  };

  const handleUpdateClick = async (item) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/menu/${item._id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      setItems((prevItems) => prevItems.filter((i) => i._id !== item._id));
      toast.success(`Item deleted: ${item.name}`);
    } catch (error) {
      toast.error("Error deleting item");
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "name",
      headerName: "Name",
      flex: 2,
      cellClassName: "name-column--cell",
    },
    {
      field: "price",
      headerName: "Price(Rs.)",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 4,
    },
    {
      field: "availability",
      headerName: "Availability",
      flex: 1,
      renderCell: (params) => (
        <Box
          display="flex"
          justifyContent="center"
          p="8px"
          onClick={() => handleToggleClick(params.row)}
        >
          {params.row.availability ? (
            <ToggleOnIcon
              fontSize="large"
              style={{
                color: colors.greenAccent[600],
              }}
            />
          ) : (
            <ToggleOffIcon />
          )}
        </Box>
      ),
    },
    {
      field: "update",
      headerName: "Update",
      flex: 1,
      renderCell: (params) => (
        <Box
          width="60%"
          m="0 auto"
          p="8px"
          borderRadius="4px"
          display="flex"
          justifyContent="center"
          onClick={() => handleUpdateClick(params.row)}
          sx={{
            cursor: "pointer",
            "&:hover": {
              backgroundColor: colors.greenAccent[400],
            },
          }}
        >
          <DeleteIcon fontSize="large" style={{}} />
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Items" subtitle="Managing the Menu Items" />
      <ToastContainer />
      <Box
        m="40px 0 0 0"
        height="75vh"
        width="91vw"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
        }}
      >
        <DataGrid rows={items} columns={columns} />
      </Box>
    </Box>
  );
};

export default Index;