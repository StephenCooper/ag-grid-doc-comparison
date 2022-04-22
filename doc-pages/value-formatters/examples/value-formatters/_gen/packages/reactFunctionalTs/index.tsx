'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  ValueFormatterParams,
} from 'ag-grid-community';

function bracketsFormatter(params: ValueFormatterParams) {
  return '(' + params.value + ')';
}

function currencyFormatter(params: ValueFormatterParams) {
  return '£' + formatNumber(params.value);
}

function formatNumber(number: number) {
  // this puts commas into the number eg 1000 goes to 1,000,
  // i pulled this from stack overflow, i have no idea how it works
  return Math.floor(number)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function createRowData() {
  var rowData = [];
  for (var i = 0; i < 100; i++) {
    rowData.push({
      a: Math.floor(((i + 2) * 173456) % 10000),
      b: Math.floor(((i + 7) * 373456) % 10000),
    });
  }
  return rowData;
}

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>(createRowData());
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { headerName: 'A', field: 'a' },
    { headerName: 'B', field: 'b' },
    { headerName: '£A', field: 'a', valueFormatter: currencyFormatter },
    { headerName: '£B', field: 'b', valueFormatter: currencyFormatter },
    { headerName: '(A)', field: 'a', valueFormatter: bracketsFormatter },
    { headerName: '(B)', field: 'b', valueFormatter: bracketsFormatter },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      cellClass: 'number-cell',
      resizable: true,
    };
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine-dark">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
