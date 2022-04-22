const columnDefs = [
  {
    headerName: 'Group',
    field: 'name',
    rowGroup: true,
    hide: true,
  },
  {
    field: 'autoA',
    wrapText: true,
    autoHeight: true,
    aggFunc: 'last',
  },
  {
    field: 'autoB',
    wrapText: true,
    autoHeight: true,
    aggFunc: 'last',
  },
];

const gridOptions = {
  columnDefs: columnDefs,
  defaultColDef: {
    flex: 1,
    resizable: true,
    sortable: true,
  },
  autoGroupColumnDef: {
    flex: 1,
    maxWidth: 200,
  },
  // use the server-side row model
  rowModelType: 'serverSide',
  serverSideStoreType: 'partial',

  animateRows: true,
  suppressAggFuncInHeader: true,

  onGridReady: function () {
    // generate data for example
    var data = getData();

    // setup the fake server with entire dataset
    var fakeServer = new FakeServer(data);

    // create datasource with a reference to the fake server
    var datasource = getServerSideDatasource(fakeServer);

    // register the datasource with the grid
    gridOptions.api.setServerSideDatasource(datasource);
  },

  // debug: true,
};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector('#myGrid');
  new agGrid.Grid(gridDiv, gridOptions);
});

function getServerSideDatasource(server) {
  return {
    getRows: function (params) {
      console.log('[Datasource] - rows requested by grid: ', params.request);

      var response = server.getData(params.request);

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
      }, 200);
    },
  };
}
