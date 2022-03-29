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
  RowHeightParams,
} from "ag-grid-community";

@Component({
  selector: "my-app",
  template: `<div class="example-wrapper">
    <div
      style="margin-bottom: 5px; font-family: Verdana, Geneva, Tahoma, sans-serif; font-size: 13px;"
    >
      <div>
        Top Level Groups:
        <button (click)="setGroupHeight(42)">42px</button>
        <button (click)="setGroupHeight(75)">75px</button>
        <button (click)="setGroupHeight(125)">125px</button>
      </div>
      <div style="margin-top: 5px;">
        Swimming Leaf Rows:
        <button (click)="setSwimmingHeight(42)">42px</button>
        <button (click)="setSwimmingHeight(75)">75px</button>
        <button (click)="setSwimmingHeight(125)">125px</button>
      </div>
      <div style="margin-top: 5px;">
        Russia Leaf Rows:
        <button (click)="setRussiaHeight(42)">42px</button>
        <button (click)="setRussiaHeight(75)">75px</button>
        <button (click)="setRussiaHeight(125)">125px</button>
      </div>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [rowData]="rowData"
      [animateRows]="true"
      [groupDefaultExpanded]="groupDefaultExpanded"
      [getRowHeight]="getRowHeight"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: "country", rowGroup: true },
    { field: "athlete" },
    { field: "date" },
    { field: "sport" },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ];
  public rowData: any[] | null = getData();
  public groupDefaultExpanded = 1;

  setSwimmingHeight(height: number) {
    swimmingHeight = height;
    this.gridApi.resetRowHeights();
  }

  setGroupHeight(height: number) {
    groupHeight = height;
    this.gridApi.resetRowHeights();
  }

  setRussiaHeight(height: number) {
    // this is used next time resetRowHeights is called
    russiaHeight = height;
    this.gridApi.forEachNode(function (rowNode) {
      if (rowNode.data && rowNode.data.country === "Russia") {
        rowNode.setRowHeight(height);
      }
    });
    this.gridApi.onRowHeightChanged();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  getRowHeight(params: RowHeightParams) {
    if (params.node.group && groupHeight != null) {
      return groupHeight;
    } else if (
      params.data &&
      params.data.country === "Russia" &&
      russiaHeight != null
    ) {
      return russiaHeight;
    } else if (
      params.data &&
      params.data.sport === "Swimming" &&
      swimmingHeight != null
    ) {
      return swimmingHeight;
    }
  }
}

var swimmingHeight: number;
var groupHeight: number;
var russiaHeight: number;
