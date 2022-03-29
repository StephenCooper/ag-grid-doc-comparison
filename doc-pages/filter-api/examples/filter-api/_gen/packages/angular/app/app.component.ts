import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  IFiltersToolPanel,
  ISetFilter,
  SideBarDef,
} from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

@Component({
  selector: "my-app",
  template: `<div class="example-wrapper">
    <div class="example-header">
      <button (click)="getMiniFilterText()">Get Mini Filter Text</button>
      <button (click)="saveMiniFilterText()">Save Mini Filter Text</button>
      <button (click)="restoreMiniFilterText()">
        Restore Mini Filter Text
      </button>
      <button (click)="resetFilter()">Reset Filter</button>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [sideBar]="sideBar"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: "athlete", filter: "agSetColumnFilter" },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    filter: true,
    sortable: true,
  };
  public sideBar: SideBarDef | string | boolean | null = "filters";
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  getMiniFilterText() {
    const athleteFilter = this.gridApi.getFilterInstance(
      "athlete"
    ) as ISetFilter;
    console.log(athleteFilter.getMiniFilter());
  }

  saveMiniFilterText() {
    const athleteFilter = this.gridApi.getFilterInstance(
      "athlete"
    ) as ISetFilter;
    savedMiniFilterText = athleteFilter.getMiniFilter();
  }

  restoreMiniFilterText() {
    const athleteFilter = this.gridApi.getFilterInstance(
      "athlete"
    ) as ISetFilter;
    athleteFilter.setMiniFilter(savedMiniFilterText);
  }

  resetFilter() {
    const athleteFilter = this.gridApi.getFilterInstance(
      "athlete"
    ) as ISetFilter;
    athleteFilter.setModel(null);
    this.gridApi.onFilterChanged();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    (
      params.api.getToolPanelInstance("filters") as any as IFiltersToolPanel
    ).expandFilters();

    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => (this.rowData = data));
  }
}

let savedMiniFilterText: string | null = "";
