import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import {
  ColDef,
  GridReadyEvent,
  RowGroupingDisplayType,
} from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

@Component({
  selector: "my-app",
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [groupDisplayType]="groupDisplayType"
    [enableRangeSelection]="true"
    [animateRows]="true"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    // one column for showing the groups
    {
      headerName: "Group",
      cellRenderer: "agGroupCellRenderer",
      showRowGroup: true,
      minWidth: 210,
    },
    // the first group column
    { field: "country", rowGroup: true, hide: true },
    { field: "year", rowGroup: true, hide: true },
    { field: "athlete", minWidth: 200 },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    sortable: true,
    resizable: true,
  };
  public groupDisplayType: RowGroupingDisplayType = "custom";
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => (this.rowData = data));
  }
}
