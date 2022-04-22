// specify the columns
const columnDefs = [{ headerName: 'Make', field: 'make' }];

// let the grid know which columns and what data to use
const gridOptions = {
  columnDefs: columnDefs,
  rowData: [],
  onGridReady: function (params) {
    params.api.sizeColumnsToFit();
  },
};

// wait for the document to be loaded, otherwise
// AG Grid will not find the div in the document.
document.addEventListener('DOMContentLoaded', function () {
  // lookup the container we want the Grid to use
  var eGridDiv = document.querySelector('#myGrid');

  // create the grid passing in the div to use together with the columns & data we want to use
  new agGrid.Grid(eGridDiv, gridOptions);
});
