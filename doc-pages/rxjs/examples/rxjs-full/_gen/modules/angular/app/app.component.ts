import {
  ColDef,
  GetRowIdFunc,
  GridReadyEvent,
  ValueFormatterParams,
} from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { Component } from "@angular/core";
// Required feature modules are registered in app.module.ts
declare function createMockServer(): any;

@Component({
  selector: "my-app",
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [enableRangeSelection]="true"
    [getRowId]="getRowId"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular> `,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: "code", maxWidth: 90 },
    { field: "name", minWidth: 200 },
    {
      field: "bid",
      cellClass: "cell-number",
      valueFormatter: numberFormatter,
      cellRenderer: "agAnimateShowChangeCellRenderer",
    },
    {
      field: "mid",
      cellClass: "cell-number",
      valueFormatter: numberFormatter,
      cellRenderer: "agAnimateShowChangeCellRenderer",
    },
    {
      field: "ask",
      cellClass: "cell-number",
      valueFormatter: numberFormatter,
      cellRenderer: "agAnimateShowChangeCellRenderer",
    },
    {
      field: "volume",
      cellClass: "cell-number",
      cellRenderer: "agAnimateSlideCellRenderer",
    },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };
  public getRowId: GetRowIdFunc = function (params) {
    return params.data.code;
  };
  public rowData!: any[];

  onGridReady(params: GridReadyEvent) {
    const mockServer = createMockServer(),
      initialLoad$ = mockServer.initialLoad(),
      updates$ = mockServer.allDataUpdates();
    initialLoad$.subscribe(function (rowData: any[]) {
      // the initial full set of data
      // note that we don't need to un-subscribe here as it's a one off data load
      params.api.setRowData(rowData);
      // now listen for updates
      // we're using immutableData this time, so although we're setting the entire
      // data set here, the grid will only re-render changed rows, improving performance
      updates$.subscribe(function (newRowData: any[]) {
        return params.api.setRowData(newRowData);
      });
    });
  }
}

function numberFormatter(params: ValueFormatterParams) {
  if (typeof params.value === "number") {
    return params.value.toFixed(2);
  }
  return params.value;
}
