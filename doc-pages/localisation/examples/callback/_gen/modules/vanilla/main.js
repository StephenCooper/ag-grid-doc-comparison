class NodeIdRenderer {
  init(params) {
    this.eGui = document.createElement('div');
    this.eGui.innerHTML = params.node.id + 1;
  }

  getGui() {
    return this.eGui;
  }
  refresh() {
    return false;
  }
}

const columnDefs = [
  // this row just shows the row index, doesn't use any data from the row
  {
    headerName: '#',
    cellRenderer: NodeIdRenderer,
  },
  { field: 'athlete', filterParams: { buttons: ['clear', 'reset', 'apply'] } },
  {
    field: 'age',
    filterParams: { buttons: ['apply', 'cancel'] },
    enablePivot: true,
  },
  { field: 'country', enableRowGroup: true },
  { field: 'year', filter: 'agNumberColumnFilter' },
  { field: 'date' },
  {
    field: 'sport',
    filter: 'agMultiColumnFilter',
    filterParams: {
      filters: [
        {
          filter: 'agTextColumnFilter',
          display: 'accordion',
        },
        {
          filter: 'agSetColumnFilter',
          display: 'accordion',
        },
      ],
    },
  },
  { field: 'gold', enableValue: true },
  { field: 'silver', enableValue: true },
  { field: 'bronze', enableValue: true },
  { field: 'total', enableValue: true },
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
  sideBar: true,
  statusBar: {
    statusPanels: [
      { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
      { statusPanel: 'agAggregationComponent' },
    ],
  },
  rowGroupPanelShow: 'always',
  pagination: true,
  paginationPageSize: 500,
  enableRangeSelection: true,
  enableCharts: true,
  getLocaleText: (params) => {
    switch (params.key) {
      case 'thousandSeparator':
        return '.';
      case 'decimalSeparator':
        return ',';
      default:
        return params.defaultValue ? params.defaultValue.toUpperCase() : '';
    }
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
