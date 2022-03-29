const gridOptions = {
  columnDefs: [
    { field: "symbol", maxWidth: 120 },
    { field: "name", minWidth: 250 },
    {
      field: "change",
      cellRenderer: "agSparklineCellRenderer",
      cellRendererParams: {
        sparklineOptions: {
          tooltip: {
            renderer: tooltipRenderer,
          },
          line: {
            stroke: "rgb(103,103,255)",
            strokeWidth: 1,
          },
          highlightStyle: {
            fill: "white",
            strokeWidth: 0,
          },
        },
      },
    },
    {
      field: "volume",
      type: "numericColumn",
      maxWidth: 140,
    },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 100,
    resizable: true,
  },
  rowData: getData(),
  rowHeight: 50,
};

function tooltipRenderer(params) {
  return {
    title: params.context.data.symbol,
    // sets styles for tooltip
    color: "white",
    backgroundColor: "rgb(78,78,255)",
    opacity: 0.7,
  };
}

// setup the grid after the page has finished loading
document.addEventListener("DOMContentLoaded", function () {
  var gridDiv = document.querySelector("#myGrid");
  new agGrid.Grid(gridDiv, gridOptions);
});
