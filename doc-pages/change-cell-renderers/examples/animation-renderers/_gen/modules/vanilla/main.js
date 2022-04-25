const columnDefs = [
  {
    headerName: 'Editable A',
    field: 'a',
    editable: true,
    valueParser: numberValueParser,
  },
  {
    headerName: 'Editable B',
    field: 'b',
    editable: true,
    valueParser: numberValueParser,
  },
  {
    headerName: 'Editable C',
    field: 'c',
    editable: true,
    valueParser: numberValueParser,
  },
  {
    headerName: 'API D',
    field: 'd',
    minWidth: 140,
    valueParser: numberValueParser,
    cellRenderer: 'agAnimateShowChangeCellRenderer',
  },
  {
    headerName: 'API E',
    field: 'e',
    minWidth: 140,
    valueParser: numberValueParser,
    cellRenderer: 'agAnimateShowChangeCellRenderer',
  },
  {
    headerName: 'Total',
    minWidth: 140,
    valueGetter: 'data.a + data.b + data.c + data.d + data.e',
    cellRenderer: 'agAnimateShowChangeCellRenderer',
  },
  {
    headerName: 'Average',
    minWidth: 140,
    valueGetter: '(data.a + data.b + data.c + data.d + data.e) / 5',
    cellRenderer: 'agAnimateSlideCellRenderer',
  },
];

const gridOptions = {
  columnDefs: columnDefs,
  defaultColDef: {
    flex: 1,
    minWidth: 120,
    resizable: true,
    cellClass: 'align-right',
    valueFormatter: (params) => {
      return formatNumber(params.value);
    },
  },
  rowData: createRowData(),
};

function numberValueParser(params) {
  return Number(params.newValue);
}

function formatNumber(number) {
  // this puts commas into the number eg 1000 goes to 1,000,
  // i pulled this from stack overflow, i have no idea how it works
  return Math.floor(number)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function onUpdateSomeValues() {
  const rowCount = gridOptions.api.getDisplayedRowCount();
  for (let i = 0; i < 10; i++) {
    const row = Math.floor(Math.random() * rowCount);
    const rowNode = gridOptions.api.getDisplayedRowAtIndex(row);
    rowNode.setDataValue('d', Math.floor(Math.random() * 10000));
    rowNode.setDataValue('e', Math.floor(Math.random() * 10000));
  }
}

function createRowData() {
  const rowData = [];

  for (let i = 0; i < 20; i++) {
    rowData.push({
      a: Math.floor(((i + 323) * 25435) % 10000),
      b: Math.floor(((i + 323) * 23221) % 10000),
      c: Math.floor(((i + 323) * 468276) % 10000),
      d: 0,
      e: 0,
    });
  }

  return rowData;
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  const gridDiv = document.querySelector('#myGrid');
  new agGrid.Grid(gridDiv, gridOptions);
  setTimeout(function () {
    gridOptions.api.sizeColumnsToFit();
  }, 200);
});
