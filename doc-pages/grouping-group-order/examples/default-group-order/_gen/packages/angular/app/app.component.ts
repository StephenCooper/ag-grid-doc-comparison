import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import {
  ColDef,
  GridReadyEvent,
  InitialGroupOrderComparatorParams,
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
    [autoGroupColumnDef]="autoGroupColumnDef"
    [groupDisplayType]="groupDisplayType"
    [initialGroupOrderComparator]="initialGroupOrderComparator"
    [animateRows]="true"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: "country", rowGroup: true, hide: true },
    { field: "year" },
    { field: "sport", rowGroup: true, hide: true },
    { field: "athlete", minWidth: 200 },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
    { field: "age" },
    { field: "date", minWidth: 140 },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
    sortable: true,
  };
  public autoGroupColumnDef: ColDef = {
    minWidth: 200,
  };
  public groupDisplayType: RowGroupingDisplayType = "groupRows";
  public initialGroupOrderComparator: (
    params: InitialGroupOrderComparatorParams
  ) => number = function (params: InitialGroupOrderComparatorParams) {
    const a = params.nodeA.key || "";
    const b = params.nodeB.key || "";
    return a < b ? -1 : a > b ? 1 : 0;
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => (this.rowData = data));
  }
}
