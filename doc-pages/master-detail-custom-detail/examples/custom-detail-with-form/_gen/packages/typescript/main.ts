import { FirstDataRenderedEvent, Grid, GridOptions } from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { DetailCellRenderer } from "./detailCellRenderer";

const gridOptions: GridOptions = {
  columnDefs: [
    // group cell renderer needed for expand / collapse icons
    { field: "name", cellRenderer: "agGroupCellRenderer" },
    { field: "account" },
    { field: "calls" },
    { field: "minutes", valueFormatter: "x.toLocaleString() + 'm'" },
  ],
  defaultColDef: {
    flex: 1,
  },
  masterDetail: true,
  detailCellRenderer: DetailCellRenderer,
  detailRowHeight: 70,
  groupDefaultExpanded: 1,
  onFirstDataRendered: onFirstDataRendered,
};

function onFirstDataRendered(params: FirstDataRenderedEvent) {
  params.api.forEachNode(function (node) {
    node.setExpanded(node.id === "1");
  });
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/master-detail-data.json")
  .then((response) => response.json())
  .then(function (data) {
    gridOptions.api!.setRowData(data);
  });
