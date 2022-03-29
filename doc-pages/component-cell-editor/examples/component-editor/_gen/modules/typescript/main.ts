import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { Grid, GridOptions, ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { DoublingEditor } from "./doublingEditor";
import { MoodEditor } from "./moodEditor";
import { MoodRenderer } from "./moodRenderer";
import { NumericEditor } from "./numericEditor";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const gridOptions: GridOptions = {
  columnDefs: [
    {
      headerName: "Doubling",
      field: "number",
      cellEditor: DoublingEditor,
      editable: true,
      width: 300,
    },
    {
      field: "mood",
      cellRenderer: MoodRenderer,
      cellEditor: MoodEditor,
      cellEditorPopup: true,
      editable: true,
      width: 300,
    },
    {
      headerName: "Numeric",
      field: "number",
      cellEditor: NumericEditor,
      cellEditorPopup: true,
      editable: true,
      width: 280,
    },
  ],
  rowData: [
    { name: "Bob", mood: "Happy", number: 10 },
    { name: "Harry", mood: "Sad", number: 3 },
    { name: "Sally", mood: "Happy", number: 20 },
    { name: "Mary", mood: "Sad", number: 5 },
    { name: "John", mood: "Happy", number: 15 },
    { name: "Jack", mood: "Happy", number: 25 },
    { name: "Sue", mood: "Sad", number: 43 },
    { name: "Sean", mood: "Sad", number: 1335 },
    { name: "Niall", mood: "Happy", number: 2 },
    { name: "Alberto", mood: "Happy", number: 123 },
    { name: "Fred", mood: "Sad", number: 532 },
    { name: "Jenny", mood: "Happy", number: 34 },
    { name: "Larry", mood: "Happy", number: 13 },
  ],
  defaultColDef: {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  },
};

// setup the grid after the page has finished loading
const gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);
