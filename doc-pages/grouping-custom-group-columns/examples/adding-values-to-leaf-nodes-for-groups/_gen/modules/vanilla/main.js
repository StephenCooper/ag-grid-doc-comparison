const columnDefs = [
  {
    headerName: 'Country',
    colId: 'countryGroup',
    showRowGroup: 'country',
    minWidth: 200,
    cellRenderer: 'agGroupCellRenderer',
    filterValueGetter: (params) => {
      return params.data ? params.data.country : null;
    },
  },
  { field: 'country', rowGroup: true, hide: true },
  {
    headerName: 'Year / Athlete',
    colId: 'yearAthleteGroup',
    minWidth: 220,
    showRowGroup: 'year',
    cellRenderer: 'agGroupCellRenderer',
    valueGetter: 'data ? data.athlete : null',
  },
  { field: 'year', rowGroup: true, hide: true },
  { field: 'sport', minWidth: 200 },
  { field: 'gold' },
  { field: 'silver' },
  { field: 'bronze' },
  { field: 'total' },
  { field: 'age' },
  { field: 'date', minWidth: 140 },
];

const gridOptions = {
  columnDefs: columnDefs,
  defaultColDef: {
    flex: 1,
    minWidth: 100,
    filter: true,
    sortable: true,
    resizable: true,
  },
  groupDisplayType: 'custom',
  enableRangeSelection: true,
  animateRows: true,
};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector('#myGrid');
  new agGrid.Grid(gridDiv, gridOptions);

  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then((response) => response.json())
    .then((data) => gridOptions.api.setRowData(data));
});
