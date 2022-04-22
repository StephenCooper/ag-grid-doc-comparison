import {
  ColDef,
  ColumnApi,
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
  template: `<div class="outer-div">
    <div class="button-bar">
      <button (click)="sizeToFit()">Size to Fit</button>
      <button (click)="autoSizeAll(false)">Auto-Size All</button>
      <button (click)="autoSizeAll(true)">Auto-Size All (Skip Header)</button>
    </div>
    <div class="grid-wrapper">
      <ag-grid-angular
        style="width: 100%; height: 100%;"
        class="ag-theme-alpine"
        [columnDefs]="columnDefs"
        [defaultColDef]="defaultColDef"
        [rowData]="rowData"
        (gridReady)="onGridReady($event)"
      ></ag-grid-angular>
    </div>
  </div> `,
})
export class AppComponent {
  private gridApi!: GridApi;
  private gridColumnApi!: ColumnApi;

  public columnDefs: ColDef[] = [
    { field: 'athlete', width: 150, suppressSizeToFit: true },
    {
      field: 'age',
      headerName: 'Age of Athlete',
      width: 90,
      minWidth: 50,
      maxWidth: 150,
    },
    { field: 'country', width: 120 },
    { field: 'year', width: 90 },
    { field: 'date', width: 110 },
    { field: 'sport', width: 110 },
    { field: 'gold', width: 100 },
    { field: 'silver', width: 100 },
    { field: 'bronze', width: 100 },
    { field: 'total', width: 100 },
  ];
  public defaultColDef: ColDef = {
    resizable: true,
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }

  autoSizeAll(skipHeader: boolean) {
    const allColumnIds: string[] = [];
    this.gridColumnApi.getAllColumns()!.forEach((column) => {
      allColumnIds.push(column.getId());
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => (this.rowData = data));
  }
}
