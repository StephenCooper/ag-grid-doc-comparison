import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  ColumnApi,
  FirstDataRenderedEvent,
  Grid,
  GridApi,
  GridOptions,
  GridReadyEvent,
} from "ag-grid-community";
import { DetailCellRenderer } from "./detail-cell-renderer.component";

@Component({
  selector: "my-app",
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [masterDetail]="true"
    [detailCellRenderer]="detailCellRenderer"
    [detailRowHeight]="detailRowHeight"
    [animateRows]="true"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [embedFullWidthRows]="true"
    [rowData]="rowData"
    (firstDataRendered)="onFirstDataRendered($event)"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular> `,
})
export class AppComponent {
  public detailCellRenderer: any = DetailCellRenderer;
  public detailRowHeight = 150;
  public columnDefs: ColDef[] = [
    // group cell renderer needed for expand / collapse icons
    { field: "name", cellRenderer: "agGroupCellRenderer", pinned: "left" },
    { field: "account" },
    { field: "calls" },
    { field: "minutes", valueFormatter: "x.toLocaleString() + 'm'" },
    { headerName: "Extra Col 1", valueGetter: '"AAA"' },
    { headerName: "Extra Col 2", valueGetter: '"BBB"' },
    { headerName: "Extra Col 3", valueGetter: '"CCC"' },
    { headerName: "Pinned Right", pinned: "right" },
  ];
  public defaultColDef: ColDef = {};
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    setTimeout(function () {
      params.api.forEachNode(function (node) {
        node.setExpanded(node.id === "1");
      });
    }, 1000);
  }

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>(
        "https://www.ag-grid.com/example-assets/master-detail-data.json"
      )
      .subscribe((data) => {
        this.rowData = data;
      });
  }
}
