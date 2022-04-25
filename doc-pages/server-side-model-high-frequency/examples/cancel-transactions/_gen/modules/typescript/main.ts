import {
  AsyncTransactionsFlushed,
  ColDef,
  GetRowIdParams,
  Grid,
  GridOptions,
  IsApplyServerSideTransactionParams,
  IServerSideDatasource,
  ModuleRegistry,
  ServerSideTransactionResult,
  ServerSideTransactionResultStatus,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ServerSideRowModelModule]);

const columnDefs: ColDef[] = [{ field: 'product' }, { field: 'value' }];

const gridOptions: GridOptions = {
  defaultColDef: {
    width: 250,
    resizable: true,
  },
  onAsyncTransactionsFlushed: (e: AsyncTransactionsFlushed) => {
    var summary: { [key in ServerSideTransactionResultStatus]?: any } = {};
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
  },
  isApplyServerSideTransaction: (
    params: IsApplyServerSideTransactionParams
  ) => {
    var tx = params.transaction as any;
    var storeInfo = params.storeInfo;
    var txCreatedSinceRowDataRead = tx.serverVersion > storeInfo.serverVersion;
    console.log(
      'tx.serverVersion = ' +
        tx.serverVersion +
        ', storeInfo.serverVersion = ' +
        storeInfo.serverVersion
    );
    if (txCreatedSinceRowDataRead) {
      console.log('Applying transaction');
      return true;
    } else {
      console.log('Cancelling transaction');
      return false;
    }
  },
  onGridReady: (params) => {
    setupData();

    var dataSource: IServerSideDatasource = {
      getRows: (params2) => {
        setTimeout(function () {
          var rowData = allServerSideData.slice();
          console.log(
            'getRows: found ' + rowData.length + ' records on server.'
          );

          params2.success({
            rowData: rowData,
            storeInfo: { serverVersion: serverVersion },
          });
        }, 2000);
      },
    };

    params.api.setServerSideDatasource(dataSource);
  },
  getRowId: (params: GetRowIdParams) => {
    return params.data.product;
  },
  rowModelType: 'serverSide',
  serverSideStoreType: 'full',
  columnDefs: columnDefs,
};

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

var serverVersion = 0;

function onBtAdd() {
  var newProductName =
    all_products[Math.floor(all_products.length * Math.random())];
  var newItem = {
    product: newProductName + ' ' + newProductSequence++,
    value: Math.floor(Math.random() * 10000),
  };
  allServerSideData.push(newItem);
  serverVersion++;
  var tx = {
    add: [newItem],
    serverVersion: serverVersion,
  };
  gridOptions.api!.applyServerSideTransactionAsync(tx);
}

function onBtRefresh() {
  gridOptions.api!.refreshServerSideStore({ purge: true });
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

if (typeof window !== 'undefined') {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).onBtAdd = onBtAdd;
  (<any>window).onBtRefresh = onBtRefresh;
}
