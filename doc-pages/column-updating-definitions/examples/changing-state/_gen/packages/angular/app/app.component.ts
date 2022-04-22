import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

@Component({
  selector: 'my-app',
  template: `<div class="test-container">
    <div class="test-header">
      <button (click)="onBtWithState()">Set Columns with State</button>
      <button (click)="onBtRemove()">Remove Columns</button>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [defaultColDef]="defaultColDef"
      [columnDefs]="columnDefs"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div> `,
})
export class AppComponent {
  private gridApi!: GridApi;

  public defaultColDef: ColDef = {
    initialWidth: 100,
    width: 100,
    sortable: true,
    resizable: true,
    pinned: null,
    sort: null, // important - clears sort if not specified in col def
  };
  public columnDefs: ColDef[] = getColumnDefs();
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onBtWithState() {
    this.gridApi.setColumnDefs(getColumnDefs());
  }

  onBtRemove() {
    this.gridApi.setColumnDefs([]);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => (this.rowData = data));
  }
}

function getColumnDefs(): ColDef[] {
  return [
    { field: 'athlete', width: 150, sort: 'asc' },
    { field: 'age' },
    { field: 'country', pinned: 'left' },
    { field: 'sport' },
    { field: 'year' },
    { field: 'date' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ];
}
