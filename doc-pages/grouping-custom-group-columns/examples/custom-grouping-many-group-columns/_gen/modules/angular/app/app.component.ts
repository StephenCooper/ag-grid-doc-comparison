import {
  ColDef,
  GridReadyEvent,
  RowGroupingDisplayType,
} from "@ag-grid-community/core";
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
    [groupDisplayType]="groupDisplayType"
    [enableRangeSelection]="true"
    [animateRows]="true"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    {
      headerName: "Country",
      minWidth: 200,
      // this tells the grid what values to put into the cell
      showRowGroup: "country",
      // this tells the grid what to use to render the cell
      cellRenderer: "agGroupCellRenderer",
    },
    {
      headerName: "Year",
      minWidth: 200,
      showRowGroup: "year",
      cellRenderer: "agGroupCellRenderer",
    },
    // these are the two columns we use to group by. we also hide them, so there
    // is no duplication with the values above
    { field: "country", rowGroup: true, hide: true },
    { field: "year", rowGroup: true, hide: true },
    { field: "athlete", minWidth: 220 },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
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
