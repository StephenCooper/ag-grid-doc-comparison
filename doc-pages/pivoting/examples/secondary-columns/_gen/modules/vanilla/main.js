function _optionalChain(ops) {
  let lastAccessLHS = undefined;
  let value = ops[0];
  let i = 1;
  while (i < ops.length) {
    const op = ops[i];
    const fn = ops[i + 1];
    i += 2;
    if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) {
      return undefined;
    }
    if (op === 'access' || op === 'optionalAccess') {
      lastAccessLHS = value;
      value = fn(value);
    } else if (op === 'call' || op === 'optionalCall') {
      value = fn((...args) => value.call(lastAccessLHS, ...args));
      lastAccessLHS = undefined;
    }
  }
  return value;
}
const gridOptions = {
  columnDefs: [
    { field: 'country', rowGroup: true, enableRowGroup: true },
    {
      field: 'year',
      pivot: true,
      enablePivot: true,
      pivotComparator: MyYearPivotComparator,
    },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold', aggFunc: 'sum' },
    { field: 'silver', aggFunc: 'sum' },
    { field: 'bronze', aggFunc: 'sum' },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 150,
    filter: true,
    resizable: true,
  },
  autoGroupColumnDef: {
    minWidth: 250,
  },
  pivotMode: true,

  // we don't want the grid putting in 'sum' in the headers for us
  suppressAggFuncInHeader: true,

  // this is a callback that gets called on each column definition
  processSecondaryColDef: (colDef) => {
    if (
      _optionalChain([
        colDef,
        'access',
        (_) => _.pivotValueColumn,
        'optionalAccess',
        (_2) => _2.getId,
        'call',
        (_3) => _3(),
      ]) === 'gold'
    ) {
      colDef.headerName = _optionalChain([
        colDef,
        'access',
        (_4) => _4.headerName,
        'optionalAccess',
        (_5) => _5.toUpperCase,
        'call',
        (_6) => _6(),
      ]);
    }
  },

  // this is a callback that gets called on each group definition
  processSecondaryColGroupDef: (colGroupDef) => {
    // for fun, add a css class for 2010
    if (
      _optionalChain([
        colGroupDef,
        'access',
        (_7) => _7.pivotKeys,
        'optionalAccess',
        (_8) => _8.length,
      ]) &&
      colGroupDef.pivotKeys[0] === '2010'
    ) {
      colGroupDef.headerClass = 'color-background';
    }
    // put 'year' in front of each group
    colGroupDef.headerName = 'Year ' + colGroupDef.headerName;
  },
};

function MyYearPivotComparator(a, b) {
  var requiredOrder = ['2012', '2010', '2008', '2006', '2004', '2002', '2000'];
  return requiredOrder.indexOf(a) - requiredOrder.indexOf(b);
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
  var gridDiv = document.querySelector('#myGrid');
  new agGrid.Grid(gridDiv, gridOptions);

  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then((response) => response.json())
    .then((data) => gridOptions.api.setRowData(data));
});
