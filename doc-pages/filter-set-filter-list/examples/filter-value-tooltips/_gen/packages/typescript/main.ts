import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  SideBarDef,
} from "ag-grid-community";

declare var CustomTooltip: any;

const gridOptions: GridOptions = {
  columnDefs: [
    {
      field: "colA",
      tooltipField: "colA",
      filter: "agSetColumnFilter",
    },
    {
      field: "colB",
      tooltipField: "colB",
      filter: "agSetColumnFilter",
      filterParams: {
        showTooltips: true,
      },
    },
    {
      field: "colC",
      tooltipField: "colC",
      tooltipComponent: CustomTooltip,
      filter: "agSetColumnFilter",
      filterParams: {
        showTooltips: true,
      },
    },
  ],
  sideBar: "filters",
  defaultColDef: {
    flex: 1,
    resizable: true,
  },
  tooltipShowDelay: 100,
  rowData: getData(),
};

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);
