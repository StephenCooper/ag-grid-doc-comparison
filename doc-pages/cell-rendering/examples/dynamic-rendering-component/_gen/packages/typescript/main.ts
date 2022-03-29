import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  ICellRendererParams,
} from "ag-grid-community";
import { MoodRenderer } from "./moodRenderer";
import { GenderRenderer } from "./genderRenderer";

const rowData = [
  { value: 14, type: "age" },
  { value: "female", type: "gender" },
  { value: "Happy", type: "mood" },
  { value: 21, type: "age" },
  { value: "male", type: "gender" },
  { value: "Sad", type: "mood" },
];

const gridOptions: GridOptions = {
  columnDefs: [
    { field: "value" },
    {
      headerName: "Rendered Value",
      field: "value",
      cellRendererSelector: function (params: ICellRendererParams) {
        const moodDetails = {
          component: MoodRenderer,
        };

        const genderDetails = {
          component: GenderRenderer,
          params: { values: ["Male", "Female"] },
        };

        if (params.data.type === "gender") return genderDetails;
        else if (params.data.type === "mood") return moodDetails;
        else return undefined;
      },
    },
    { field: "type" },
  ],
  defaultColDef: {
    flex: 1,
  },
  rowData: rowData,
  onRowEditingStarted: function (event) {
    console.log("never called - not doing row editing");
  },
  onRowEditingStopped: function (event) {
    console.log("never called - not doing row editing");
  },
  onCellEditingStarted: function (event) {
    console.log("cellEditingStarted");
  },
  onCellEditingStopped: function (event) {
    console.log("cellEditingStopped");
  },
};

// setup the grid after the page has finished loading
const gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);
