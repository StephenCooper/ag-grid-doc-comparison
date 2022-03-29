import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import {
  CellValueChangedEvent,
  ColDef,
  ColGroupDef,
  ColumnApi,
  Grid,
  GridApi,
  GridOptions,
  GridReadyEvent,
  PasteEndEvent,
  PasteStartEvent,
} from "@ag-grid-community/core";
// Required feature modules are registered in app.module.ts

@Component({
  selector: "my-app",
  template: `<div style="padding-bottom: 5px">
      <button (click)="onBtCopyRows()">Copy Selected Rows to Clipboard</button>
      <button (click)="onBtCopyRange()">
        Copy Selected Range to Clipboard
      </button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <button (click)="onPasteOn()">Toggle Paste On</button>
      <button (click)="onPasteOff()">Toggle Paste Off</button>
    </div>

    <ag-grid-angular
      style="width: 100%; height: 93%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [enableRangeSelection]="true"
      [rowSelection]="rowSelection"
      [rowData]="rowData"
      (cellValueChanged)="onCellValueChanged($event)"
      (pasteStart)="onPasteStart($event)"
      (pasteEnd)="onPasteEnd($event)"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular> `,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: "athlete", minWidth: 200 },
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
    editable: true,
    flex: 1,
    minWidth: 100,
    resizable: true,
  };
  public rowSelection = "multiple";
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onCellValueChanged(params: CellValueChangedEvent) {
    console.log("Callback onCellValueChanged:", params);
  }

  onPasteStart(params: PasteStartEvent) {
    console.log("Callback onPasteStart:", params);
  }

  onPasteEnd(params: PasteEndEvent) {
    console.log("Callback onPasteEnd:", params);
  }

  onBtCopyRows() {
    this.gridApi.copySelectedRowsToClipboard();
  }

  onBtCopyRange() {
    this.gridApi.copySelectedRangeToClipboard();
  }

  onPasteOff() {
    this.gridApi.setSuppressClipboardPaste(true);
  }

  onPasteOn() {
    this.gridApi.setSuppressClipboardPaste(false);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => (this.rowData = data));
  }
}
