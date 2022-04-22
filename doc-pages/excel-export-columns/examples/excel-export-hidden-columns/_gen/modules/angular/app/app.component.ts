import {
  ColDef,
  ColGroupDef,
  GridApi,
  GridReadyEvent,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
// Required feature modules are registered in app.module.ts

@Component({
  selector: 'my-app',
  template: `<div class="container">
    <div class="columns">
      <label class="option" for="allColumns"
        ><input id="allColumns" type="checkbox" />All Columns</label
      >
      <div>
        <button (click)="onBtExport()" style="font-weight: bold;">
          Export to Excel
        </button>
      </div>
    </div>
    <div class="grid-wrapper">
      <ag-grid-angular
        style="width: 100%; height: 100%;"
        class="ag-theme-alpine"
        [columnDefs]="columnDefs"
        [defaultColDef]="defaultColDef"
        [popupParent]="popupParent"
        [rowData]="rowData"
        (gridReady)="onGridReady($event)"
      ></ag-grid-angular>
    </div>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: (ColDef | ColGroupDef)[] = [
    {
      headerName: 'Top Level Column Group',
      children: [
        {
          headerName: 'Group A',
          children: [
            { field: 'athlete', minWidth: 200 },
            { field: 'country', minWidth: 200 },
            { headerName: 'Group', valueGetter: 'data.country.charAt(0)' },
          ],
        },
        {
          headerName: 'Group B',
          children: [
            { field: 'sport', minWidth: 150 },
            { field: 'gold', hide: true },
            { field: 'silver', hide: true },
            { field: 'bronze', hide: true },
            { field: 'total', hide: true },
          ],
        },
      ],
    },
  ];
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 100,
    flex: 1,
  };
  public popupParent: HTMLElement = document.body;
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onBtExport() {
    this.gridApi.exportDataAsExcel(getParams());
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>(
        'https://www.ag-grid.com/example-assets/small-olympic-winners.json'
      )
      .subscribe((data) =>
        params.api!.setRowData(data.filter((rec: any) => rec.country != null))
      );
  }
}

function getBoolean(id: string) {
  return !!(document.querySelector('#' + id) as HTMLInputElement).checked;
}
function getParams() {
  return {
    allColumns: getBoolean('allColumns'),
  };
}
