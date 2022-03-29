import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { ColDef, GridReadyEvent, PostSortRowsParams } from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

@Component({
  selector: "my-app",
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [postSortRows]="postSortRows"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: "athlete" },
    { field: "age", width: 100 },
    { field: "country", sort: "asc" },
    { field: "year" },
    { field: "date" },
    { field: "sport" },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ];
  public defaultColDef: ColDef = {
    width: 170,
    sortable: true,
  };
  public postSortRows: (params: PostSortRowsParams) => void = (
    params: PostSortRowsParams
  ) => {
    const rowNodes = params.nodes;
    // here we put Ireland rows on top while preserving the sort order
    let nextInsertPos = 0;
    for (let i = 0; i < rowNodes.length; i++) {
      const country = rowNodes[i].data.country;
      if (country === "Ireland") {
        rowNodes.splice(nextInsertPos, 0, rowNodes.splice(i, 1)[0]);
        nextInsertPos++;
      }
    }
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => {
        this.rowData = data;
      });
  }
}
