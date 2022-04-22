import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

@Component({
  selector: 'my-app',
  template: `<div class="test-container">
    <div class="test-header">
      <button (click)="onBtNormalCols()">Normal Cols</button>
      <button (click)="onBtExtraCols()">Extra Cols</button>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [defaultColDef]="defaultColDef"
      [columnDefs]="columnDefs"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public defaultColDef: ColDef = {
    resizable: true,
    width: 150,
  };
  public columnDefs: ColDef[] = createNormalColDefs();
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onBtNormalCols() {
    this.gridApi.setColumnDefs(createNormalColDefs());
  }

  onBtExtraCols() {
    this.gridApi.setColumnDefs(createExtraColDefs());
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => (this.rowData = data));
  }
}

function createNormalColDefs() {
  return [
    {
      headerName: 'Athlete Details',
      headerClass: 'participant-group',
      children: [
        { field: 'athlete', colId: 'athlete' },
        { field: 'country', colId: 'country' },
      ],
    },
    { field: 'age', colId: 'age' },
    {
      headerName: 'Sports Results',
      headerClass: 'medals-group',
      children: [
        { field: 'sport', colId: 'sport' },
        { field: 'gold', colId: 'gold' },
      ],
    },
  ];
}
function createExtraColDefs() {
  return [
    {
      headerName: 'Athlete Details',
      headerClass: 'participant-group',
      children: [
        { field: 'athlete', colId: 'athlete' },
        { field: 'country', colId: 'country' },
        { field: 'region1', colId: 'region1' },
        { field: 'region2', colId: 'region2' },
      ],
    },
    { field: 'age', colId: 'age' },
    { field: 'distance', colId: 'distance' },
    {
      headerName: 'Sports Results',
      headerClass: 'medals-group',
      children: [
        { field: 'sport', colId: 'sport' },
        { field: 'gold', colId: 'gold' },
      ],
    },
  ];
}
