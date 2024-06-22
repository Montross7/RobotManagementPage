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

function StarButton(props: any) {
  const { isActive } = props;
  return (
    <IconButton>{isActive ? <StarIcon /> : <StarOutlineIcon />}</IconButton>
  );
}

export default StarButton;
