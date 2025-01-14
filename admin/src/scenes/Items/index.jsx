import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { fetchItems } from "../../../../Frontend/src/JavaScript/fetchData";
import { useState, useEffect } from "react";

const Index = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
        console.log(formattedData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    getData();
  }, []);

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
      flex: 4
    }
  ];

  return (
    <Box>
      <Header title="Items" subtitle="Managing the Menu Items" />
      <Box
        m="40px 0 0 0"
        height="75vh"
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
