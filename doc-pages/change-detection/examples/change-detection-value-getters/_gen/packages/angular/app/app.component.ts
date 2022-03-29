import { Component } from "@angular/core";
import { ColDef, GridReadyEvent } from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";

@Component({
  selector: "my-app",
  template: ` <ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine-dark"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [columnTypes]="columnTypes"
    [rowData]="rowData"
    [groupDefaultExpanded]="groupDefaultExpanded"
    [suppressAggFuncInHeader]="true"
    [enableCellChangeFlash]="true"
    [animateRows]="true"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: "a", type: "valueColumn" },
    { field: "b", type: "valueColumn" },
    { field: "c", type: "valueColumn" },
    { field: "d", type: "valueColumn" },
    { field: "e", type: "valueColumn" },
    { field: "f", type: "valueColumn" },
    {
      headerName: "Total",
      valueGetter: "data.a + data.b + data.c + data.d + data.e + data.f",
      editable: false,
      cellClass: "total-col",
    },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    sortable: true,
  };
  public columnTypes: {
    [key: string]: ColDef;
  } = {
    valueColumn: {
      editable: true,
      valueParser: "Number(newValue)",
      filter: "agNumberColumnFilter",
    },
  };
  public rowData: any[] | null = getRowData();
  public groupDefaultExpanded = 1;

  onGridReady(params: GridReadyEvent) {}
}

function getRowData() {
  var rowData = [];
  for (var i = 1; i <= 20; i++) {
    rowData.push({
      group: i < 5 ? "A" : "B",
      a: (i * 863) % 100,
      b: (i * 811) % 100,
      c: (i * 743) % 100,
      d: (i * 677) % 100,
      e: (i * 619) % 100,
      f: (i * 571) % 100,
    });
  }
  return rowData;
}
