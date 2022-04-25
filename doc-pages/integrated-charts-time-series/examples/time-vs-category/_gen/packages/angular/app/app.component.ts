import { Component } from '@angular/core';
import {
  AgChartThemeOverrides,
  ChartMenuOptions,
  ColDef,
  CreateRangeChartParams,
  FirstDataRenderedEvent,
  GridApi,
  GridReadyEvent,
  ValueFormatterParams,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
declare var moment: any;

@Component({
  selector: 'my-app',
  template: `<label>Switch Axis to: </label>
    <button id="axisBtn" (click)="toggleAxis()" value="time">Category</button>
    <div class="wrapper">
      <ag-grid-angular
        style="width: 100%; height: 100%;"
        class="ag-theme-alpine"
        [columnDefs]="columnDefs"
        [defaultColDef]="defaultColDef"
        [popupParent]="popupParent"
        [rowData]="rowData"
        [enableRangeSelection]="true"
        [enableCharts]="true"
        [chartThemeOverrides]="chartThemeOverrides"
        [getChartToolbarItems]="getChartToolbarItems"
        (firstDataRendered)="onFirstDataRendered($event)"
        (gridReady)="onGridReady($event)"
      ></ag-grid-angular>
      <div id="myChart" class="ag-theme-alpine my-chart"></div>
    </div> `,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = getColumnDefs();
  public defaultColDef: ColDef = {
    flex: 1,
    resizable: true,
  };
  public popupParent: HTMLElement = document.body;
  public rowData: any[] | null = getRowData();
  public chartThemeOverrides: AgChartThemeOverrides = {
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
            formatter: (params) => {
              return moment(new Date(params.value)).format('DD MMM');
            },
          },
        },
        number: {
          label: {
            formatter: (params) => {
              return params.value + '°C';
            },
          },
        },
      },
    },
  };

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    if (currentChartRef) {
      currentChartRef.destroyChart();
    }
    var createRangeChartParams: CreateRangeChartParams = {
      chartContainer: document.querySelector('#myChart') as any,
      suppressChartRanges: true,
      cellRange: {
        columns: ['date', 'avgTemp'],
      },
      chartType: 'line',
    };
    currentChartRef = params.api.createRangeChart(createRangeChartParams);
  }

  toggleAxis() {
    var axisBtn = document.querySelector('#axisBtn') as any;
    axisBtn.textContent = axisBtn.value;
    axisBtn.value = axisBtn.value === 'time' ? 'category' : 'time';
    const columnDefs: ColDef[] = getColumnDefs();
    columnDefs.forEach(function (colDef) {
      if (colDef.field === 'date') {
        colDef.chartDataType = axisBtn.value;
      }
    });
    this.gridApi.setColumnDefs(columnDefs);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  getChartToolbarItems(): ChartMenuOptions[] {
    return ['chartData', 'chartFormat'];
  }
}

function getColumnDefs() {
  return [
    { field: 'date', valueFormatter: dateFormatter },
    { field: 'avgTemp' },
  ];
}
var currentChartRef: any;
function dateFormatter(params: ValueFormatterParams) {
  return params.value
    ? params.value.toISOString().substring(0, 10)
    : params.value;
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
  ];
}
