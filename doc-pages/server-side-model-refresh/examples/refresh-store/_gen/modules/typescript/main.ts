import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css";
import { ColDef, ColGroupDef, Grid, GridOptions, IServerSideDatasource, ServerSideStoreType } from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ServerSideRowModelModule, RowGroupingModule])
declare var FakeServer: any;
const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'country', rowGroup: true, enableRowGroup: true, hide: true },
    { field: 'year', rowGroup: true, enableRowGroup: true, hide: true },
    { field: 'version' },
    { field: 'gold', aggFunc: 'sum' },
    { field: 'silver', aggFunc: 'sum' },
    { field: 'bronze', aggFunc: 'sum' },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 150,
    resizable: true,
    sortable: true,
  },
  autoGroupColumnDef: {
    flex: 1,
    minWidth: 280,
    field: 'athlete',
  },
  // use the server-side row model
  rowModelType: 'serverSide',
  serverSideStoreType: 'full',

  suppressAggFuncInHeader: true,

  rowGroupPanelShow: 'always',

  animateRows: true,
  debug: true,
}

var versionCounter = 1

function refreshCache(route?: string[]) {
  versionCounter++
  var purge = (document.querySelector('#purge') as HTMLInputElement).checked === true
  gridOptions.api!.refreshServerSideStore({ route: route, purge: purge })
}

function getBlockState() {
  var blockState = gridOptions.api!.getCacheBlockState()
  console.log(blockState)
}

function getServerSideDatasource(server: any): IServerSideDatasource {
  return {
    getRows: function (params) {
      console.log('[Datasource] - rows requested by grid: ', params.request)

      var response = server.getData(params.request)

      response.rows = response.rows.map(function (item: any) {
        var res: any = {}
        Object.assign(res, item)
        res.version =
          versionCounter + ' - ' + versionCounter + ' - ' + versionCounter
        return res
      })

      // adding delay to simulate real server call
      setTimeout(function () {
        if (response.success) {
          // call the success callback
          params.success({ rowData: response.rows, rowCount: response.lastRow })
        } else {
          // inform the grid request failed
          params.fail()
        }
      }, 1000)
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
 (<any>window).refreshCache = refreshCache;
 (<any>window).getBlockState = getBlockState;
}