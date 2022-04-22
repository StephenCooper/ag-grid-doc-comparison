import {
  ColDef,
  GridApi,
  GridReadyEvent,
  IMultiFilter,
  ISetFilter,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
// Required feature modules are registered in app.module.ts

@Component({
  selector: 'my-app',
  template: `<div class="example-wrapper">
    <div style="margin-bottom: 1rem;">
      <button (click)="getTextModel()">Print Text Filter model</button>
      <button (click)="getSetMiniFilter()">Print Set Filter search text</button>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    {
      field: 'athlete',
      filter: 'agMultiColumnFilter',
      filterParams: {
        filters: [
          {
            filter: 'agTextColumnFilter',
            filterParams: {
              buttons: ['apply', 'clear'],
            },
          },
          {
            filter: 'agSetColumnFilter',
          },
        ],
      },
    },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 200,
    resizable: true,
    menuTabs: ['filterMenuTab'],
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  getTextModel() {
    var textFilter = (this.gridApi.getFilterInstance(
      'athlete'
    ) as IMultiFilter).getChildFilterInstance(0)!;
    console.log('Current Text Filter model: ', textFilter.getModel());
  }

  getSetMiniFilter() {
    var setFilter = (this.gridApi.getFilterInstance(
      'athlete'
    ) as IMultiFilter).getChildFilterInstance(1) as ISetFilter;
    console.log('Current Set Filter search text: ', setFilter.getMiniFilter());
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => (this.rowData = data));
  }
}
