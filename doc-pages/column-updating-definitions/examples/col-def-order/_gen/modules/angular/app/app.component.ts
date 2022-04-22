import { ColDef, GridApi, GridReadyEvent } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
// Required feature modules are registered in app.module.ts

@Component({
  selector: 'my-app',
  template: `<div class="test-container">
    <div class="test-header">
      <button (click)="setColsA()">Column Set A</button>
      <button (click)="setColsB()">Column Set B</button>
      <button (click)="clearColDefs()">Clear</button>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [defaultColDef]="defaultColDef"
      [maintainColumnOrder]="true"
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
    sortable: true,
    resizable: true,
    filter: true,
  };
  public columnDefs: ColDef[] = getColumnDefsA();
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  setColsA() {
    this.gridApi.setColumnDefs(getColumnDefsA());
  }

  setColsB() {
    this.gridApi.setColumnDefs(getColumnDefsB());
  }

  clearColDefs() {
    this.gridApi.setColumnDefs([]);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => (this.rowData = data));
  }
}

function getColumnDefsA() {
  return [
    { field: 'athlete', headerName: 'A Athlete' },
    { field: 'age', headerName: 'A Age' },
    { field: 'country', headerName: 'A Country' },
    { field: 'sport', headerName: 'A Sport' },
    { field: 'year', headerName: 'A Year' },
    { field: 'date', headerName: 'A Date' },
    { field: 'gold', headerName: 'A Gold' },
    { field: 'silver', headerName: 'A Silver' },
    { field: 'bronze', headerName: 'A Bronze' },
    { field: 'total', headerName: 'A Total' },
  ];
}
function getColumnDefsB() {
  return [
    { field: 'gold', headerName: 'B Gold' },
    { field: 'silver', headerName: 'B Silver' },
    { field: 'bronze', headerName: 'B Bronze' },
    { field: 'total', headerName: 'B Total' },
    { field: 'athlete', headerName: 'B Athlete' },
    { field: 'age', headerName: 'B Age' },
    { field: 'country', headerName: 'B Country' },
    { field: 'sport', headerName: 'B Sport' },
    { field: 'year', headerName: 'B Year' },
    { field: 'date', headerName: 'B Date' },
  ];
}
