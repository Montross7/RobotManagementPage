import { Box, IconButton, Link, Pagination, Typography } from "@mui/material";
import React from "react";
// import logo from "./logo.svg";
// import "./Main.css";
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
      variant="outlined"
      shape="rounded"
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
      width: 150,
      renderHeader: (params: GridColumnHeaderParams) => (
        <IconButton
          size="small"
          style={{ marginLeft: 16 }}
          // tabIndex={params.hasFocus ? 0 : -1}
          onClick={() => updateStarredList([])}
        >
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
            <Link href="#">Add</Link>
          )}
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
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
