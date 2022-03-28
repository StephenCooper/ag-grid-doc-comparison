import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import { ColDef, ColGroupDef, GetServerSideStoreParamsParams, Grid, GridOptions, IServerSideDatasource, ServerSideStoreParams, ServerSideStoreType } from 'ag-grid-community';
declare var FakeServer: any;
const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'country', enableRowGroup: true, rowGroup: true },
    { field: 'sport', enableRowGroup: true, rowGroup: true },
    { field: 'year', minWidth: 100 },
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
  rowGroupPanelShow: 'always',
  autoGroupColumnDef: {
    flex: 1,
    minWidth: 280,
  },

  // rowBuffer: 0,
  cacheBlockSize: 4,

  // use the server-side row model
  rowModelType: 'serverSide',
  serverSideStoreType: 'partial',

  getServerSideStoreParams: function (params: GetServerSideStoreParamsParams) {
    var noGroupingActive = params.rowGroupColumns.length == 0
    var res: ServerSideStoreParams;
    if (noGroupingActive) {
      res = {
        // infinite scrolling
        storeType: 'partial',
        // 100 rows per block
        cacheBlockSize: 100,
        // purge blocks that are not needed
        maxBlocksInCache: 2,
      }
    } else {
      var topLevelRows = params.level == 0
      res = {
        storeType: topLevelRows ? 'full' : 'partial',
        cacheBlockSize: params.level == 1 ? 5 : 2,
        maxBlocksInCache: -1, // never purge blocks
      }
    }

    console.log('############## NEW STORE ##############')
    console.log(
      'getServerSideStoreParams, level = ' +
      params.level +
      ', result = ' +
      JSON.stringify(res)
    )

    return res
  },

  suppressAggFuncInHeader: true,

  animateRows: true,
  // debug: true,
}

function getServerSideDatasource(server: any): IServerSideDatasource {
  return {
    getRows: function (params) {
      console.log('[Datasource] - rows requested by grid: ', params.request)

      var response = server.getData(params.request)

      // adding delay to simulate real server call
      setTimeout(function () {
        if (response.success) {
          // call the success callback
          params.success({ rowData: response.rows, rowCount: response.lastRow })
        } else {
          // inform the grid request failed
          params.fail()
        }
      }, 400)
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
 