import { Component } from '@angular/core';
import {
  AgChartThemeOverrides,
  ColDef,
  CreateRangeChartParams,
  FirstDataRenderedEvent,
  GridReadyEvent,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

@Component({
  selector: 'my-app',
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [popupParent]="popupParent"
    [rowData]="rowData"
    [enableRangeSelection]="true"
    [enableCharts]="true"
    [chartThemeOverrides]="chartThemeOverrides"
    (firstDataRendered)="onFirstDataRendered($event)"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular> `,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: 'country', width: 150, chartDataType: 'category' },
    { field: 'gold', chartDataType: 'series' },
    { field: 'silver', chartDataType: 'series' },
    { field: 'bronze', chartDataType: 'series' },
    {
      headerName: 'A',
      valueGetter: 'Math.floor(Math.random()*1000)',
      chartDataType: 'series',
    },
    {
      headerName: 'B',
      valueGetter: 'Math.floor(Math.random()*1000)',
      chartDataType: 'series',
    },
    {
      headerName: 'C',
      valueGetter: 'Math.floor(Math.random()*1000)',
      chartDataType: 'series',
    },
    {
      headerName: 'D',
      valueGetter: 'Math.floor(Math.random()*1000)',
      chartDataType: 'series',
    },
  ];
  public defaultColDef: ColDef = {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  };
  public popupParent: HTMLElement = document.body;
  public rowData: any[] | null = getData();
  public chartThemeOverrides: AgChartThemeOverrides = {
    bar: {
      series: {
        fillOpacity: 0.8,
        strokeOpacity: 0.8,
        strokeWidth: 2,
        shadow: {
          enabled: true,
          color: 'rgba(0, 0, 0, 0.3)',
          xOffset: 10,
          yOffset: 5,
          blur: 8,
        },
        label: {
          enabled: true,
          fontStyle: 'italic',
          fontWeight: 'bold',
          fontSize: 15,
          fontFamily: 'Arial, sans-serif',
          color: 'green',
          formatter: function (params) {
            return '<' + params.value + '>';
          },
        },
        highlightStyle: {
          item: {
            fill: 'red',
            stroke: 'yellow',
          },
        },
        tooltip: {
          renderer: function (params) {
            return {
              content:
                '<b>' +
                params.xName!.toUpperCase() +
                ':</b> ' +
                params.xValue +
                '<br/>' +
                '<b>' +
                params.yName!.toUpperCase() +
                ':</b> ' +
                params.yValue,
            };
          },
        },
      },
    },
  };

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    var cellRange = {
      rowStartIndex: 0,
      rowEndIndex: 4,
      columns: ['country', 'gold', 'silver', 'bronze'],
    };
    var createRangeChartParams: CreateRangeChartParams = {
      cellRange: cellRange,
      chartType: 'groupedBar',
    };
    params.api.createRangeChart(createRangeChartParams);
  }

  onGridReady(params: GridReadyEvent) {}
}
