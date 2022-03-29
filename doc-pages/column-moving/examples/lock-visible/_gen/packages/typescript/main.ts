import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  SideBarDef,
} from "ag-grid-community";

const columnDefs: ColGroupDef[] = [
  {
    headerName: "Athlete",
    children: [
      { field: "athlete", width: 150 },
      { field: "age", lockVisible: true, cellClass: "locked-visible" },
      { field: "country", width: 150 },
      { field: "year" },
      { field: "date" },
      { field: "sport" },
    ],
  },
  {
    headerName: "Medals",
    children: [
      { field: "gold", lockVisible: true, cellClass: "locked-visible" },
      { field: "silver", lockVisible: true, cellClass: "locked-visible" },
      { field: "bronze", lockVisible: true, cellClass: "locked-visible" },
      {
        field: "total",
        lockVisible: true,
        cellClass: "locked-visible",
        hide: true,
      },
    ],
  },
];

const gridOptions: GridOptions = {
  columnDefs: columnDefs,
  sideBar: {
    toolPanels: [
      {
        id: "columns",
        labelDefault: "Columns",
        labelKey: "columns",
        iconKey: "columns",
        toolPanel: "agColumnsToolPanel",
        toolPanelParams: {
          suppressRowGroups: true,
          suppressValues: true,
          suppressPivots: true,
          suppressPivotMode: true,
        },
      },
    ],
  },
  defaultColDef: {
    width: 100,
  },
};

// setup the grid after the page has finished loading
const gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));
