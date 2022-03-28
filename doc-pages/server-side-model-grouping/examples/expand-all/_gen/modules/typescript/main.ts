import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css";
import { ColDef, ColGroupDef, Grid, GridOptions, IServerSideDatasource, IServerSideGetRowsParams, ServerSideStoreType } from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ServerSideRowModelModule])
declare var FakeServer: any;

const gridOptions: GridOptions = {
  columnDefs: [
    {
      field: 'year',
      enableRowGroup: true,
      rowGroup: true,
      hide: true,
      minWidth: 100,
    },
    { field: 'country', enableRowGroup: true, rowGroup: true, hide: true },
    { field: 'sport', enableRowGroup: true, rowGroup: true, hide: true },
    { field: 'gold', aggFunc: 'sum' },
    { field: 'silver', aggFunc: 'sum' },
    { field: 'bronze', aggFunc: 'sum' },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 120,
    resizable: true,
    sortable: true,
  },
  autoGroupColumnDef: {
    flex: 1,
    minWidth: 280,
  },
  maxConcurrentDatasourceRequests: 1,
  rowModelType: 'serverSide',
  serverSideStoreType: 'full',
  suppressAggFuncInHeader: true,
  animateRows: true,
}

function onBtExpandAll() {
  gridOptions.api!.expandAll()
}

function onBtCollapseAll() {
  gridOptions.api!.collapseAll()
}

function onBtExpandTopLevel() {
  gridOptions.api!.forEachNode(function (node) {
    if (node.group && node.level == 0) {
      node.setExpanded(true)
    }
  })
}

function getServerSideDatasource(server: any): IServerSideDatasource {
  return {
    getRows: function (params: IServerSideGetRowsParams) {
      console.log('[Datasource] - rows requested by grid: ', params.request)

      var response = server.getData(params.request)

      // adding delay to simulate real server call
      setTimeout(function () {
        if (response.success) {
          // call the success callback
          params.success({
            rowData: response.rows,
            rowCount: response.lastRow,
            storeInfo: {
              lastLoadedTime: new Date().toLocaleString(),
              randomValue: Math.random(),
            },
          })
        } else {
          // inform the grid request failed
          params.fail()
        }
      }, 200)
    },
  }
}

// setup the grid after the page has finished loading
  var gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions)

  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then(response => response.json())
    .then(function (data) {
      // setup the fake server with entire dataset
      var fakeServer = new FakeServer(data)

      // create datasource with a reference to the fake server
      var datasource = getServerSideDatasource(fakeServer)

      // register the datasource with the grid
      gridOptions.api!.setServerSideDatasource(datasource)
    })
 

if (typeof window !== 'undefined') {
// Attach external event handlers to window so they can be called from index.html
 (<any>window).onBtExpandAll = onBtExpandAll;
 (<any>window).onBtCollapseAll = onBtCollapseAll;
 (<any>window).onBtExpandTopLevel = onBtExpandTopLevel;
}