let times = 1;

const gridOptions = {
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
document.addEventListener("DOMContentLoaded", () => {
  const gridDiv = document.querySelector("#myGrid");
  new agGrid.Grid(gridDiv, gridOptions);

  fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
    .then((response) => response.json())
    .then((data) => gridOptions.api.setRowData(data.slice(0, 100)));
});
