import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import {
  ColDef,
  Grid,
  GridOptions,
  ModuleRegistry,
  RowSpanParams,
} from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

function rowSpan(params: RowSpanParams) {
  var athlete = params.data.athlete;
  if (athlete === "Aleksey Nemov") {
    // have all Russia age columns width 2
    return 2;
  } else if (athlete === "Ryan Lochte") {
    // have all United States column width 4
    return 4;
  } else {
    // all other rows should be just normal
    return 1;
  }
}

const columnDefs: ColDef[] = [
  {
    field: "athlete",
    rowSpan: rowSpan,
    cellClassRules: {
      "cell-span": "value==='Aleksey Nemov' || value==='Ryan Lochte'",
    },
    width: 200,
  },
  { field: "age", width: 100 },
  { field: "country" },
  { field: "year", width: 100 },
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
    width: 170,
    resizable: true,
  },
  suppressRowTransform: true,
};

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));
