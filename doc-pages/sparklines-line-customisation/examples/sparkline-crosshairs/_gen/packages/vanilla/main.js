

const gridOptions = {
  columnDefs: [
    { field: 'symbol', maxWidth: 120 },
    { field: 'name', minWidth: 250 },
    {
      field: 'change',
      cellRenderer: 'agSparklineCellRenderer',
      cellRendererParams: {
        sparklineOptions: {
          line: {
            stroke: 'rgb(52, 168, 83)',
          },
          highlightStyle: {
            size: 4,
            stroke: 'rgb(52, 168, 83)',
            fill: 'rgb(52, 168, 83)',
          },
          tooltip: {
            renderer: renderer,
          },
          crosshairs: {
            xLine: {
              enabled: true,
              lineDash: 'dash',
              stroke: 'rgba(0, 0, 0, 0.5)',
            },
            yLine: {
              enabled: true,
              lineDash: 'dash',
              stroke: 'rgba(0, 0, 0, 0.5)',
            },
          },
        } ,
      },
    },
    {
      field: 'rateOfChange',
      cellRenderer: 'agSparklineCellRenderer',
      cellRendererParams: {
        sparklineOptions: {
          line: {
            stroke: 'rgb(168,52,137)',
          },
          highlightStyle: {
            size: 4,
            stroke: 'rgb(168,52,137)',
            fill: 'rgb(168,52,137)',
          },
          tooltip: {
            renderer: renderer,
          },
          crosshairs: {
            xLine: {
              enabled: false,
            },
          },
        } ,
      },
    },
    {
      field: 'volume',
      type: 'numericColumn',
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
}

function renderer(params) {
  return {
    backgroundColor: 'black',
    opacity: 0.5,
    color: 'white',
  }
}
// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector('#myGrid');
  new agGrid.Grid(gridDiv, gridOptions);
})
