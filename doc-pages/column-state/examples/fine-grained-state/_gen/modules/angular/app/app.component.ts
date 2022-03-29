import {
  ColDef,
  ColumnApi,
  GridReadyEvent,
  SideBarDef,
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
      <table>
        <tbody>
          <tr>
            <td>Sort:</td>
            <td>
              <button (click)="onBtSortAthlete()">Sort Athlete</button>
              <button (click)="onBtSortCountryThenSportClearOthers()">
                Sort Country, then Sport - Clear Others
              </button>
              <button (click)="onBtClearAllSorting()">Clear All Sorting</button>
            </td>
          </tr>
          <tr>
            <td>Column Order:</td>
            <td>
              <button (click)="onBtOrderColsMedalsFirst()">
                Show Medals First
              </button>
              <button (click)="onBtOrderColsMedalsLast()">
                Show Medals Last
              </button>
            </td>
          </tr>
          <tr>
            <td>Column Visibility:</td>
            <td>
              <button (click)="onBtHideMedals()">Hide Medals</button>
              <button (click)="onBtShowMedals()">Show Medals</button>
            </td>
          </tr>
          <tr>
            <td>Row Group:</td>
            <td>
              <button (click)="onBtRowGroupCountryThenSport()">
                Group Country then Sport
              </button>
              <button (click)="onBtRemoveCountryRowGroup()">
                Remove Country
              </button>
              <button (click)="onBtClearAllRowGroups()">
                Clear All Groups
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [sideBar]="sideBar"
      [rowGroupPanelShow]="rowGroupPanelShow"
      [pivotPanelShow]="pivotPanelShow"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  private gridColumnApi!: ColumnApi;

  public columnDefs: ColDef[] = [
    { field: "athlete" },
    { field: "age" },
    { field: "country" },
    { field: "sport" },
    { field: "year" },
    { field: "date" },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ];
  public defaultColDef: ColDef = {
    sortable: true,
    resizable: true,
    width: 150,
    enableRowGroup: true,
    enablePivot: true,
    enableValue: true,
  };
  public sideBar: SideBarDef | string | boolean | null = {
    toolPanels: ["columns"],
  };
  public rowGroupPanelShow = "always";
  public pivotPanelShow = "always";
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onBtSortAthlete() {
    this.gridColumnApi.applyColumnState({
      state: [{ colId: "athlete", sort: "asc" }],
    });
  }

  onBtSortCountryThenSportClearOthers() {
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: "country", sort: "asc", sortIndex: 0 },
        { colId: "sport", sort: "asc", sortIndex: 1 },
      ],
      defaultState: { sort: null },
    });
  }

  onBtClearAllSorting() {
    this.gridColumnApi.applyColumnState({
      defaultState: { sort: null },
    });
  }

  onBtRowGroupCountryThenSport() {
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: "country", rowGroupIndex: 0 },
        { colId: "sport", rowGroupIndex: 1 },
      ],
      defaultState: { rowGroup: false },
    });
  }

  onBtRemoveCountryRowGroup() {
    this.gridColumnApi.applyColumnState({
      state: [{ colId: "country", rowGroup: false }],
    });
  }

  onBtClearAllRowGroups() {
    this.gridColumnApi.applyColumnState({
      defaultState: { rowGroup: false },
    });
  }

  onBtOrderColsMedalsFirst() {
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: "gold" },
        { colId: "silver" },
        { colId: "bronze" },
        { colId: "total" },
        { colId: "athlete" },
        { colId: "age" },
        { colId: "country" },
        { colId: "sport" },
        { colId: "year" },
        { colId: "date" },
      ],
      applyOrder: true,
    });
  }

  onBtOrderColsMedalsLast() {
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: "athlete" },
        { colId: "age" },
        { colId: "country" },
        { colId: "sport" },
        { colId: "year" },
        { colId: "date" },
        { colId: "gold" },
        { colId: "silver" },
        { colId: "bronze" },
        { colId: "total" },
      ],
      applyOrder: true,
    });
  }

  onBtHideMedals() {
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: "gold", hide: true },
        { colId: "silver", hide: true },
        { colId: "bronze", hide: true },
        { colId: "total", hide: true },
      ],
    });
  }

  onBtShowMedals() {
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: "gold", hide: false },
        { colId: "silver", hide: false },
        { colId: "bronze", hide: false },
        { colId: "total", hide: false },
      ],
    });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridColumnApi = params.columnApi;

    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => (this.rowData = data));
  }
}
