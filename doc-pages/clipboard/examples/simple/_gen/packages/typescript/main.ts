import {
  CellValueChangedEvent,
  Grid,
  GridOptions,
  PasteEndEvent,
  PasteStartEvent,
} from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

const gridOptions: GridOptions = {
  columnDefs: [
    { field: "athlete", minWidth: 200 },
    { field: "age" },
    { field: "country", minWidth: 150 },
    { field: "year" },
    { field: "date", minWidth: 150 },
    { field: "sport", minWidth: 150 },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ],

  defaultColDef: {
    editable: true,
    flex: 1,
    minWidth: 100,
    resizable: true,
  },

  enableRangeSelection: true,
  rowSelection: "multiple",

  onCellValueChanged: onCellValueChanged,
  onPasteStart: onPasteStart,
  onPasteEnd: onPasteEnd,
};

function onCellValueChanged(params: CellValueChangedEvent) {
  console.log("Callback onCellValueChanged:", params);
}

function onPasteStart(params: PasteStartEvent) {
  console.log("Callback onPasteStart:", params);
}

function onPasteEnd(params: PasteEndEvent) {
  console.log("Callback onPasteEnd:", params);
}

function onBtCopyRows() {
  gridOptions.api!.copySelectedRowsToClipboard();
}

function onBtCopyRange() {
  gridOptions.api!.copySelectedRangeToClipboard();
}

function onPasteOff() {
  gridOptions.api!.setSuppressClipboardPaste(true);
}

function onPasteOn() {
  gridOptions.api!.setSuppressClipboardPaste(false);
}

// setup the grid after the page has finished loading
const gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));

if (typeof window !== "undefined") {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).onBtCopyRows = onBtCopyRows;
  (<any>window).onBtCopyRange = onBtCopyRange;
  (<any>window).onPasteOff = onPasteOff;
  (<any>window).onPasteOn = onPasteOn;
}
