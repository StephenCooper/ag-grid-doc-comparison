import { Grid, ColDef, GridOptions } from "@ag-grid-community/core";
import { CustomPinnedRowRenderer } from "./customPinnedRowRenderer_typescript";

const columnDefs: ColDef[] = [
  {
    field: "athlete",
    cellRendererSelector: function (params) {
      if (params.node.rowPinned) {
        return {
          component: CustomPinnedRowRenderer,
          params: {
            style: { color: "blue" },
          },
        };
      } else {
        // rows that are not pinned don't use any cell renderer
        return undefined;
      }
    },
  },
  {
    field: "age",
    cellRendererSelector: function (params) {
      if (params.node.rowPinned) {
        return {
          component: CustomPinnedRowRenderer,
          params: {
            style: { "font-style": "italic" },
          },
        };
      } else {
        // rows that are not pinned don't use any cell renderer
        return undefined;
      }
    },
  },
  { field: "country" },
  { field: "year" },
  { field: "date" },
  { field: "sport" },
];

const gridOptions: GridOptions = {
  defaultColDef: {
    width: 200,
    sortable: true,
    filter: true,
    resizable: true,
  },
  columnDefs: columnDefs,
  rowData: null,
  getRowStyle: function (params) {
    if (params.node.rowPinned) {
      return { "font-weight": "bold" };
    }
  },
  // no rows to pin to start with
  pinnedTopRowData: createData(1, "Top"),
  pinnedBottomRowData: createData(1, "Bottom"),
};

function onPinnedRowTopCount() {
  var headerRowsToFloat = (document.getElementById("top-row-count") as any)
    .value;
  var count = Number(headerRowsToFloat);
  var rows = createData(count, "Top");
  gridOptions.api!.setPinnedTopRowData(rows);
}

function onPinnedRowBottomCount() {
  var footerRowsToFloat = (document.getElementById("bottom-row-count") as any)
    .value;
  var count = Number(footerRowsToFloat);
  var rows = createData(count, "Bottom");
  gridOptions.api!.setPinnedBottomRowData(rows);
}

function createData(count: number, prefix: string) {
  var result = [];
  for (var i = 0; i < count; i++) {
    result.push({
      athlete: prefix + " Athlete " + i,
      age: prefix + " Age " + i,
      country: prefix + " Country " + i,
      year: prefix + " Year " + i,
      date: prefix + " Date " + i,
      sport: prefix + " Sport " + i,
    });
  }
  return result;
}

// setup the grid after the page has finished loading
document.addEventListener("DOMContentLoaded", function () {
  var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
  new Grid(gridDiv, gridOptions);

  fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
    .then((response) => response.json())
    .then((data) => gridOptions.api!.setRowData(data));
});
