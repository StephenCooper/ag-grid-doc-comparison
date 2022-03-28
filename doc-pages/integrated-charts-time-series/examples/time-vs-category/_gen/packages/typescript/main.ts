import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgChartThemeOverrides, ChartMenuOptions, ColDef, ColGroupDef, CreateRangeChartParams, FirstDataRenderedEvent, GetChartToolbarItems, Grid, GridOptions, ValueFormatterParams } from 'ag-grid-community';
declare var moment: any;

function getColumnDefs() {
  return [
    { field: 'date', valueFormatter: dateFormatter },
    { field: 'avgTemp' },
  ]
}

const gridOptions: GridOptions = {
  columnDefs: getColumnDefs(),
  defaultColDef: {
    flex: 1,
    resizable: true,
  },
  popupParent: document.body,
  rowData: getRowData(),
  enableRangeSelection: true,
  enableCharts: true,
  chartThemeOverrides: {
    line: {
      title: {
        enabled: true,
        text: 'Average Daily Temperatures',
      },
      legend: {
        enabled: false,
      },
      padding: {
        top: 15,
        bottom: 25,
      },
      navigator: {
        enabled: true,
        height: 20,
        margin: 25,
      },
      axes: {
        time: {
          label: {
            rotation: 0,
            format: '%d %b',
          },
        },
        category: {
          label: {
            rotation: 0,
            formatter: function (params) {
              return moment(new Date(params.value)).format('DD MMM')
            },
          },
        },
        number: {
          label: {
            formatter: function (params) {
              return params.value + '°C'
            },
          },
        },
      },
    },
  },
  getChartToolbarItems: getChartToolbarItems,
  onFirstDataRendered: onFirstDataRendered,
}

var currentChartRef: any;

function onFirstDataRendered(params: FirstDataRenderedEvent) {
  if (currentChartRef) {
    currentChartRef.destroyChart()
  }

  var createRangeChartParams: CreateRangeChartParams = {
    chartContainer: document.querySelector('#myChart') as any,
    suppressChartRanges: true,
    cellRange: {
      columns: ['date', 'avgTemp'],
    },
    chartType: 'line',
  }
  currentChartRef = params.api.createRangeChart(createRangeChartParams)
}

function dateFormatter(params: ValueFormatterParams) {
  return params.value
    ? params.value.toISOString().substring(0, 10)
    : params.value
}

function getChartToolbarItems(): ChartMenuOptions[] {
  return ['chartData', 'chartFormat']
}

function toggleAxis() {
  var axisBtn = document.querySelector('#axisBtn') as any;
  axisBtn.textContent = axisBtn.value
  axisBtn.value = axisBtn.value === 'time' ? 'category' : 'time'

  const columnDefs: ColDef[] = getColumnDefs()
  columnDefs.forEach(function (colDef) {
    if (colDef.field === 'date') {
      colDef.chartDataType = axisBtn.value
    }
  })

  gridOptions.api!.setColumnDefs(columnDefs)
}


function getRowData() {
  return [
    { date: new Date(2019, 0, 1), avgTemp: 8.27 },
    { date: new Date(2019, 0, 5), avgTemp: 7.22 },
    { date: new Date(2019, 0, 8), avgTemp: 11.54 },
    { date: new Date(2019, 0, 11), avgTemp: 8.44 },
    { date: new Date(2019, 0, 22), avgTemp: 12.03 },
    { date: new Date(2019, 0, 23), avgTemp: 9.68 },
    { date: new Date(2019, 0, 24), avgTemp: 9.9 },
    { date: new Date(2019, 0, 25), avgTemp: 8.74 },
  ]
}

// setup the grid after the page has finished loading
  var gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions)
 

if (typeof window !== 'undefined') {
// Attach external event handlers to window so they can be called from index.html
 (<any>window).toggleAxis = toggleAxis;
}