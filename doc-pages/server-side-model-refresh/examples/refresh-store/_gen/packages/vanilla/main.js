const gridOptions = {
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
};

var versionCounter = 1;

function refreshCache(route) {
  versionCounter++;
  var purge = document.querySelector('#purge').checked === true;
  gridOptions.api.refreshServerSideStore({ route: route, purge: purge });
}

function getBlockState() {
  var blockState = gridOptions.api.getCacheBlockState();
  console.log(blockState);
}

function getServerSideDatasource(server) {
  return {
    getRows: function (params) {
      console.log('[Datasource] - rows requested by grid: ', params.request);

      var response = server.getData(params.request);

      response.rows = response.rows.map(function (item) {
        var res = {};
        Object.assign(res, item);
        res.version =
          versionCounter + ' - ' + versionCounter + ' - ' + versionCounter;
        return res;
      });

      // adding delay to simulate real server call
      setTimeout(function () {
        if (response.success) {
          // call the success callback
          params.success({
            rowData: response.rows,
            rowCount: response.lastRow,
          });
        } else {
          // inform the grid request failed
          params.fail();
        }
      }, 1000);
    },
  };
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector('#myGrid');
  new agGrid.Grid(gridDiv, gridOptions);

  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then((response) => response.json())
    .then(function (data) {
      // setup the fake server with entire dataset
      var fakeServer = new FakeServer(data);

      // create datasource with a reference to the fake server
      var datasource = getServerSideDatasource(fakeServer);

      // register the datasource with the grid
      gridOptions.api.setServerSideDatasource(datasource);
    });
});
