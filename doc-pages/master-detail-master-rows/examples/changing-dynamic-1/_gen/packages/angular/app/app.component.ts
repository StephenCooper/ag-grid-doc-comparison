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
  IsRowMaster,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

@Component({
  selector: 'my-app',
  template: `<div style="display: flex; flex-direction: column; height: 100%;">
    <div style="padding-bottom: 4px;">
      <button (click)="onBtClearMilaCalls()">Clear Mila Calls</button>
      <button (click)="onBtSetMilaCalls()">Set Mila Calls</button>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [masterDetail]="true"
      [isRowMaster]="isRowMaster"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [getRowId]="getRowId"
      [detailCellRendererParams]="detailCellRendererParams"
      [rowData]="rowData"
      (firstDataRendered)="onFirstDataRendered($event)"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div> `,
})
export class AppComponent {
  private gridApi!: GridApi;

  public isRowMaster: IsRowMaster = (dataItem: any) => {
    return dataItem ? dataItem.callRecords.length > 0 : false;
  };
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
  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => {
    return params.data.account;
  };
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
      },
    },
    getDetailRowData: (params) => {
      params.successCallback(params.data.callRecords);
    },
  } as IDetailCellRendererParams;
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    // arbitrarily expand a row for presentational purposes
    setTimeout(function () {
      params.api.getDisplayedRowAtIndex(1)!.setExpanded(true);
    }, 0);
  }

  onBtClearMilaCalls() {
    var milaSmithRowNode = this.gridApi.getRowNode('177001')!;
    var milaSmithData = milaSmithRowNode.data;
    milaSmithData.callRecords = [];
    this.gridApi.applyTransaction({ update: [milaSmithData] });
  }

  onBtSetMilaCalls() {
    var milaSmithRowNode = this.gridApi.getRowNode('177001')!;
    var milaSmithData = milaSmithRowNode.data;
    milaSmithData.callRecords = [
      {
        name: 'susan',
        callId: 579,
        duration: 23,
        switchCode: 'SW5',
        direction: 'Out',
        number: '(02) 47485405',
      },
      {
        name: 'susan',
        callId: 580,
        duration: 52,
        switchCode: 'SW3',
        direction: 'In',
        number: '(02) 32367069',
      },
    ];
    this.gridApi.applyTransaction({ update: [milaSmithData] });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>(
        'https://www.ag-grid.com/example-assets/master-detail-dynamic-data.json'
      )
      .subscribe((data) => {
        this.rowData = data;
      });
  }
}
