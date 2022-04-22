import {
  AgChartThemeOverrides,
  ColDef,
  CreateRangeChartParams,
  FirstDataRenderedEvent,
  GridReadyEvent,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
// Required feature modules are registered in app.module.ts

@Component({
  selector: 'my-app',
  template: `<div class="wrapper">
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [popupParent]="popupParent"
      [enableRangeSelection]="true"
      [enableCharts]="true"
      [chartThemeOverrides]="chartThemeOverrides"
      [rowData]="rowData"
      (firstDataRendered)="onFirstDataRendered($event)"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
    <div id="myChart" class="ag-theme-alpine my-chart"></div>
  </div> `,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    // different ways to define 'categories'
    { field: 'athlete', width: 150, chartDataType: 'category' },
    { field: 'age', chartDataType: 'category', sort: 'asc' },
    { field: 'sport' },
    // excludes year from charts
    { field: 'year', chartDataType: 'excluded' },
    // different ways to define 'series'
    { field: 'gold', chartDataType: 'series' },
    { field: 'silver', chartDataType: 'series' },
    { field: 'bronze' }, // inferred as series by grid
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
  public chartThemeOverrides: AgChartThemeOverrides = {
    common: {
      title: {
        enabled: true,
        text: 'Medals by Age',
      },
      legend: {
        position: 'bottom',
      },
    },
    column: {
      axes: {
        category: {
          label: {
            rotation: 0,
          },
        },
      },
    },
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    var createRangeChartParams: CreateRangeChartParams = {
      cellRange: {
        rowStartIndex: 0,
        rowEndIndex: 79,
        columns: ['age', 'gold', 'silver', 'bronze'],
      },
      chartType: 'groupedColumn',
      chartContainer: document.querySelector('#myChart') as any,
      aggFunc: 'sum',
    };
    params.api.createRangeChart(createRangeChartParams);
  }

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>(
        'https://www.ag-grid.com/example-assets/wide-spread-of-sports.json'
      )
      .subscribe((data) => {
        this.rowData = data;
      });
  }
}
