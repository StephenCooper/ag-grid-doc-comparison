'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {
  CellClassRules,
  ColDef,
  ColGroupDef,
  ColSpanParams,
  Grid,
  GridOptions,
  GridReadyEvent,
  RowHeightParams,
} from 'ag-grid-community';

var cellClassRules: CellClassRules = {
  'header-cell': 'data.section === "big-title"',
  'quarters-cell': 'data.section === "quarters"',
};

function isHeaderRow(params: RowHeightParams | ColSpanParams) {
  return params.data.section === 'big-title';
}

function isQuarterRow(params: ColSpanParams) {
  return params.data.section === 'quarters';
}

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>(getData());
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      headerName: 'Jan',
      field: 'jan',
      colSpan: function (params: ColSpanParams) {
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
      colSpan: function (params: ColSpanParams) {
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
  const getRowHeight = useCallback(function (params: RowHeightParams) {
    if (isHeaderRow(params)) {
      return 60;
    }
  }, []);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      width: 100,
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
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
