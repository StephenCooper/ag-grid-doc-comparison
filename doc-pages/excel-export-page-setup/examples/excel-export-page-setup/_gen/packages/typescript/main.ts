import { Grid, GridOptions } from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

const gridOptions: GridOptions = {
  columnDefs: [
    { field: "athlete", minWidth: 200 },
    { field: "country", minWidth: 200 },
    { field: "sport", minWidth: 150 },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ],

  defaultColDef: {
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 100,
    flex: 1,
  },

  popupParent: document.body,
};

function getNumber(id: string) {
  var el = document.querySelector(id) as any;

  if (!el || isNaN(el.value)) {
    return 0;
  }

  return parseFloat(el.value);
}

function getValue(id: string) {
  return (document.querySelector(id) as any).value;
}

function getSheetConfig() {
  return {
    pageSetup: {
      orientation: getValue("#pageOrientation"),
      pageSize: getValue("#pageSize"),
    },
    margins: {
      top: getNumber("#top"),
      right: getNumber("#right"),
      bottom: getNumber("#bottom"),
      left: getNumber("#left"),
      header: getNumber("#header"),
      footer: getNumber("#footer"),
    },
  };
}

function onBtExport() {
  const { pageSetup, margins } = getSheetConfig();
  gridOptions.api!.exportDataAsExcel({ pageSetup, margins });
}

// setup the grid after the page has finished loading
const gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);
fetch("https://www.ag-grid.com/example-assets/small-olympic-winners.json")
  .then((response) => response.json())
  .then((data) =>
    gridOptions.api!.setRowData(data.filter((rec: any) => rec.country != null))
  );

if (typeof window !== "undefined") {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).onBtExport = onBtExport;
}
