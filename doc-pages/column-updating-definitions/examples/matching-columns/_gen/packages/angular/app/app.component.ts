import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  ValueGetterParams,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

@Component({
  selector: 'my-app',
  template: `<div class="test-container">
    <div class="test-header">
      <button (click)="onBtIncludeMedalColumns()">Include Medal Columns</button>
      <button (click)="onBtExcludeMedalColumns()">Exclude Medal Columns</button>
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
    sortable: true,
    resizable: true,
  };
  public columnDefs: ColDef[] = getColDefsMedalsIncluded();
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onBtExcludeMedalColumns() {
    this.gridApi.setColumnDefs(getColDefsMedalsExcluded());
  }

  onBtIncludeMedalColumns() {
    this.gridApi.setColumnDefs(getColDefsMedalsIncluded());
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => (this.rowData = data));
  }
}

const athleteColumn = {
  headerName: 'Athlete',
  valueGetter: (params: ValueGetterParams) => {
    return params.data.athlete;
  },
};
function getColDefsMedalsIncluded() {
  return [
    athleteColumn,
    {
      colId: 'myAgeCol',
      headerName: 'Age',
      valueGetter: (params: ValueGetterParams) => {
        return params.data.age;
      },
    },
    {
      headerName: 'Country',
      headerClass: 'country-header',
      valueGetter: (params: ValueGetterParams) => {
        return params.data.country;
      },
    },
    { field: 'sport' },
    { field: 'year' },
    { field: 'date' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ];
}
function getColDefsMedalsExcluded() {
  return [
    athleteColumn,
    {
      colId: 'myAgeCol',
      headerName: 'Age',
      valueGetter: (params: ValueGetterParams) => {
        return params.data.age;
      },
    },
    {
      headerName: 'Country',
      headerClass: 'country-header',
      valueGetter: (params: ValueGetterParams) => {
        return params.data.country;
      },
    },
    { field: 'sport' },
    { field: 'year' },
    { field: 'date' },
  ];
}
