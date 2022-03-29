import { Component } from "@angular/core";
import {
  ColDef,
  FirstDataRenderedEvent,
  GridApi,
  GridReadyEvent,
  IFiltersToolPanel,
  SideBarDef,
} from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

@Component({
  selector: "my-app",
  template: `<div class="example-wrapper">
    <div style="margin-bottom: 5px;">
      <button (click)="setNewData()">Set New Data</button>
      <button (click)="reset()" style="margin-left: 5px">Reset</button>
    </div>

    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [sideBar]="sideBar"
      [rowData]="rowData"
      (firstDataRendered)="onFirstDataRendered($event)"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    {
      headerName: "Set Filter Column",
      field: "col1",
      filter: "agSetColumnFilter",
      flex: 1,
      editable: true,
    },
  ];
  public sideBar: SideBarDef | string | boolean | null = "filters";
  public rowData: any[] | null = getRowData();

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    (
      params.api.getToolPanelInstance("filters") as any as IFiltersToolPanel
    ).expandFilters();
  }

  setNewData() {
    var newData = [
      { col1: "A" },
      { col1: "A" },
      { col1: "B" },
      { col1: "C" },
      { col1: "D" },
      { col1: "E" },
    ];
    this.gridApi.setRowData(newData);
  }

  reset() {
    this.gridApi.setFilterModel(null);
    this.gridApi.setRowData(getRowData());
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
}

function getRowData() {
  return [{ col1: "A" }, { col1: "A" }, { col1: "B" }, { col1: "C" }];
}
