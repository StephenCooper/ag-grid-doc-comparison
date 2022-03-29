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
  SideBarDef,
} from "@ag-grid-community/core";
import { CustomStatsToolPanel } from "./custom-stats-tool-panel.component";
// Required feature modules are registered in app.module.ts

@Component({
  selector: "my-app",
  template: `<div style="height: 100%; box-sizing: border-box;">
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [icons]="icons"
      [sideBar]="sideBar"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: "athlete", width: 150, filter: "agTextColumnFilter" },
    { field: "age", width: 90 },
    { field: "country", width: 120 },
    { field: "year", width: 90 },
    { field: "date", width: 110 },
    { field: "gold", width: 100, filter: false },
    { field: "silver", width: 100, filter: false },
    { field: "bronze", width: 100, filter: false },
    { field: "total", width: 100, filter: false },
  ];
  public defaultColDef: ColDef = {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  };
  public icons: {
    [key: string]: Function | string;
  } = {
    "custom-stats": '<span class="ag-icon ag-icon-custom-stats"></span>',
  };
  public sideBar: SideBarDef | string | boolean | null = {
    toolPanels: [
      {
        id: "columns",
        labelDefault: "Columns",
        labelKey: "columns",
        iconKey: "columns",
        toolPanel: "agColumnsToolPanel",
      },
      {
        id: "filters",
        labelDefault: "Filters",
        labelKey: "filters",
        iconKey: "filter",
        toolPanel: "agFiltersToolPanel",
      },
      {
        id: "customStats",
        labelDefault: "Custom Stats",
        labelKey: "customStats",
        iconKey: "custom-stats",
        toolPanel: CustomStatsToolPanel,
      },
    ],
    defaultToolPanel: "customStats",
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => {
        this.rowData = data;
      });
  }
}
