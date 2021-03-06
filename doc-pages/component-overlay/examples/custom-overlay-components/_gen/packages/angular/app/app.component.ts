import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { CustomLoadingOverlay } from './custom-loading-overlay.component';
import { CustomNoRowsOverlay } from './custom-no-rows-overlay.component';

@Component({
  selector: 'my-app',
  template: `<div class="example-wrapper">
    <div style="margin-bottom: 5px;">
      <button (click)="onBtShowLoading()">Show Loading Overlay</button>
      <button (click)="onBtShowNoRows()">Show No Rows Overlay</button>
      <button (click)="onBtHide()">Hide Overlay</button>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [rowData]="rowData"
      [loadingOverlayComponent]="loadingOverlayComponent"
      [loadingOverlayComponentParams]="loadingOverlayComponentParams"
      [noRowsOverlayComponent]="noRowsOverlayComponent"
      [noRowsOverlayComponentParams]="noRowsOverlayComponentParams"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: 'athlete', width: 150 },
    { field: 'age', width: 90 },
    { field: 'country', width: 120 },
    { field: 'year', width: 90 },
    { field: 'date', width: 110 },
    { field: 'sport', width: 110 },
    { field: 'gold', width: 100 },
    { field: 'silver', width: 100 },
    { field: 'bronze', width: 100 },
    { field: 'total', width: 100 },
  ];
  public defaultColDef: ColDef = {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  };
  public loadingOverlayComponent: any = CustomLoadingOverlay;
  public loadingOverlayComponentParams: any = {
    loadingMessage: 'One moment please...',
  };
  public noRowsOverlayComponent: any = CustomNoRowsOverlay;
  public noRowsOverlayComponentParams: any = {
    noRowsMessageFunc: () => 'Sorry - no rows! at: ' + new Date(),
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onBtShowLoading() {
    this.gridApi.showLoadingOverlay();
  }

  onBtShowNoRows() {
    this.gridApi.showNoRowsOverlay();
  }

  onBtHide() {
    this.gridApi.hideOverlay();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => {
        this.rowData = data;
      });
  }
}
