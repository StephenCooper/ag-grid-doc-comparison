const columnDefs = [
  { field: "country", width: 150, chartDataType: "category" },
  { field: "gold", chartDataType: "series" },
  { field: "silver", chartDataType: "series" },
  { field: "bronze", chartDataType: "series" },
  {
    headerName: "A",
    valueGetter: "Math.floor(Math.random()*1000)",
    chartDataType: "series",
  },
  {
    headerName: "B",
    valueGetter: "Math.floor(Math.random()*1000)",
    chartDataType: "series",
  },
  {
    headerName: "C",
    valueGetter: "Math.floor(Math.random()*1000)",
    chartDataType: "series",
  },
  {
    headerName: "D",
    valueGetter: "Math.floor(Math.random()*1000)",
    chartDataType: "series",
  },
];

const gridOptions = {
  defaultColDef: {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  },
  columnDefs: columnDefs,
  rowData: getData(),
  popupParent: document.body,
  enableRangeSelection: true,
  onFirstDataRendered: onFirstDataRendered,
  enableCharts: true,
  getChartToolbarItems: getChartToolbarItems,
  chartThemeOverrides: {
    pie: {
      title: {
        enabled: true,
        text: "Precious Metals Production",
        fontWeight: "bold",
        fontSize: 20,
        color: "rgb(100, 100, 100)",
      },
      subtitle: {
        enabled: true,
        text: "by country",
        fontStyle: "italic",
        fontWeight: "bold",
        fontSize: 14,
        color: "rgb(100, 100, 100)",
      },
      padding: {
        top: 25,
        right: 20,
        bottom: 55,
        left: 20,
      },
      legend: {
        enabled: false,
      },
      series: {
        label: {
          enabled: true,
        },
        callout: {
          length: 20,
        },
      },
    },
  },
};

function getChartToolbarItems() {
  return ["chartDownload", "chartData", "chartSettings"];
}

function onFirstDataRendered(params) {
  var createRangeChartParams = {
    cellRange: {
      rowStartIndex: 0,
      rowEndIndex: 5,
      columns: ["country", "gold"],
    },
    chartType: "pie",
  };

  params.api.createRangeChart(createRangeChartParams);
}

// setup the grid after the page has finished loading
document.addEventListener("DOMContentLoaded", function () {
  var gridDiv = document.querySelector("#myGrid");
  new agGrid.Grid(gridDiv, gridOptions);
});
