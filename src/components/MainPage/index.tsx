import {
  Box,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import RobotTable from "../RobotTable";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
// import logo from "./logo.svg";
// import "./Main.css";

function MainPage() {
  const [selectOption, setSelectOption] = useState("all");

  return (
    <Box>
      <Typography variant="h5">Your Fleet</Typography>
      <Container>
        <FormControl fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            value={selectOption}
            onChange={(val: any) => {
              //   console.log(val.target.value);
              setSelectOption(val.target.value);
            }}
          >
            <MenuItem value={"all"}>All Locations</MenuItem>
            <MenuItem value={"starred"}>
              <StarIcon />
              Starred
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-password"
            placeholder="Search robot or location"
            endAdornment={
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            }
            // label="Password"
          />
        </FormControl>
      </Container>
      <RobotTable />
    </Box>
  );
}

export default MainPage;
