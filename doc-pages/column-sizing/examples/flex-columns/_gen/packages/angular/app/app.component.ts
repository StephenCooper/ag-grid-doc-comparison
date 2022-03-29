import { Component } from "@angular/core";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  ColSpanParams,
  ColumnApi,
  Grid,
  GridApi,
  GridOptions,
  GridReadyEvent,
} from "ag-grid-community";

@Component({
  selector: "my-app",
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular> `,
})
export class AppComponent {
  public columnDefs: (ColDef | ColGroupDef)[] = [
    {
      headerName: "A",
      field: "author",
      width: 300,
      colSpan: colSpan,
    },
    {
      headerName: "Flexed Columns",
      children: [
        {
          headerName: "B",
          minWidth: 200,
          maxWidth: 350,
          flex: 2,
        },
        {
          headerName: "C",
          flex: 1,
        },
      ],
    },
  ];
  public defaultColDef: ColDef = {
    resizable: true,
  };
  public rowData: any[] | null = [1, 2];

  onGridReady(params: GridReadyEvent) {
    setInterval(fillAllCellsWithWidthMeasurement, 50);
  }
}

var colSpan = function (params: ColSpanParams) {
  return params.data === 2 ? 3 : 1;
};
function fillAllCellsWithWidthMeasurement() {
  Array.prototype.slice
    .call(document.querySelectorAll(".ag-cell"))
    .forEach(function (cell) {
      var width = cell.offsetWidth;
      var isFullWidthRow = cell.parentElement.childNodes.length === 1;
      cell.textContent = (isFullWidthRow ? "Total width: " : "") + width + "px";
    });
}
