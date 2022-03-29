import { Grid, GridOptions } from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

let times = 1;

const gridOptions: GridOptions = {
  columnDefs: [
    { field: "athlete" },
    { field: "sport" },
    { field: "age" },
    { field: "year" },
    { field: "date" },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ],
  defaultColDef: {
    valueFormatter: (p) => {
      console.log("formatter called " + times + " times");
      times++;
      return p.value;
    },
  },
  suppressColumnVirtualisation: true,
  suppressRowVirtualisation: true,
};

// setup the grid after the page has finished loading
const gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data.slice(0, 100)));
