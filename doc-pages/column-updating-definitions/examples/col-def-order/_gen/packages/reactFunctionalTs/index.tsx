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
  GridReadyEvent,
} from 'ag-grid-community';

function getColumnDefsA() {
  return [
    { field: 'athlete', headerName: 'A Athlete' },
    { field: 'age', headerName: 'A Age' },
    { field: 'country', headerName: 'A Country' },
    { field: 'sport', headerName: 'A Sport' },
    { field: 'year', headerName: 'A Year' },
    { field: 'date', headerName: 'A Date' },
    { field: 'gold', headerName: 'A Gold' },
    { field: 'silver', headerName: 'A Silver' },
    { field: 'bronze', headerName: 'A Bronze' },
    { field: 'total', headerName: 'A Total' },
  ];
}

function getColumnDefsB() {
  return [
    { field: 'gold', headerName: 'B Gold' },
    { field: 'silver', headerName: 'B Silver' },
    { field: 'bronze', headerName: 'B Bronze' },
    { field: 'total', headerName: 'B Total' },
    { field: 'athlete', headerName: 'B Athlete' },
    { field: 'age', headerName: 'B Age' },
    { field: 'country', headerName: 'B Country' },
    { field: 'sport', headerName: 'B Sport' },
    { field: 'year', headerName: 'B Year' },
    { field: 'date', headerName: 'B Date' },
  ];
}

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>();
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      initialWidth: 100,
      sortable: true,
      resizable: true,
      filter: true,
    };
  }, []);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>(getColumnDefsA());

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: any[]) => setRowData(data));
  }, []);

  const setColsA = useCallback(() => {
    gridRef.current!.api.setColumnDefs(getColumnDefsA());
  }, []);

  const setColsB = useCallback(() => {
    gridRef.current!.api.setColumnDefs(getColumnDefsB());
  }, []);

  const clearColDefs = useCallback(() => {
    gridRef.current!.api.setColumnDefs([]);
  }, []);

  return (
    <div style={containerStyle}>
      <div className="test-container">
        <div className="test-header">
          <button onClick={setColsA}>Column Set A</button>
          <button onClick={setColsB}>Column Set B</button>
          <button onClick={clearColDefs}>Clear</button>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            defaultColDef={defaultColDef}
            maintainColumnOrder={true}
            columnDefs={columnDefs}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
