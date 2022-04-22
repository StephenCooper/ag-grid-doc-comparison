const gridOptions = {
  columnDefs: [
    { field: 'id', maxWidth: 75 },
    { field: 'athlete', minWidth: 190 },
    { field: 'age' },
    { field: 'year' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
  ],

  defaultColDef: {
    flex: 1,
    minWidth: 90,
    resizable: true,
  },

  // use the server-side row model
  rowModelType: 'serverSide',
  serverSideStoreType: 'partial',

  // enable pagination
  pagination: true,

  // 10 rows per page (default is 100)
  paginationPageSize: 10,

  // fetch 10 rows per block as page size is 10 (default is 100)
  cacheBlockSize: 10,

  animateRows: true,
};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector('#myGrid');
  new agGrid.Grid(gridDiv, gridOptions);

  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then((response) => response.json())
    .then(function (data) {
      // add id to data
      var idSequence = 1;
      data.forEach(function (item) {
        item.id = idSequence++;
      });

      // setup the fake server with entire dataset
      var fakeServer = new FakeServer(data);

      // create datasource with a reference to the fake server
      var datasource = getServerSideDatasource(fakeServer);

      // register the datasource with the grid
      gridOptions.api.setServerSideDatasource(datasource);
    });
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
