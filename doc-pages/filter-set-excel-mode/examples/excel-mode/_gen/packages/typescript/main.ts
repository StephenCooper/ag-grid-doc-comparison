import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  SideBarDef,
} from "ag-grid-community";

const gridOptions: GridOptions = {
  columnDefs: [
    {
      headerName: "Default",
      field: "animal",
      filter: "agSetColumnFilter",
    },
    {
      headerName: "Excel (Windows)",
      field: "animal",
      filter: "agSetColumnFilter",
      filterParams: {
        excelMode: "windows",
      },
    },
    {
      headerName: "Excel (Mac)",
      field: "animal",
      filter: "agSetColumnFilter",
      filterParams: {
        excelMode: "mac",
      },
    },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 200,
    resizable: true,
  },
  sideBar: "filters",
  rowData: getData(),
  localeText: {
    applyFilter: "OK",
    cancelFilter: "Cancel",
    resetFilter: "Clear Filter",
  },
};

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);
