import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  ColDef,
  FirstDataRenderedEvent,
  GetRowIdFunc,
  GetRowIdParams,
  GridApi,
  GridReadyEvent,
  IDetailCellRendererParams,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

@Component({
  selector: 'my-app',
  template: `<div style="display: flex; flex-direction: column; height: 100%;">
    <div style="padding-bottom: 4px;">
      <button (click)="flashMilaSmithOnly()">Flash Mila Smith</button>
      <button (click)="flashAll()">Flash All</button>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [masterDetail]="true"
      [detailRowHeight]="detailRowHeight"
      [detailCellRendererParams]="detailCellRendererParams"
      [getRowId]="getRowId"
      [defaultColDef]="defaultColDef"
      [rowData]="rowData"
      (firstDataRendered)="onFirstDataRendered($event)"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div> `,
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
  public detailRowHeight = 200;
  public detailCellRendererParams: any = {
    detailGridOptions: {
      columnDefs: [
        { field: 'callId' },
        { field: 'direction' },
        { field: 'number', minWidth: 150 },
        { field: 'duration', valueFormatter: "x.toLocaleString() + 's'" },
        { field: 'switchCode', minWidth: 150 },
      ],
      defaultColDef: {
        flex: 1,
        editable: true,
        resizable: true,
      },
    },
    getDetailRowData: (params) => {
      params.successCallback(params.data.callRecords);
    },
  } as IDetailCellRendererParams;
  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => {
    // use 'account' as the row ID
    return params.data.account;
  };
  public defaultColDef: ColDef = {
    flex: 1,
    editable: true,
    resizable: true,
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    // expand the first two rows
    setTimeout(function () {
      params.api.forEachNode(function (node) {
        node.setExpanded(true);
      });
    }, 0);
  }

  flashMilaSmithOnly() {
    // flash Mila Smith - we know her account is 177001 and we use the account for the row ID
    var detailGrid = this.gridApi.getDetailGridInfo('detail_177001');
    if (detailGrid) {
      detailGrid.api!.flashCells();
    }
  }

  flashAll() {
    this.gridApi.forEachDetailGridInfo(function (detailGridApi) {
      detailGridApi.api!.flashCells();
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
