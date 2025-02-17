import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { fetchItems } from "../../../../Frontend/src/JavaScript/fetchData";
import { handleToggleClick, handleDeleteClick } from "./actions";

const Index = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchItems();
        setItems(data.map((item, index) => ({ id: index, ...item })));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 2,
      cellClassName: "name-column--cell",
    },
    { field: "price", headerName: "Price (Rs.)" },
    { field: "description", headerName: "Description", flex: 4 },
    {
      field: "availability",
      headerName: "Availability",
      flex: 1,
      renderCell: ({ row }) => (
        <Box
          display="flex"
          justifyContent="center"
          p="8px"
          onClick={() => handleToggleClick(row._id, row.availability, setItems)}
        >
          {row.availability ? (
            <ToggleOnIcon
              fontSize="large"
              sx={{ color: colors.greenAccent[600] }}
            />
          ) : (
            <ToggleOffIcon fontSize="large" />
          )}
        </Box>
      ),
    },
    {
      field: "update",
      headerName: "Update",
      flex: 1,
      renderCell: ({ row }) => (
        <Box
          width="60%"
          m="0 auto"
          p="8px"
          borderRadius="4px"
          display="flex"
          justifyContent="center"
          onClick={() => handleDeleteClick(row._id, row.name, setItems)}
          sx={{
            cursor: "pointer",
            "&:hover": { backgroundColor: colors.greenAccent[400] },
          }}
        >
          <DeleteIcon fontSize="large" />
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px" overflow="hidden">
      <Header title="Items" subtitle="Managing the Menu Items" />
      <ToastContainer />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .name-column--cell": { color: colors.greenAccent[300] },
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
        <DataGrid
          rows={items}
          columns={columns}
          checkboxSelection
          sx={{
            maxHeight: "74vh",
            minHeight: "20vh",
            "& .MuiDataGrid-columnHeaders": {
              fontSize: "16px",
              fontWeight: "bold",
              border: `1px solid ${colors.blueAccent[700]}`,
            },
          }}
          slots={{
            toolbar: GridToolbar,
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              sx: {
                backgroundColor: colors.primary[400],
                padding: "6px 12px",
                "& .MuiTypography-root": {
                  color: colors.greenAccent[300],
                },
                "& .MuiButton-root": {
                  color: colors.greenAccent[300],
                  fontSize:"0.8rem",
                },
                "& .MuiInputBase-input": {
                  color: colors.greenAccent[100],
                },
                "& .MuiSvgIcon-root": {
                  color: colors.greenAccent[300],
                },
                "& .MuiDataGrid-toolbarContainer": {
                  fontSize:"25px",
                },
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Index;
