import { Component } from "@angular/core";
import {
  ColDef,
  GridReadyEvent,
  RowGroupingDisplayType,
  ValueGetterParams,
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
    [animateRows]="true"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: "country", rowGroup: true, hide: true },
    { field: "year", rowGroup: true, hide: true },
    { field: "gold", aggFunc: "sum" },
    { field: "silver", aggFunc: "sum" },
    { field: "bronze", aggFunc: "sum" },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    filter: true,
    floatingFilter: true,
    resizable: true,
  };
  public autoGroupColumnDef: ColDef = {
    // supplies filter values to the column filters based on the colId
    filterValueGetter: (params: ValueGetterParams) => {
      const colId = params.column.getColId();
      if (colId.includes("country")) {
        return params.data.country;
      }
      if (colId.includes("year")) {
        return params.data.year;
      }
    },
  };
  public groupDisplayType: RowGroupingDisplayType = "multipleColumns";
  public rowData: any[] | null = getData();

  onGridReady(params: GridReadyEvent) {}
}
