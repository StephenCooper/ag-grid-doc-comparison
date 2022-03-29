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
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [autoGroupColumnDef]="autoGroupColumnDef"
    [groupDefaultExpanded]="groupDefaultExpanded"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    {
      field: "year",
      rowGroup: true,
      hide: true,
    },
    {
      field: "month",
      rowGroup: true,
      hide: true,
      comparator: function (a, b) {
        const months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        // sorts 'months' in chronological order
        return months.indexOf(a) - months.indexOf(b);
      },
    },
    { field: "salesRep" },
    { field: "handset" },
    { field: "sale" },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    filter: true,
    sortable: true,
    resizable: true,
  };
  public autoGroupColumnDef: ColDef = {
    sort: "asc",
    minWidth: 300,
  };
  public groupDefaultExpanded = 1;
  public rowData: any[] | null = getData();

  onGridReady(params: GridReadyEvent) {}
}
