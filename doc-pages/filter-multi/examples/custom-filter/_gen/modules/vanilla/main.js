const gridOptions = {
  columnDefs: [
    { field: 'athlete', filter: 'agMultiColumnFilter' },
    { field: 'sport', filter: 'agMultiColumnFilter' },
    {
      field: 'year',
      filter: 'agMultiColumnFilter',
      filterParams: {
        filters: [
          {
            filter: YearFilter,
            floatingFilterComponent: YearFloatingFilter,
          },
          {
            filter: 'agNumberColumnFilter',
          },
        ],
      },
    },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 200,
    resizable: true,
    floatingFilter: true,
    menuTabs: ['filterMenuTab'],
  },
};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector('#myGrid');
  new agGrid.Grid(gridDiv, gridOptions);

  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then((response) => response.json())
    .then((data) => gridOptions.api.setRowData(data));
});
