import {
  ColDef,
  GridApi,
  GridReadyEvent,
  ValueGetterParams,
} from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
// Required feature modules are registered in app.module.ts

@Component({
  selector: "my-app",
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
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => (this.rowData = data));
  }
}

const athleteColumn = {
  headerName: "Athlete",
  valueGetter: function (params: ValueGetterParams) {
    return params.data.athlete;
  },
};
function getColDefsMedalsIncluded() {
  return [
    athleteColumn,
    {
      colId: "myAgeCol",
      headerName: "Age",
      valueGetter: function (params: ValueGetterParams) {
        return params.data.age;
      },
    },
    {
      headerName: "Country",
      headerClass: "country-header",
      valueGetter: function (params: ValueGetterParams) {
        return params.data.country;
      },
    },
    { field: "sport" },
    { field: "year" },
    { field: "date" },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ];
}
function getColDefsMedalsExcluded() {
  return [
    athleteColumn,
    {
      colId: "myAgeCol",
      headerName: "Age",
      valueGetter: function (params: ValueGetterParams) {
        return params.data.age;
      },
    },
    {
      headerName: "Country",
      headerClass: "country-header",
      valueGetter: function (params: ValueGetterParams) {
        return params.data.country;
      },
    },
    { field: "sport" },
    { field: "year" },
    { field: "date" },
  ];
}
