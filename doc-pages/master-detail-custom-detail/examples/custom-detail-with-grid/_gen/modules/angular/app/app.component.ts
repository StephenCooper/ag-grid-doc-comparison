import {
  ColDef,
  FirstDataRenderedEvent,
  GridApi,
  GridReadyEvent,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DetailCellRenderer } from './detail-cell-renderer.component';
// Required feature modules are registered in app.module.ts
declare var window: any;

@Component({
  selector: 'my-app',
  template: `<div class="example-wrapper">
    <div style="margin-bottom: 5px;">
      <button (click)="printDetailGridInfo()">Print Detail Grid Info</button>
      <button (click)="expandCollapseAll()">Toggle Expand / Collapse</button>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [masterDetail]="true"
      [detailRowHeight]="detailRowHeight"
      [detailCellRenderer]="detailCellRenderer"
      [rowData]="rowData"
      (firstDataRendered)="onFirstDataRendered($event)"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    // group cell renderer needed for expand / collapse icons
    { field: 'name', cellRenderer: 'agGroupCellRenderer' },
    { field: 'account' },
    { field: 'calls' },
    { field: 'minutes', valueFormatter: "x.toLocaleString() + 'm'" },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
  };
  public detailRowHeight = 310;
  public detailCellRenderer: any = DetailCellRenderer;
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    // arbitrarily expand a row for presentational purposes
    setTimeout(function () {
      params.api.getDisplayedRowAtIndex(1)!.setExpanded(true);
    }, 0);
  }

  expandCollapseAll() {
    this.gridApi.forEachNode(function (node) {
      node.expanded = !!window.collapsed;
    });
    window.collapsed = !window.collapsed;
    this.gridApi.onGroupExpandedOrCollapsed();
  }

  printDetailGridInfo() {
    console.log("Currently registered detail grid's: ");
    this.gridApi.forEachDetailGridInfo(function (detailGridInfo) {
      console.log(detailGridInfo);
    });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>(
        'https://www.ag-grid.com/example-assets/master-detail-data.json'
      )
      .subscribe((data) => {
        this.rowData = data;
      });
  }
}
