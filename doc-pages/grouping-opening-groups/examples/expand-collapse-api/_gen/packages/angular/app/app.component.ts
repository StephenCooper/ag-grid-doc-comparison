import { Component } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

@Component({
  selector: 'my-app',
  template: `<div class="example-wrapper">
    <div style="margin-bottom: 5px;">
      <button (click)="expandAll()">Expand All</button>
      <button (click)="collapseAll()">Collapse All</button>
      <button (click)="expandCountries()">Expand Countries</button>
      <button (click)="expand2000()">Expand Year '2000'</button>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: 'country', rowGroup: true, hide: true },
    { field: 'year', rowGroup: true, hide: true },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    resizable: true,
  };
  public rowData: any[] | null = getData();

  expandAll() {
    this.gridApi.expandAll();
  }

  collapseAll() {
    this.gridApi.collapseAll();
  }

  expandCountries() {
    this.gridApi.forEachNode((node) => {
      if (node.level === 0) {
        node.setExpanded(true);
      }
    });
  }

  expand2000() {
    this.gridApi.forEachNode((node) => {
      if (node.key === '2000') {
        node.parent!.setExpanded(true); // ensure parent 'country' group is also expanded
        node.setExpanded(true);
      }
    });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
}
