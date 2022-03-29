import {
  ColDef,
  GridApi,
  GridReadyEvent,
  RowNode,
} from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
// Required feature modules are registered in app.module.ts

@Component({
  selector: "my-app",
  template: `<div class="example-wrapper">
    <div style="margin-bottom: 1rem;">
      <button (click)="onBtForEachNode()">For-Each Node</button>
      <button (click)="onBtForEachNodeAfterFilter()">
        For-Each Node After Filter
      </button>
      <button (click)="onBtForEachNodeAfterFilterAndSort()">
        For-Each Node After Filter and Sort
      </button>
      <button (click)="onBtForEachLeafNode()">For-Each Leaf Node</button>
    </div>

    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [autoGroupColumnDef]="autoGroupColumnDef"
      [groupDefaultExpanded]="groupDefaultExpanded"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: "country", rowGroup: true, hide: true },
    { field: "athlete", minWidth: 180 },
    { field: "age" },
    { field: "year" },
    { field: "date", minWidth: 150 },
    { field: "sport", minWidth: 150 },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    sortable: true,
    filter: true,
  };
  public autoGroupColumnDef: ColDef = {
    minWidth: 200,
  };
  public groupDefaultExpanded = 1;
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onBtForEachNode() {
    console.log("### api.forEachNode() ###");
    this.gridApi.forEachNode(printNode);
  }

  onBtForEachNodeAfterFilter() {
    console.log("### api.forEachNodeAfterFilter() ###");
    this.gridApi.forEachNodeAfterFilter(printNode);
  }

  onBtForEachNodeAfterFilterAndSort() {
    console.log("### api.forEachNodeAfterFilterAndSort() ###");
    this.gridApi.forEachNodeAfterFilterAndSort(printNode);
  }

  onBtForEachLeafNode() {
    console.log("### api.forEachLeafNode() ###");
    this.gridApi.forEachLeafNode(printNode);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => params.api!.setRowData(data.slice(0, 50)));
  }
}

const printNode = (node: RowNode, index?: number) => {
  if (node.group) {
    console.log(index + " -> group: " + node.key);
  } else {
    console.log(
      index + " -> data: " + node.data.country + ", " + node.data.athlete
    );
  }
};
