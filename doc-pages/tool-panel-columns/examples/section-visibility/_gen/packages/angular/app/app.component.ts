import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  IColumnToolPanel,
  SideBarDef,
} from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

@Component({
  selector: "my-app",
  template: `<div class="example-wrapper">
    <div>
      <span class="button-group">
        <button (click)="showPivotModeSection()">
          Show Pivot Mode Section
        </button>
        <button (click)="showRowGroupsSection()">
          Show Row Groups Section
        </button>
        <button (click)="showValuesSection()">Show Values Section</button>
        <button (click)="showPivotSection()">Show Pivot Section</button>
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
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { headerName: "Name", field: "athlete", minWidth: 200 },
    { field: "age", enableRowGroup: true },
    { field: "country", minWidth: 200 },
    { field: "year" },
    { field: "date", suppressColumnsToolPanel: true, minWidth: 180 },
    { field: "sport", minWidth: 200 },
    { field: "gold", aggFunc: "sum" },
    { field: "silver", aggFunc: "sum" },
    { field: "bronze", aggFunc: "sum" },
    { field: "total", aggFunc: "sum" },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    sortable: true,
    enablePivot: true,
  };
  public sideBar: SideBarDef | string | boolean | null = {
    toolPanels: [
      {
        id: "columns",
        labelDefault: "Columns",
        labelKey: "columns",
        iconKey: "columns",
        toolPanel: "agColumnsToolPanel",
        toolPanelParams: {
          suppressRowGroups: true,
          suppressValues: true,
          suppressPivots: true,
          suppressPivotMode: true,
          suppressColumnFilter: true,
          suppressColumnSelectAll: true,
          suppressColumnExpandAll: true,
        },
      },
    ],
    defaultToolPanel: "columns",
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  showPivotModeSection() {
    var columnToolPanel = this.gridApi.getToolPanelInstance(
      "columns"
    ) as unknown as IColumnToolPanel;
    columnToolPanel.setPivotModeSectionVisible(true);
  }

  showRowGroupsSection() {
    var columnToolPanel = this.gridApi.getToolPanelInstance(
      "columns"
    ) as unknown as IColumnToolPanel;
    columnToolPanel.setRowGroupsSectionVisible(true);
  }

  showValuesSection() {
    var columnToolPanel = this.gridApi.getToolPanelInstance(
      "columns"
    ) as unknown as IColumnToolPanel;
    columnToolPanel.setValuesSectionVisible(true);
  }

  showPivotSection() {
    var columnToolPanel = this.gridApi.getToolPanelInstance(
      "columns"
    ) as unknown as IColumnToolPanel;
    columnToolPanel.setPivotSectionVisible(true);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => (this.rowData = data));
  }
}
