import {
  AsyncTransactionsFlushed,
  ColDef,
  GetRowIdFunc,
  GetRowIdParams,
  GridApi,
  GridReadyEvent,
  ValueFormatterParams,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { Component } from '@angular/core';
// Required feature modules are registered in app.module.ts
declare var globalRowData: any[];

@Component({
  selector: 'my-app',
  template: `<div class="example-wrapper">
    <div style="margin-bottom: 5px;">
      <button (click)="onFlushTransactions()">Flush Transactions</button>
      <span id="eMessage"></span>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [suppressAggFuncInHeader]="true"
      [animateRows]="true"
      [rowGroupPanelShow]="rowGroupPanelShow"
      [pivotPanelShow]="pivotPanelShow"
      [asyncTransactionWaitMillis]="asyncTransactionWaitMillis"
      [getRowId]="getRowId"
      [defaultColDef]="defaultColDef"
      [autoGroupColumnDef]="autoGroupColumnDef"
      [rowData]="rowData"
      (asyncTransactionsFlushed)="onAsyncTransactionsFlushed($event)"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div> `,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    // these are the row groups, so they are all hidden (they are show in the group column)
    {
      headerName: 'Product',
      field: 'product',
      enableRowGroup: true,
      enablePivot: true,
      rowGroupIndex: 0,
      hide: true,
    },
    {
      headerName: 'Portfolio',
      field: 'portfolio',
      enableRowGroup: true,
      enablePivot: true,
      rowGroupIndex: 1,
      hide: true,
    },
    {
      headerName: 'Book',
      field: 'book',
      enableRowGroup: true,
      enablePivot: true,
      rowGroupIndex: 2,
      hide: true,
    },
    { headerName: 'Trade', field: 'trade', width: 100 },
    // all the other columns (visible and not grouped)
    {
      headerName: 'Current',
      field: 'current',
      width: 200,
      aggFunc: 'sum',
      enableValue: true,
      cellClass: 'number',
      valueFormatter: numberCellFormatter,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
      headerName: 'Previous',
      field: 'previous',
      width: 200,
      aggFunc: 'sum',
      enableValue: true,
      cellClass: 'number',
      valueFormatter: numberCellFormatter,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
      headerName: 'Deal Type',
      field: 'dealType',
      enableRowGroup: true,
      enablePivot: true,
    },
    {
      headerName: 'Bid',
      field: 'bidFlag',
      enableRowGroup: true,
      enablePivot: true,
      width: 100,
    },
    {
      headerName: 'PL 1',
      field: 'pl1',
      width: 200,
      aggFunc: 'sum',
      enableValue: true,
      cellClass: 'number',
      valueFormatter: numberCellFormatter,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
      headerName: 'PL 2',
      field: 'pl2',
      width: 200,
      aggFunc: 'sum',
      enableValue: true,
      cellClass: 'number',
      valueFormatter: numberCellFormatter,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
      headerName: 'Gain-DX',
      field: 'gainDx',
      width: 200,
      aggFunc: 'sum',
      enableValue: true,
      cellClass: 'number',
      valueFormatter: numberCellFormatter,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
      headerName: 'SX / PX',
      field: 'sxPx',
      width: 200,
      aggFunc: 'sum',
      enableValue: true,
      cellClass: 'number',
      valueFormatter: numberCellFormatter,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
      headerName: '99 Out',
      field: '_99Out',
      width: 200,
      aggFunc: 'sum',
      enableValue: true,
      cellClass: 'number',
      valueFormatter: numberCellFormatter,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
      headerName: 'Submitter ID',
      field: 'submitterID',
      width: 200,
      aggFunc: 'sum',
      enableValue: true,
      cellClass: 'number',
      valueFormatter: numberCellFormatter,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
      headerName: 'Submitted Deal ID',
      field: 'submitterDealID',
      width: 200,
      aggFunc: 'sum',
      enableValue: true,
      cellClass: 'number',
      valueFormatter: numberCellFormatter,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
  ];
  public rowGroupPanelShow = 'always';
  public pivotPanelShow = 'always';
  public asyncTransactionWaitMillis = 4000;
  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => {
    return params.data.trade;
  };
  public defaultColDef: ColDef = {
    width: 120,
    sortable: true,
    resizable: true,
  };
  public autoGroupColumnDef: ColDef = {
    width: 250,
  };
  public rowData!: any[];

  onAsyncTransactionsFlushed(e: AsyncTransactionsFlushed) {
    console.log(
      '========== onAsyncTransactionsFlushed: applied ' +
        e.results.length +
        ' transactions'
    );
  }

  onFlushTransactions() {
    this.gridApi.flushAsyncTransactions();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    getData();
    params.api.setRowData(globalRowData);
    startFeed(params.api);
  }
}

var UPDATE_COUNT = 20;
function numberCellFormatter(params: ValueFormatterParams) {
  return Math.floor(params.value)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
function startFeed(api: GridApi) {
  var count = 1;
  setInterval(function () {
    var thisCount = count++;
    var updatedIndexes: any = {};
    var newItems: any[] = [];
    for (var i = 0; i < UPDATE_COUNT; i++) {
      // pick one index at random
      var index = Math.floor(Math.random() * globalRowData.length);
      // dont do same index twice, otherwise two updates for same row in one transaction
      if (updatedIndexes[index]) {
        continue;
      }
      var itemToUpdate = globalRowData[index];
      var newItem: any = copyObject(itemToUpdate);
      // copy previous to current value
      newItem.previous = newItem.current;
      // then create new current value
      newItem.current = Math.floor(Math.random() * 100000) + 100;
      newItems.push(newItem);
    }
    var resultCallback = function () {
      console.log('transactionApplied() - ' + thisCount);
    };
    api.applyTransactionAsync({ update: newItems }, resultCallback);
    console.log('applyTransactionAsync() - ' + thisCount);
  }, 500);
}
// makes a copy of the original and merges in the new values
function copyObject(object: any) {
  // start with new object
  var newObject: any = {};
  // copy in the old values
  Object.keys(object).forEach(function (key) {
    newObject[key] = object[key];
  });
  return newObject;
}
