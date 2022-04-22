const gridOptions = {
  columnDefs: [
    { field: 'salesRep', chartDataType: 'category' },
    { field: 'handset', chartDataType: 'category' },
    {
      headerName: 'Sale Price',
      field: 'sale',
      maxWidth: 160,
      aggFunc: 'sum',
      filter: 'agNumberColumnFilter',
      chartDataType: 'series',
    },
    { field: 'saleDate', chartDataType: 'category' },
    {
      field: 'quarter',
      maxWidth: 160,
      filter: 'agSetColumnFilter',
      chartDataType: 'category',
    },
  ],
  defaultColDef: {
    flex: 1,
    editable: true,
    sortable: true,
    filter: 'agMultiColumnFilter',
    floatingFilter: true,
    resizable: true,
  },
  rowData: getData(),
  enableCharts: true,
  chartThemes: ['ag-default-dark'],
  chartThemeOverrides: {
    common: {
      padding: {
        top: 20,
        right: 40,
        bottom: 20,
        left: 30,
      },
    },
    cartesian: {
      axes: {
        category: {
          label: {
            rotation: 0,
          },
        },
      },
    },
  },
  onFirstDataRendered: onFirstDataRendered,
};

function onFirstDataRendered(params) {
  createQuarterlySalesChart(params.api);
  createSalesByRefChart(params.api);
  createHandsetSalesChart(params.api);
}

function createQuarterlySalesChart(gridApi) {
  gridApi.createCrossFilterChart({
    chartType: 'column',
    cellRange: {
      columns: ['quarter', 'sale'],
    },
    aggFunc: 'sum',
    chartThemeOverrides: {
      common: {
        title: {
          enabled: true,
          text: 'Quarterly Sales ($)',
        },
        legend: {
          enabled: false,
        },
        axes: {
          category: {
            label: {
              rotation: 0,
            },
          },
          number: {
            label: {
              formatter: (params) => {
                return params.value / 1000 + 'k';
              },
            },
          },
        },
      },
    },
    chartContainer: document.querySelector('#columnChart'),
  });
}

function createSalesByRefChart(gridApi) {
  gridApi.createCrossFilterChart({
    chartType: 'pie',
    cellRange: {
      columns: ['salesRep', 'sale'],
    },
    aggFunc: 'sum',
    chartThemeOverrides: {
      common: {
        title: {
          enabled: true,
          text: 'Sales by Representative ($)',
        },
      },
      pie: {
        series: {
          title: {
            enabled: false,
          },
          label: {
            enabled: false,
          },
        },
      },
    },
    chartContainer: document.querySelector('#pieChart'),
  });
}

function createHandsetSalesChart(gridApi) {
  gridApi.createCrossFilterChart({
    chartType: 'bar',
    cellRange: {
      columns: ['handset', 'sale'],
    },
    aggFunc: 'count',
    chartThemeOverrides: {
      common: {
        title: {
          enabled: true,
          text: 'Handsets Sold (Units)',
        },
        legend: {
          enabled: false,
        },
      },
    },
    chartContainer: document.querySelector('#barChart'),
  });
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector('#myGrid');
  new agGrid.Grid(gridDiv, gridOptions);
});
