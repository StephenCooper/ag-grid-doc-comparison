import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
} from "@ag-grid-community/core";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const columnDefs: ColDef[] = [
  { field: "athlete", colId: "athlete" },
  { field: "age", colId: "age" },
  { field: "country", colId: "country" },
  { field: "year", colId: "year" },
  { field: "date", colId: "date" },
  { field: "total", colId: "total" },
  { field: "gold", colId: "gold" },
  { field: "silver", colId: "silver" },
  { field: "bronze", colId: "bronze" },
];

const gridOptions: GridOptions = {
  defaultColDef: {
    initialWidth: 150,
    sortable: true,
    resizable: true,
    filter: true,
  },
  columnDefs: columnDefs,
  maintainColumnOrder: true,
};

function onBtNoGroups() {
  const columnDefs: ColDef[] = [
    { field: "athlete", colId: "athlete" },
    { field: "age", colId: "age" },
    { field: "country", colId: "country" },
    { field: "year", colId: "year" },
    { field: "date", colId: "date" },
    { field: "total", colId: "total" },
    { field: "gold", colId: "gold" },
    { field: "silver", colId: "silver" },
    { field: "bronze", colId: "bronze" },
  ];
  gridOptions.api!.setColumnDefs(columnDefs);
}

function onMedalsInGroupOnly() {
  const columnDefs: (ColDef | ColGroupDef)[] = [
    { field: "athlete", colId: "athlete" },
    { field: "age", colId: "age" },
    { field: "country", colId: "country" },
    { field: "year", colId: "year" },
    { field: "date", colId: "date" },
    {
      headerName: "Medals",
      headerClass: "medals-group",
      children: [
        { field: "total", colId: "total" },
        { field: "gold", colId: "gold" },
        { field: "silver", colId: "silver" },
        { field: "bronze", colId: "bronze" },
      ],
    },
  ];
  gridOptions.api!.setColumnDefs(columnDefs);
}

function onParticipantInGroupOnly() {
  const columnDefs: (ColDef | ColGroupDef)[] = [
    {
      headerName: "Participant",
      headerClass: "participant-group",
      children: [
        { field: "athlete", colId: "athlete" },
        { field: "age", colId: "age" },
        { field: "country", colId: "country" },
        { field: "year", colId: "year" },
        { field: "date", colId: "date" },
      ],
    },
    { field: "total", colId: "total" },
    { field: "gold", colId: "gold" },
    { field: "silver", colId: "silver" },
    { field: "bronze", colId: "bronze" },
  ];
  gridOptions.api!.setColumnDefs(columnDefs);
}

function onParticipantAndMedalsInGroups() {
  const columnDefs: (ColDef | ColGroupDef)[] = [
    {
      headerName: "Participant",
      headerClass: "participant-group",
      children: [
        { field: "athlete", colId: "athlete" },
        { field: "age", colId: "age" },
        { field: "country", colId: "country" },
        { field: "year", colId: "year" },
        { field: "date", colId: "date" },
      ],
    },
    {
      headerName: "Medals",
      headerClass: "medals-group",
      children: [
        { field: "total", colId: "total" },
        { field: "gold", colId: "gold" },
        { field: "silver", colId: "silver" },
        { field: "bronze", colId: "bronze" },
      ],
    },
  ];
  gridOptions.api!.setColumnDefs(columnDefs);
}

// setup the grid after the page has finished loading
const gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));

if (typeof window !== "undefined") {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).onBtNoGroups = onBtNoGroups;
  (<any>window).onMedalsInGroupOnly = onMedalsInGroupOnly;
  (<any>window).onParticipantInGroupOnly = onParticipantInGroupOnly;
  (<any>window).onParticipantAndMedalsInGroups = onParticipantAndMedalsInGroups;
}
