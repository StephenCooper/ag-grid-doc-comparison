import { Component } from "@angular/core";
import "ag-grid-enterprise";
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
  StatusPanelDef,
} from "ag-grid-community";
import { ClickableStatusBarComponent } from "./clickable-status-bar-component.component";

@Component({
  selector: "my-app",
  template: `<button
      (click)="toggleStatusBarComp()"
      style="margin-bottom: 10px"
    >
      Toggle Status Bar Component
    </button>
    <ag-grid-angular
      style="width: 100%; height: 90%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [rowData]="rowData"
      [enableRangeSelection]="true"
      [rowSelection]="rowSelection"
      [statusBar]="statusBar"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular> `,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    {
      field: "row",
    },
    {
      field: "name",
    },
  ];
  public defaultColDef: ColDef = {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  };
  public rowData: any[] | null = [
    { row: "Row 1", name: "Michael Phelps" },
    { row: "Row 2", name: "Natalie Coughlin" },
    { row: "Row 3", name: "Aleksey Nemov" },
    { row: "Row 4", name: "Alicia Coutts" },
    { row: "Row 5", name: "Missy Franklin" },
    { row: "Row 6", name: "Ryan Lochte" },
    { row: "Row 7", name: "Allison Schmitt" },
    { row: "Row 8", name: "Natalie Coughlin" },
    { row: "Row 9", name: "Ian Thorpe" },
    { row: "Row 10", name: "Bob Mill" },
    { row: "Row 11", name: "Willy Walsh" },
    { row: "Row 12", name: "Sarah McCoy" },
    { row: "Row 13", name: "Jane Jack" },
    { row: "Row 14", name: "Tina Wills" },
  ];
  public rowSelection = "multiple";
  public statusBar: {
    statusPanels: StatusPanelDef[];
  } = {
    statusPanels: [
      {
        statusPanel: ClickableStatusBarComponent,
        key: "statusBarCompKey",
      },
      {
        statusPanel: "agAggregationComponent",
        statusPanelParams: {
          aggFuncs: ["count", "sum"],
        },
      },
    ],
  };

  toggleStatusBarComp() {
    const statusBarComponent = this.gridApi.getStatusPanel(
      "statusBarCompKey"
    ) as any;
    statusBarComponent.setVisible(!statusBarComponent.isVisible());
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    params.api.sizeColumnsToFit();
  }
}
