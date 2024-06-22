import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import {
    Box,
    FormControl,
    InputAdornment,
    MenuItem,
    OutlinedInput,
    Select,
    Typography
} from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import RobotTable from "../RobotTable";

function MainPage() {
  const [selectOption, setSelectOption] = useState("all");
  const [locationList, setLocationList] = useState<any>([]);
  const [starredList, setStarredList] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const searchTimer = useRef<any>();

  const handleInput = (val: string) => {
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      setSearchTerm(val);
    }, 500);
  };

  const fetchStarredList = useCallback(() => {
    fetch("/starred_location_ids")
      .then((res) => res.json())
      .then((val) => {
        setStarredList(JSON.parse(val.location_ids));
      });
  }, []);

  useEffect(() => {
    fetch(`/locations?location_name=${searchTerm}&robot_id=${searchTerm}`)
      .then((res) => res.json())
      .then((val) => setLocationList(val.locations));
  }, [searchTerm]);

  useEffect(() => {
    fetchStarredList();
  }, [fetchStarredList]);

  const filteredList = useMemo(() => {
    return locationList
      .map((val: any) => {
        return {
          ...val,
          isStarred: starredList.findIndex((item) => item === val.id) !== -1,
        };
      })
      .filter((item: any) => selectOption === "all" || item.isStarred);
  }, [locationList, starredList, selectOption]);

  return (
    <Box padding={"32px"}>
      <Typography paddingBottom={"8px"} variant="h5">
        Your Fleet
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 0px",
        }}
      >
        <FormControl sx={{ width: "220px" }}>
          <Select
            sx={{
              background: "#FAFAFA",
              color: "#8E8E8E",
              borderRadius: 2,
              "& .MuiSelect-select": {
                padding: "8px",
              },
            }}
            margin="dense"
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
              <StarIcon sx={{ color: "#F7B500" }} />
              Starred
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ width: "240px" }} variant="outlined">
          <OutlinedInput
            sx={{ background: "#FAFAFA", color: "#8E8E8E", borderRadius: 2 }}
            inputProps={{ style: { padding: "8px" } }}
            id="outlined-adornment-password"
            placeholder="Search robot or location"
            margin="dense"
            endAdornment={
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            }
            onChange={(val) => handleInput(val.target.value)}
          />
        </FormControl>
      </Box>
      <RobotTable
        list={filteredList}
        starredList={starredList}
        onChangeStarred={() => {
          fetchStarredList();
        }}
      />
    </Box>
  );
}

export default MainPage;
