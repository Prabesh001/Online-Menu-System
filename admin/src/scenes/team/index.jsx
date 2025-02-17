import React, { useState, useEffect,useContext } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { fetchTeams } from "../../../../Frontend/src/JavaScript/fetchData";
import {CollectDataContext} from "../../App"

function Team() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [team, setTeam] = useState([]);
  const {setTeamMember} = useContext(CollectDataContext)

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchTeams();
        const formattedData = data.map(({ _id, ...rest }, index) => ({
          id: _id,
          ...rest,
        }));
        setTeam(formattedData);
        setTeamMember(formattedData.length)
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    getData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "first_name",
      headerName: "Name",
      flex: 3,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone_number",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "access_level",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access_level } }) => {
        return (
          <Box
            width="100px"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            position="relative"
            height="30px"
            backgroundColor={
              access_level === "admin"
                ? colors.greenAccent[600]
                : access_level === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access_level}
            </Typography>
          </Box>
        );
      },
    },
  ];
  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box
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
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
        }}
      >
        <DataGrid rows={team} columns={columns} 
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
                color: colors.primary,
              },
              "& .MuiSvgIcon-root": {
                color: colors.greenAccent[300],
              },
              "& .MuiDataGrid-toolbarContainer": {
                fontSize:"25px",
              },
            },
          },
        }}/>
      </Box>
    </Box>
  );
}

export default Team;
