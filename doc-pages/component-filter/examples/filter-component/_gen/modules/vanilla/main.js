const columnDefs = [
  { field: 'row' },
  {
    field: 'name',
    filter: PartialMatchFilter,
    menuTabs: ['filterMenuTab'],
  },
];

const gridOptions = {
  defaultColDef: {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  },
  columnDefs: columnDefs,
  rowData: getData(),
};

function onClicked() {
  gridOptions.api.getFilterInstance('name', function (instance) {
    instance.componentMethod('Hello World!');
  });
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector('#myGrid');
  new agGrid.Grid(gridDiv, gridOptions);
  gridOptions.api.sizeColumnsToFit();
});
