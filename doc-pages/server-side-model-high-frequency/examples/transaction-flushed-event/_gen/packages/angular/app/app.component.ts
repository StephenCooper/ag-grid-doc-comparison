import { Component } from '@angular/core';
import {
  AsyncTransactionsFlushed,
  ColDef,
  GetRowIdFunc,
  GetRowIdParams,
  GridApi,
  GridReadyEvent,
  IServerSideDatasource,
  ServerSideStoreType,
  ServerSideTransactionResult,
  ServerSideTransactionResultStatus,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import 'ag-grid-enterprise';

@Component({
  selector: 'my-app',
  template: `<div class="example-wrapper">
    <div style="margin-bottom: 5px;">
      <button (click)="onBtAdd()">Add</button>
      <button (click)="onBtFlush()">Flush</button>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine-dark"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [getRowId]="getRowId"
      [rowSelection]="rowSelection"
      [serverSideStoreType]="serverSideStoreType"
      [rowModelType]="rowModelType"
      [animateRows]="true"
      [asyncTransactionWaitMillis]="asyncTransactionWaitMillis"
      [rowData]="rowData"
      (asyncTransactionsFlushed)="onAsyncTransactionsFlushed($event)"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [{ field: 'product' }, { field: 'value' }];
  public defaultColDef: ColDef = {
    width: 250,
    resizable: true,
  };
  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => {
    return params.data.product;
  };
  public rowSelection = 'multiple';
  public serverSideStoreType: ServerSideStoreType = 'full';
  public rowModelType = 'serverSide';
  public asyncTransactionWaitMillis = 4000;
  public rowData!: any[];

  onAsyncTransactionsFlushed(e: AsyncTransactionsFlushed) {
    var summary: {
      [key in ServerSideTransactionResultStatus]?: any;
    } = {};
    (e.results as ServerSideTransactionResult[]).forEach(
      (result: ServerSideTransactionResult) => {
        var status = result.status;
        if (summary[status] == null) {
          summary[status] = 0;
        }
        summary[status]++;
      }
    );
    console.log('onAsyncTransactionsFlushed: ' + JSON.stringify(summary));
  }

  onBtAdd() {
    var newProductName =
      all_products[Math.floor(all_products.length * Math.random())];
    var newItem = {
      product: newProductName + ' ' + newProductSequence++,
      value: Math.floor(Math.random() * 10000),
    };
    allServerSideData.push(newItem);
    var tx = {
      add: [newItem],
    };
    this.gridApi.applyServerSideTransactionAsync(tx);
  }

  onBtFlush() {
    this.gridApi.flushServerSideAsyncTransactions();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    setupData();
    var dataSource: IServerSideDatasource = {
      getRows: (params2) => {
        var rowData = allServerSideData.slice();
        setTimeout(function () {
          params2.success({ rowData: rowData });
        }, 200);
      },
    };
    params.api.setServerSideDatasource(dataSource);
  }
}

var products = ['Palm Oil', 'Rubber', 'Wool', 'Amber', 'Copper'];
var newProductSequence = 0;
var all_products = [
  'Palm Oil',
  'Rubber',
  'Wool',
  'Amber',
  'Copper',
  'Lead',
  'Zinc',
  'Tin',
  'Aluminium',
  'Aluminium Alloy',
  'Nickel',
  'Cobalt',
  'Molybdenum',
  'Recycled Steel',
  'Corn',
  'Oats',
  'Rough Rice',
  'Soybeans',
  'Rapeseed',
  'Soybean Meal',
  'Soybean Oil',
  'Wheat',
  'Milk',
  'Coca',
  'Coffee C',
  'Cotton No.2',
  'Sugar No.11',
  'Sugar No.14',
];
var allServerSideData: any[] = [];
function setupData() {
  products.forEach(function (product, index) {
    allServerSideData.push({
      product: product,
      value: Math.floor(Math.random() * 10000),
    });
  });
}
var valueCounter = 0;
function getNextValue() {
  valueCounter++;
  return Math.floor((valueCounter * 987654321) / 7) % 10000;
}
