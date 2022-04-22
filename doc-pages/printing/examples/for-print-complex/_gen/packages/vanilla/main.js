const columnDefs = [
  { field: 'group', rowGroup: true, hide: true },
  { field: 'id', pinned: 'left', width: 70 },
  { field: 'model', width: 180 },
  { field: 'color', width: 100 },
  {
    field: 'price',
    valueFormatter: "'$' + value.toLocaleString()",
    width: 100,
  },
  { field: 'year', width: 100 },
  { field: 'country', width: 120 },
];

const gridOptions = {
  defaultColDef: {
    sortable: true,
  },
  columnDefs: columnDefs,
  rowData: getData(),
  animateRows: true,
  groupDisplayType: 'groupRows',
  onFirstDataRendered: onFirstDataRendered,
};

function onFirstDataRendered(params) {
  params.api.expandAll();
}

function onBtPrint() {
  const api = gridOptions.api;

  setPrinterFriendly(api);

  setTimeout(function () {
    print();
    setNormal(api);
  }, 2000);
}

function setPrinterFriendly(api) {
  const eGridDiv = document.querySelector('#myGrid');
  eGridDiv.style.height = '';
  api.setDomLayout('print');
}

function setNormal(api) {
  const eGridDiv = document.querySelector('#myGrid');
  eGridDiv.style.width = '700px';
  eGridDiv.style.height = '200px';

  api.setDomLayout();
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', () => {
  const gridDiv = document.querySelector('#myGrid');
  new agGrid.Grid(gridDiv, gridOptions);
});
