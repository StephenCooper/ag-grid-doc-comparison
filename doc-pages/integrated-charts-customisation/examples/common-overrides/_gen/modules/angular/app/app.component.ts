import {
  AgChartThemeOverrides,
  ColDef,
  CreateRangeChartParams,
  FirstDataRenderedEvent,
  GridReadyEvent,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { Component } from '@angular/core';
// Required feature modules are registered in app.module.ts

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
    common: {
      padding: {
        top: 20,
        right: 30,
        bottom: 10,
        left: 2,
      },
      background: {
        fill: '#e5e5e5',
      },
      title: {
        enabled: true,
        text: 'Precious Metals Production',
        fontStyle: 'italic',
        fontWeight: '600',
        fontSize: 18,
        fontFamily: 'Impact, sans-serif',
        color: '#414182',
      },
      subtitle: {
        enabled: true,
        text: 'by country',
        fontSize: 14,
        fontFamily: 'Monaco, monospace',
        color: 'rgb(100, 100, 100)',
      },
      legend: {
        enabled: true,
        position: 'left',
        spacing: 20,
        item: {
          label: {
            fontStyle: 'italic',
            fontWeight: 'bold',
            fontSize: 18,
            fontFamily: 'Palatino, serif',
            color: '#555',
          },
          marker: {
            shape: 'diamond',
            size: 10,
            padding: 10,
            strokeWidth: 2,
          },
          paddingX: 120,
          paddingY: 20,
        },
      },
      tooltip: {
        class: 'my-tooltip-class',
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
