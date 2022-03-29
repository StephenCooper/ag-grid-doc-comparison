import { Grid, GridOptions, ICellRendererParams } from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

const gridOptions: GridOptions = {
  columnDefs: [
    { field: "country", rowGroup: true, hide: true },
    { field: "year", rowGroup: true, hide: true },
    {
      field: "athlete",
      minWidth: 250,
      cellRenderer: function (params: ICellRendererParams) {
        return `<span style="margin-left: 60px">${params.value}</span>`;
      },
    },
    { field: "sport", minWidth: 200 },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 100,
    sortable: true,
    resizable: true,
  },
  groupDisplayType: "groupRows",
  animateRows: true,
};

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then(function (data) {
    gridOptions.api!.setRowData(data);
  });
