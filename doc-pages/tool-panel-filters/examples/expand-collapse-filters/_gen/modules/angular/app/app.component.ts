import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  ColumnApi,
  Grid,
  GridApi,
  GridOptions,
  GridReadyEvent,
  IFiltersToolPanel,
  SideBarDef,
} from "@ag-grid-community/core";
// Required feature modules are registered in app.module.ts

@Component({
  selector: "my-app",
  template: `<div class="example-wrapper">
    <div>
      <span class="button-group">
        <button (click)="expandYearAndSport()">Expand Year &amp; Sport</button>
        <button (click)="collapseYear()">Collapse Year</button>
        <button (click)="expandAll()">Expand All</button>
        <button (click)="collapseAll()">Collapse All</button>
      </span>
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
  </div> `,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: (ColDef | ColGroupDef)[] = [
    {
      groupId: "athleteGroupId",
      headerName: "Athlete",
      children: [
        {
          headerName: "Name",
          field: "athlete",
          minWidth: 200,
          filter: "agTextColumnFilter",
        },
        { field: "age" },
        {
          groupId: "competitionGroupId",
          headerName: "Competition",
          children: [{ field: "year" }, { field: "date", minWidth: 180 }],
        },
        { field: "country", minWidth: 200 },
      ],
    },
    { colId: "sport", field: "sport", minWidth: 200 },
    {
      headerName: "Medals",
      children: [
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
        { field: "total" },
      ],
    },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  };
  public sideBar: SideBarDef | string | boolean | null = "filters";
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  collapseAll() {
    (
      this.gridApi.getToolPanelInstance("filters") as any as IFiltersToolPanel
    ).collapseFilters();
  }

  expandYearAndSport() {
    (
      this.gridApi.getToolPanelInstance("filters") as any as IFiltersToolPanel
    ).expandFilters(["year", "sport"]);
  }

  collapseYear() {
    (
      this.gridApi.getToolPanelInstance("filters") as any as IFiltersToolPanel
    ).collapseFilters(["year"]);
  }

  expandAll() {
    (
      this.gridApi.getToolPanelInstance("filters") as any as IFiltersToolPanel
    ).expandFilters();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => (this.rowData = data));
  }
}
