import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  ColumnApi,
  Grid,
  GridApi,
  GridOptions,
  GridReadyEvent,
} from "ag-grid-community";

@Component({
  selector: "my-app",
  template: `<div class="example-wrapper">
    <div style="margin-bottom: 1rem;">
      <div>
        <button (click)="sortByAthleteAsc()">Athlete Ascending</button>
        <button (click)="sortByAthleteDesc()">Athlete Descending</button>
        <button (click)="sortByCountryThenSport()">Country, then Sport</button>
        <button (click)="sortBySportThenCountry()">Sport, then Country</button>
      </div>
      <div style="margin-top: 0.25rem;">
        <button (click)="clearSort()">Clear Sort</button>
        <button (click)="saveSort()">Save Sort</button>
        <button (click)="restoreFromSave()">Restore from Save</button>
      </div>
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
  private gridColumnApi!: ColumnApi;

  public columnDefs: ColDef[] = [
    { field: "athlete" },
    { field: "age", width: 90 },
    { field: "country" },
    { field: "year", width: 90 },
    { field: "date" },
    { field: "sport" },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ];
  public defaultColDef: ColDef = {
    sortable: true,
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  sortByAthleteAsc() {
    this.gridColumnApi.applyColumnState({
      state: [{ colId: "athlete", sort: "asc" }],
      defaultState: { sort: null },
    });
  }

  sortByAthleteDesc() {
    this.gridColumnApi.applyColumnState({
      state: [{ colId: "athlete", sort: "desc" }],
      defaultState: { sort: null },
    });
  }

  sortByCountryThenSport() {
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: "country", sort: "asc", sortIndex: 0 },
        { colId: "sport", sort: "asc", sortIndex: 1 },
      ],
      defaultState: { sort: null },
    });
  }

  sortBySportThenCountry() {
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: "country", sort: "asc", sortIndex: 1 },
        { colId: "sport", sort: "asc", sortIndex: 0 },
      ],
      defaultState: { sort: null },
    });
  }

  clearSort() {
    this.gridColumnApi.applyColumnState({
      defaultState: { sort: null },
    });
  }

  saveSort() {
    var colState = this.gridColumnApi.getColumnState();
    var sortState = colState
      .filter(function (s) {
        return s.sort != null;
      })
      .map(function (s) {
        return { colId: s.colId, sort: s.sort, sortIndex: s.sortIndex };
      });
    savedSort = sortState;
    console.log("saved sort", sortState);
  }

  restoreFromSave() {
    this.gridColumnApi.applyColumnState({
      state: savedSort,
      defaultState: { sort: null },
    });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridColumnApi = params.columnApi;

    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => (this.rowData = data));
  }
}

var savedSort: any;
