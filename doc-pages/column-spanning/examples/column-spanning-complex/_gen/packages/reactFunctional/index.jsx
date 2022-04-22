'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

var cellClassRules = {
  'header-cell': 'data.section === "big-title"',
  'quarters-cell': 'data.section === "quarters"',
};

const isHeaderRow = (params) => {
  return params.data.section === 'big-title';
};

const isQuarterRow = (params) => {
  return params.data.section === 'quarters';
};

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState(getData());
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: 'Jan',
      field: 'jan',
      colSpan: function (params) {
        if (isHeaderRow(params)) {
          return 6;
        } else if (isQuarterRow(params)) {
          return 3;
        } else {
          return 1;
        }
      },
      cellClassRules: cellClassRules,
    },
    { headerName: 'Feb', field: 'feb' },
    { headerName: 'Mar', field: 'mar' },
    {
      headerName: 'Apr',
      field: 'apr',
      colSpan: function (params) {
        if (isQuarterRow(params)) {
          return 3;
        } else {
          return 1;
        }
      },
      cellClassRules: cellClassRules,
    },
    { headerName: 'May', field: 'may' },
    { headerName: 'Jun', field: 'jun' },
  ]);
  const getRowHeight = useCallback(function (params) {
    if (isHeaderRow(params)) {
      return 60;
    }
  }, []);
  const defaultColDef = useMemo(() => {
    return {
      width: 100,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    params.api.sizeColumnsToFit();
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          getRowHeight={getRowHeight}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
