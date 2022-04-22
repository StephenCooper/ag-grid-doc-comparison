import {
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
      <button (click)="onNormalUpdate()">Normal Update</button>
      <button (click)="onAsyncUpdate()">Async Update</button>
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
      [getRowId]="getRowId"
      [defaultColDef]="defaultColDef"
      [autoGroupColumnDef]="autoGroupColumnDef"
      [rowData]="rowData"
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
      field: 'current',
      width: 200,
      aggFunc: 'sum',
      enableValue: true,
      cellClass: 'number',
      valueFormatter: numberCellFormatter,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
      field: 'previous',
      width: 200,
      aggFunc: 'sum',
      enableValue: true,
      cellClass: 'number',
      valueFormatter: numberCellFormatter,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
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
      field: 'submitterID',
      width: 200,
      aggFunc: 'sum',
      enableValue: true,
      cellClass: 'number',
      valueFormatter: numberCellFormatter,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
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
  public getRowId: GetRowIdFunc = function (params: GetRowIdParams) {
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

  onNormalUpdate() {
    var startMillis = new Date().getTime();
    setMessage('Running Transaction');
    var api = this.gridApi!;
    for (var i = 0; i < UPDATE_COUNT; i++) {
      setTimeout(function () {
        // pick one index at random
        var index = Math.floor(Math.random() * globalRowData.length);
        var itemToUpdate = globalRowData[index];
        var newItem = copyObject(itemToUpdate);
        // copy previous to current value
        newItem.previous = newItem.current;
        // then create new current value
        newItem.current = Math.floor(Math.random() * 100000) + 100;
        // do normal update. update is done before method returns
        api.applyTransaction({ update: [newItem] });
      }, 0);
    }
    // print message in next VM turn to allow browser to refresh first.
    // we assume the browser executes the timeouts in order they are created,
    // so this timeout executes after all the update timeouts created above.
    setTimeout(function () {
      var endMillis = new Date().getTime();
      var duration = endMillis - startMillis;
      setMessage('Transaction took ' + duration.toLocaleString() + 'ms');
    }, 0);
    function setMessage(msg: string) {
      var eMessage = document.querySelector('#eMessage') as any;
      eMessage.innerHTML = msg;
    }
  }

  onAsyncUpdate() {
    var startMillis = new Date().getTime();
    setMessage('Running Async');
    var updatedCount = 0;
    var api = this.gridApi!;
    for (var i = 0; i < UPDATE_COUNT; i++) {
      setTimeout(function () {
        // pick one index at random
        var index = Math.floor(Math.random() * globalRowData.length);
        var itemToUpdate = globalRowData[index];
        var newItem = copyObject(itemToUpdate);
        // copy previous to current value
        newItem.previous = newItem.current;
        // then create new current value
        newItem.current = Math.floor(Math.random() * 100000) + 100;
        // update using async method. passing the callback is
        // optional, we are doing it here so we know when the update
        // was processed by the grid.
        api.applyTransactionAsync({ update: [newItem] }, resultCallback);
      }, 0);
    }
    function resultCallback() {
      updatedCount++;
      if (updatedCount === UPDATE_COUNT) {
        // print message in next VM turn to allow browser to refresh
        setTimeout(function () {
          var endMillis = new Date().getTime();
          var duration = endMillis - startMillis;
          setMessage('Async took ' + duration.toLocaleString() + 'ms');
        }, 0);
      }
    }
    function setMessage(msg: string) {
      var eMessage = document.querySelector('#eMessage') as any;
      eMessage.innerHTML = msg;
    }
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    getData();
    params.api.setRowData(globalRowData);
  }
}

var UPDATE_COUNT = 200;
function numberCellFormatter(params: ValueFormatterParams) {
  return Math.floor(params.value)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
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
