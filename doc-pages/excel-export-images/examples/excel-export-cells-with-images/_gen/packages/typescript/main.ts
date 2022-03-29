import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  ExcelExportParams,
  Grid,
  GridOptions,
} from "ag-grid-community";
import { CountryCellRenderer } from "./countryCellRenderer";

declare function createBase64FlagsFromResponse(
  response: any,
  countryCodes: any,
  base64flags: any
): any;

const countryCodes: any = {};
const base64flags: any = {};

const columnDefs: ColDef[] = [
  {
    field: "country",
    headerName: " ",
    minWidth: 70,
    width: 70,
    maxWidth: 70,
    cellRenderer: CountryCellRenderer,
    cellRendererParams: {
      base64flags: base64flags,
      countryCodes: countryCodes,
    },
  },
  { field: "athlete" },
  { field: "age" },
  { field: "year" },
  { field: "date" },
  { field: "sport" },
  { field: "gold" },
  { field: "silver" },
  { field: "bronze" },
  { field: "total" },
];

const gridOptions: GridOptions = {
  columnDefs: columnDefs,
  defaultColDef: {
    width: 150,
    resizable: true,
  },
  defaultExcelExportParams: {
    addImageToCell: function (rowIndex, col, value) {
      if (col.getColId() !== "country") {
        return;
      }

      const countryCode = countryCodes[value];
      return {
        image: {
          id: countryCode,
          base64: base64flags[countryCode],
          imageType: "png",
          width: 20,
          height: 11,
          position: {
            offsetX: 30,
            offsetY: 5.5,
          },
        },
      };
    },
  },
  context: {
    base64flags: base64flags,
    countryCodes: countryCodes,
  },
  onGridReady: (params) => {
    fetch("https://www.ag-grid.com/example-assets/small-olympic-winners.json")
      .then((data) =>
        createBase64FlagsFromResponse(data, countryCodes, base64flags)
      )
      .then((data) => params.api.setRowData(data));
  },
};

function onBtExport() {
  gridOptions.api!.exportDataAsExcel();
}

// setup the grid after the page has finished loading
const gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

if (typeof window !== "undefined") {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).onBtExport = onBtExport;
}
