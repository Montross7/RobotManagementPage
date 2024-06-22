import { Box, IconButton, Link, Pagination, Typography } from "@mui/material";
import React from "react";
// import logo from "./logo.svg";
// import "./Main.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CircleIcon from "@mui/icons-material/Circle";
import RefreshIcon from "@mui/icons-material/Refresh";
import PaginationItem from "@mui/material/PaginationItem";
import {
  DataGrid,
  GridColDef,
  GridColumnHeaderParams,
  GridRenderCellParams,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import StarButton from "./StarButton";

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      shape="circular"
      page={page + 1}
      count={pageCount}
      // @ts-expect-error
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event: React.ChangeEvent<unknown>, value: number) =>
        apiRef.current.setPage(value - 1)
      }
    />
  );
}

function RobotTable(props: any) {
  const { list, starredList, onChangeStarred } = props;

  const updateStarredList = (newList: string[]) => {
    fetch("/starred_location_ids", {
      method: "put",
      body: JSON.stringify(newList),
    })
      .then(() => onChangeStarred())
      .catch(() => {
        alert("Could not star an item due to unexpected error");
      });
  };

  const columns: GridColDef[] = [
    {
      field: "isStarred",
      width: 60,
      renderHeader: (params: GridColumnHeaderParams) => (
        <IconButton onClick={() => updateStarredList([])}>
          <RefreshIcon />
        </IconButton>
      ),
      renderCell: (params: GridRenderCellParams<any>) => (
        <StarButton
          id={params.row.id}
          isActive={params.value}
          onClick={(id: string, shouldRemove: boolean) => {
            if (shouldRemove) {
              updateStarredList(
                starredList.filter((item: string) => item !== id)
              );
            } else {
              updateStarredList([...starredList, id]);
            }
          }}
        />
      ),
    },
    {
      field: "name",
      headerName: "Location",
      width: 400,
      renderCell: (params: GridRenderCellParams<any>) => (
        <Box
          width={"100%"}
          height={"calc(100% - 16px)"}
          color={"white"}
          bgcolor={params.row.robot?.is_online ? "#0091FF" : "#E4E4E4"}
          position={"relative"}
          display={"flex"}
          margin={"8px"}
          borderRadius={"7px"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Typography>{params.row.name}</Typography>
          <ChevronRightIcon sx={{ position: "absolute", right: "8px" }} />
        </Box>
      ),
    },
    {
      field: "robot",
      headerName: "Robots",
      width: 240,
      valueGetter: (value, row) => {
        return `${row?.robot?.id}`;
      },
      renderCell: (params: GridRenderCellParams<any>) => (
        <Box
          justifyContent={"start"}
          height={"100%"}
          display={"flex"}
          alignItems={"center"}
          width={"100%"}
          flexDirection={"row"}
        >
          <CircleIcon
            sx={{
              color: params.row?.robot?.id ? "#00D15E" : "#E4E4E4",
              marginRight: "16px",
            }}
          />
          {params.row?.robot?.id ? (
            <Typography variant="body1" fontWeight={"bold"}>
              {params.value}
            </Typography>
          ) : (
            <Link variant="body1" href="#">
              Add
            </Link>
          )}
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ height: 450, width: "100%" }}>
      <DataGrid
        sx={{
          ".MuiDataGrid-footerContainer": {
            justifyContent: "center",
          },
        }}
        rows={list}
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
        disableColumnSelector
        disableColumnSorting
        disableColumnMenu
        disableColumnFilter
        slots={{
          pagination: CustomPagination,
        }}
      />
    </Box>
  );
}

export default RobotTable;
