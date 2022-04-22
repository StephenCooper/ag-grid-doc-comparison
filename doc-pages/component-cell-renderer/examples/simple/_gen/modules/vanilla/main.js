const columnDefs = [
  { field: 'athlete' },
  { field: 'year' },
  { field: 'gold', cellRenderer: MedalCellRenderer },
  { field: 'silver', cellRenderer: MedalCellRenderer },
  { field: 'bronze', cellRenderer: MedalCellRenderer },
  { field: 'total', minWidth: 175, cellRenderer: TotalValueRenderer },
];

const gridOptions = {
  columnDefs: columnDefs,
  defaultColDef: {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  },
};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', () => {
  const gridDiv = document.querySelector('#myGrid');
  new agGrid.Grid(gridDiv, gridOptions);

  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then((response) => response.json())
    .then((data) => {
      gridOptions.api.setRowData(data);
    });
});
