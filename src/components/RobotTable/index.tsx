import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
// import logo from "./logo.svg";
// import "./Main.css";
import {
  DataGrid,
  GridColDef,
  GridColumnHeaderParams,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import StarButton from "./StarButton";

/*
{
    id: 1,
    name: "Salty restaurant",
    robot: {
      id: "fghij456",
      is_online: false,
    },
  },
  */

function RobotTable() {
  const columns: GridColDef[] = [
    {
      field: "starred",
      width: 150,
      renderHeader: (params: GridColumnHeaderParams) => (
        <IconButton
          size="small"
          style={{ marginLeft: 16 }}
          // tabIndex={params.hasFocus ? 0 : -1}
        >
          <RefreshIcon />
        </IconButton>
      ),
      renderCell: (params: GridRenderCellParams<any>) => (
        <StarButton isActive={true} />
      ),
    },
    {
      field: "name",
      headerName: "Location",
      width: 150,
      renderCell: (params: GridRenderCellParams<any>) => (
        <Typography>{params.row.name}</Typography>
      ),
    },
    {
      field: "robot",
      headerName: "Robot",
      width: 110,
      valueGetter: (value, row) => {
        return `${row?.robot?.id}`;
      },
      renderCell: (params: GridRenderCellParams<any>) => (
        <Box>
          {params.row?.robot?.id ? (
            <Typography>{params.value}</Typography>
          ) : (
            <Typography>Add</Typography>
          )}
        </Box>
      ),
    },
  ];

  const rows = [
    {
      id: 0,
      name: "Spicy restaurant",
      robot: {
        id: "abcde123",
        is_online: true,
      },
    },
    {
      id: 1,
      name: "Salty restaurant",
      robot: {
        id: "fghij456",
        is_online: false,
      },
    },
    {
      id: 2,
      name: "Salty restaurant",
      robot: undefined,
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 6,
            },
          },
        }}
        pageSizeOptions={[6]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}

export default RobotTable;
