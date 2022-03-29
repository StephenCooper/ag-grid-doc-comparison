import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import {
  ColGroupDef,
  Grid,
  GridOptions,
  ModuleRegistry,
} from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

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
