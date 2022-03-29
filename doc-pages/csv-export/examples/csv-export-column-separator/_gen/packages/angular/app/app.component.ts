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
} from "ag-grid-community";

@Component({
  selector: "my-app",
  template: `
    <div style="display: flex; flex-direction: column; height: 100%;">
      <div style="display: flex;">
        <div class="row">
          <label>columnSeparator = </label>
          <select id="columnSeparator">
            <option value="none">(default)</option>
            <option value="tab">tab</option>
            <option value="|">bar (|)</option>
          </select>
        </div>
      </div>

      <div style="margin: 10px 0;">
        <button (click)="onBtnUpdate()">Show CSV export content text</button>
        <button (click)="onBtnExport()">Download CSV export file</button>
      </div>

      <div style="flex: 1 1 0px; position: relative;">
        <div id="gridContainer">
          <ag-grid-angular
            style="width: 100%; height: 100%;"
            class="ag-theme-alpine"
            [defaultColDef]="defaultColDef"
            [suppressExcelExport]="true"
            [popupParent]="popupParent"
            [columnDefs]="columnDefs"
            [rowData]="rowData"
            (gridReady)="onGridReady($event)"
          ></ag-grid-angular>
        </div>
        <textarea id="csvResult">
Click the Show CSV export content button to view exported CSV here</textarea
        >
      </div>
    </div>
  `,
})
export class AppComponent {
  private gridApi!: GridApi;

  public defaultColDef: ColDef = {
    editable: true,
    resizable: true,
    minWidth: 100,
    flex: 1,
  };
  public popupParent: HTMLElement = document.body;
  public columnDefs: ColDef[] = [
    { field: "make" },
    { field: "model" },
    { field: "price" },
  ];
  public rowData: any[] | null = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 },
  ];

  onBtnExport() {
    var params = getParams();
    if (params.columnSeparator) {
      alert(
        "NOTE: you are downloading a file with non-standard separators - it may not render correctly in Excel."
      );
    }
    this.gridApi.exportDataAsCsv(params);
  }

  onBtnUpdate() {
    (document.querySelector("#csvResult") as any).value =
      this.gridApi.getDataAsCsv(getParams());
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
}

function getValue(inputSelector: string) {
  var text = (document.querySelector(inputSelector) as any).value;
  switch (text) {
    case "none":
      return;
    case "tab":
      return "\t";
    default:
      return text;
  }
}
function getParams() {
  return {
    columnSeparator: getValue("#columnSeparator"),
  };
}
