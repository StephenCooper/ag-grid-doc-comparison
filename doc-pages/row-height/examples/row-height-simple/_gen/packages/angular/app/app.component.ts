import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { ColDef, GridReadyEvent, RowHeightParams } from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

@Component({
  selector: "my-app",
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [getRowHeight]="getRowHeight"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: "rowHeight" },
    { field: "athlete" },
    { field: "age", width: 80 },
    { field: "country" },
    { field: "year", width: 90 },
    { field: "date" },
    { field: "sport" },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ];
  public defaultColDef: ColDef = {
    width: 150,
    sortable: true,
    resizable: true,
    filter: true,
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => {
        var differentHeights = [40, 80, 120, 200];
        data.forEach(function (dataItem: any, index: number) {
          dataItem.rowHeight = differentHeights[index % 4];
        });
        this.rowData = data;
      });
  }

  getRowHeight(params: RowHeightParams) {
    return params.data.rowHeight;
  }
}
