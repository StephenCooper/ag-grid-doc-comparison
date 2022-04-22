'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import { ColDef, ColGroupDef, Grid, GridOptions } from 'ag-grid-community';

function getRowData() {
  var rowData = [];
  for (var i = 1; i <= 20; i++) {
    rowData.push({
      group: i < 5 ? 'A' : 'B',
      a: (i * 863) % 100,
      b: (i * 811) % 100,
      c: (i * 743) % 100,
      d: (i * 677) % 100,
      e: (i * 619) % 100,
      f: (i * 571) % 100,
    });
  }
  return rowData;
}

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>(getRowData());
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'a', type: 'valueColumn' },
    { field: 'b', type: 'valueColumn' },
    { field: 'c', type: 'valueColumn' },
    { field: 'd', type: 'valueColumn' },
    { field: 'e', type: 'valueColumn' },
    { field: 'f', type: 'valueColumn' },
    {
      headerName: 'Total',
      valueGetter: 'data.a + data.b + data.c + data.d + data.e + data.f',
      editable: false,
      cellClass: 'total-col',
    },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      sortable: true,
    };
  }, []);
  const columnTypes = useMemo<{
    [key: string]: ColDef;
  }>(() => {
    return {
      valueColumn: {
        editable: true,
        valueParser: 'Number(newValue)',
        filter: 'agNumberColumnFilter',
      },
    };
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine-dark">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          columnTypes={columnTypes}
          groupDefaultExpanded={1}
          suppressAggFuncInHeader={true}
          enableCellChangeFlash={true}
          animateRows={true}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
