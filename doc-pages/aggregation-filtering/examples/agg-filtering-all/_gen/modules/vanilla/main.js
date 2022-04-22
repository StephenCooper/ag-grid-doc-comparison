const gridOptions = {
  columnDefs: [
    { field: 'country', rowGroup: true, hide: true },
    { field: 'sport', rowGroup: true, hide: true },
    { field: 'athlete', hide: true },
    { field: 'year' },
    { field: 'total', aggFunc: 'sum', filter: 'agNumberColumnFilter' },
  ],
  defaultColDef: {
    flex: 1,
    filter: true,
    floatingFilter: true,
    resizable: true,
  },
  autoGroupColumnDef: {
    field: 'athlete',
  },
  groupDefaultExpanded: -1,
  groupAggFiltering: true,
  rowData: getData(),
};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', () => {
  const gridDiv = document.querySelector('#myGrid');
  new agGrid.Grid(gridDiv, gridOptions);
});
