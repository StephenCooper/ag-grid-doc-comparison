import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import {
  CheckboxSelectionCallbackParams,
  ColDef,
  GridApi,
  GridReadyEvent,
  HeaderCheckboxSelectionCallbackParams,
} from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

@Component({
  selector: "my-app",
  template: `<div class="example-wrapper">
    <div style="margin-bottom: 5px;">
      <input
        type="text"
        (input)="onQuickFilterChanged()"
        id="quickFilter"
        placeholder="quick filter..."
      />
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [suppressRowClickSelection]="true"
      [rowSelection]="rowSelection"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div> `,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: "athlete", minWidth: 180 },
    { field: "age" },
    { field: "country", minWidth: 150 },
    { field: "year" },
    { field: "date", minWidth: 150 },
    { field: "sport", minWidth: 150 },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
    headerCheckboxSelection: isFirstColumn,
    checkboxSelection: isFirstColumn,
  };
  public rowSelection = "multiple";
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onQuickFilterChanged() {
    this.gridApi.setQuickFilter(
      (document.getElementById("quickFilter") as HTMLInputElement).value
    );
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => (this.rowData = data));
  }
}

function isFirstColumn(
  params:
    | CheckboxSelectionCallbackParams
    | HeaderCheckboxSelectionCallbackParams
) {
  var displayedColumns = params.columnApi.getAllDisplayedColumns();
  var thisIsFirstColumn = displayedColumns[0] === params.column;
  return thisIsFirstColumn;
}
