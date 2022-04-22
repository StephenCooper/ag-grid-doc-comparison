'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const _optionalChain = (ops) => {
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
};

const MyYearPivotComparator = (a, b) => {
  var requiredOrder = ['2012', '2010', '2008', '2006', '2004', '2002', '2000'];
  return requiredOrder.indexOf(a) - requiredOrder.indexOf(b);
};

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
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
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 150,
      filter: true,
      resizable: true,
    };
  }, []);
  const autoGroupColumnDef = useMemo(() => {
    return {
      minWidth: 250,
    };
  }, []);
  const processSecondaryColDef = useCallback(function (colDef) {
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
  }, []);
  const processSecondaryColGroupDef = useCallback(function (colGroupDef) {
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
  }, []);

  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          autoGroupColumnDef={autoGroupColumnDef}
          pivotMode={true}
          suppressAggFuncInHeader={true}
          processSecondaryColDef={processSecondaryColDef}
          processSecondaryColGroupDef={processSecondaryColGroupDef}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
