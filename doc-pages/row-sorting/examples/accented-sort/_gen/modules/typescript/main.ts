import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import {
  ColDef,
  Grid,
  GridOptions,
  ModuleRegistry,
} from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const columnDefs: ColDef[] = [{ field: "accented", width: 150 }];

const gridOptions: GridOptions = {
  defaultColDef: {
    sortable: true,
  },
  columnDefs: columnDefs,
  animateRows: true,
  sortingOrder: ["desc", "asc", null],
  accentedSort: true,
  rowData: [{ accented: "aáàä" }, { accented: "aàáä" }, { accented: "aäàá" }],
};

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);
