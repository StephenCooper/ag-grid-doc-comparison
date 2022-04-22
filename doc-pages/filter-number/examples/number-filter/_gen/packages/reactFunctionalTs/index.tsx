'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  INumberFilterParams,
  ValueFormatterParams,
} from 'ag-grid-community';

var numberValueFormatter = function (params: ValueFormatterParams) {
  return params.value.toFixed(2);
};

var saleFilterParams = {
  allowedCharPattern: '\\d\\-\\,\\$',
  numberParser: (text: string | null) => {
    return text == null
      ? null
      : parseFloat(text.replace(',', '.').replace('$', ''));
  },
};

var saleValueFormatter = function (params: ValueFormatterParams) {
  var formatted = params.value.toFixed(2).replace('.', ',');
  if (formatted.indexOf('-') === 0) {
    return '-$' + formatted.slice(1);
  }
  return '$' + formatted;
};

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>(getData());
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      field: 'sale',
      headerName: 'Sale ($)',
      filter: 'agNumberColumnFilter',
      floatingFilter: true,
      valueFormatter: numberValueFormatter,
    },
    {
      field: 'sale',
      headerName: 'Sale',
      filter: 'agNumberColumnFilter',
      floatingFilter: true,
      filterParams: saleFilterParams,
      valueFormatter: saleValueFormatter,
    },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 150,
    };
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
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
