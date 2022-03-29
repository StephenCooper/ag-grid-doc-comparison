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
      <label>Transaction Updates: </label>
      <button (click)="updateFirstRow()">Update First Displayed Row</button>
      <button (click)="addDRow()">Add New 'D' Row</button>
      <button (click)="reset()" style="margin-left: 20px">Reset</button>
    </div>

    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [rowData]="rowData"
      [columnDefs]="columnDefs"
      [sideBar]="sideBar"
      (firstDataRendered)="onFirstDataRendered($event)"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public rowData: any[] | null = getRowData();
  public columnDefs: ColDef[] = [
    {
      headerName: "Set Filter Column",
      field: "col1",
      filter: "agSetColumnFilter",
      editable: true,
      flex: 1,
    },
  ];
  public sideBar: SideBarDef | string | boolean | null = "filters";

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    (
      params.api.getToolPanelInstance("filters") as any as IFiltersToolPanel
    ).expandFilters();
  }

  updateFirstRow() {
    var firstRow = this.gridApi.getDisplayedRowAtIndex(0);
    if (firstRow) {
      var firstRowData = firstRow.data;
      firstRowData["col1"] += "X";
      this.gridApi.applyTransaction({ update: [firstRowData] });
    }
  }

  addDRow() {
    this.gridApi.applyTransaction({ add: [{ col1: "D" }] });
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
  return [
    { col1: "A" },
    { col1: "A" },
    { col1: "B" },
    { col1: "B" },
    { col1: "C" },
    { col1: "C" },
  ];
}
