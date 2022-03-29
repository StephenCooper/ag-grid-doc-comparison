import { ColDef, GridReadyEvent } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
// Required feature modules are registered in app.module.ts

@Component({
  selector: "my-app",
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    [sideBar]="true"
    [autoGroupColumnDef]="autoGroupColumnDef"
    [icons]="icons"
    [rowSelection]="rowSelection"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    {
      field: "athlete",
      rowGroup: true,
      hide: true,
    },
    {
      field: "age",
      width: 90,
      enableValue: true,
      icons: {
        // not very useful, but demonstrates you can just have strings
        sortAscending: "U",
        sortDescending: "D",
      },
    },
    {
      field: "country",
      width: 150,
      rowGroupIndex: 0,
      icons: {
        sortAscending: '<i class="fa fa-sort-alpha-up"/>',
        sortDescending: '<i class="fa fa-sort-alpha-down"/>',
      },
    },
    { field: "year", width: 90, enableRowGroup: true },
    { field: "date" },
    {
      field: "sport",
      width: 110,
      icons: myIcons,
    },
    { field: "gold", width: 100 },
    { field: "silver", width: 100 },
    { field: "bronze", width: 100 },
    { field: "total", width: 100 },
  ];
  public defaultColDef: ColDef = {
    width: 150,
    sortable: true,
    resizable: true,
    filter: true,
    floatingFilter: true,
  };
  public autoGroupColumnDef: ColDef = {
    headerName: "Athlete",
    field: "athlete",
    rowDrag: true,
    // use font awesome for first col, with numbers for sort
    icons: {
      menu: '<i class="fa fa-shower"/>',
      filter: '<i class="fa fa-long-arrow-alt-up"/>',
      columns: '<i class="fa fa-snowflake"/>',
      sortAscending: '<i class="fa fa-sort-alpha-up"/>',
      sortDescending: '<i class="fa fa-sort-alpha-down"/>',
    },
    headerCheckboxSelection: true,
    width: 300,
  };
  public icons: {
    [key: string]: Function | string;
  } = {
    // use font awesome for menu icons
    menu: '<i class="fa fa-bath" style="width: 10px"/>',
    filter: '<i class="fa fa-long-arrow-alt-down"/>',
    columns: '<i class="fa fa-handshake"/>',
    sortAscending: '<i class="fa fa-long-arrow-alt-down"/>',
    sortDescending: '<i class="fa fa-long-arrow-alt-up"/>',
    // use some strings from group
    groupExpanded:
      '<img src="https://www.ag-grid.com/example-assets/group/contract.png" style="height: 12px; width: 12px;padding-right: 2px"/>',
    groupContracted:
      '<img src="https://www.ag-grid.com/example-assets/group/expand.png" style="height: 12px; width: 12px;padding-right: 2px"/>',
    columnMovePin: '<i class="far fa-hand-rock"/>',
    columnMoveAdd: '<i class="fa fa-plus-square"/>',
    columnMoveHide: '<i class="fa fa-times"/>',
    columnMoveMove: '<i class="fa fa-link"/>',
    columnMoveLeft: '<i class="fa fa-arrow-left"/>',
    columnMoveRight: '<i class="fa fa-arrow-right"/>',
    columnMoveGroup: '<i class="fa fa-users"/>',
    rowGroupPanel: '<i class="fa fa-university"/>',
    pivotPanel: '<i class="fa fa-magic"/>',
    valuePanel: '<i class="fa fa-magnet"/>',
    menuPin: "P",
    menuValue: "V",
    menuAddRowGroup: "A",
    menuRemoveRowGroup: "R",
    clipboardCopy: ">>",
    clipboardPaste: ">>",
    rowDrag: '<i class="fa fa-circle"/>',
  };
  public rowSelection = "multiple";
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => (this.rowData = data));
  }
}

var myIcons = {
  sortAscending: function () {
    return "ASC";
  },
  sortDescending: function () {
    return "DESC";
  },
};
