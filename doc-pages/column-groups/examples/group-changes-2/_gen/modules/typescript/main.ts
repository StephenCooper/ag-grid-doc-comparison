import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { Grid, GridOptions, ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

function createNormalColDefs() {
  return [
    {
      headerName: "Athlete Details",
      headerClass: "participant-group",
      children: [
        { field: "athlete", colId: "athlete" },
        { field: "country", colId: "country" },
      ],
    },
    { field: "age", colId: "age" },
    {
      headerName: "Sports Results",
      headerClass: "medals-group",
      children: [
        { field: "sport", colId: "sport" },
        { field: "gold", colId: "gold" },
      ],
    },
  ];
}

function createExtraColDefs() {
  return [
    {
      headerName: "Athlete Details",
      headerClass: "participant-group",
      children: [
        { field: "athlete", colId: "athlete" },
        { field: "country", colId: "country" },
        { field: "region1", colId: "region1" },
        { field: "region2", colId: "region2" },
      ],
    },
    { field: "age", colId: "age" },
    { field: "distance", colId: "distance" },
    {
      headerName: "Sports Results",
      headerClass: "medals-group",
      children: [
        { field: "sport", colId: "sport" },
        { field: "gold", colId: "gold" },
      ],
    },
  ];
}

function onBtNormalCols() {
  gridOptions.api!.setColumnDefs(createNormalColDefs());
}

function onBtExtraCols() {
  gridOptions.api!.setColumnDefs(createExtraColDefs());
}

const gridOptions: GridOptions = {
  defaultColDef: {
    resizable: true,
    width: 150,
  },
  // debug: true,
  columnDefs: createNormalColDefs(),
  rowData: null,
};

// setup the grid after the page has finished loading
const gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));

if (typeof window !== "undefined") {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).onBtNormalCols = onBtNormalCols;
  (<any>window).onBtExtraCols = onBtExtraCols;
}
