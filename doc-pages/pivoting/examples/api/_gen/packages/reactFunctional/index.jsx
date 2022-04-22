'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    {
      field: 'athlete',
      enableRowGroup: true,
      enablePivot: true,
      minWidth: 200,
    },
    { field: 'age', enableValue: true },
    { field: 'country', enableRowGroup: true, enablePivot: true },
    { field: 'year', enableRowGroup: true, enablePivot: true },
    { field: 'date', enableRowGroup: true, enablePivot: true },
    { field: 'sport', enableRowGroup: true, enablePivot: true, minWidth: 200 },
    { field: 'gold', enableValue: true, aggFunc: 'sum' },
    { field: 'silver', enableValue: true },
    { field: 'bronze', enableValue: true },
    { field: 'total', enableValue: true },
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

  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  const turnOffPivotMode = useCallback(() => {
    gridRef.current.columnApi.setPivotMode(false);
  }, []);

  const turnOnPivotMode = useCallback(() => {
    gridRef.current.columnApi.setPivotMode(true);
  }, []);

  const addPivotColumn = useCallback(() => {
    gridRef.current.columnApi.applyColumnState({
      state: [{ colId: 'country', pivot: true }],
      defaultState: { pivot: false },
    });
  }, []);

  const addPivotColumns = useCallback(() => {
    gridRef.current.columnApi.applyColumnState({
      state: [
        { colId: 'year', pivot: true },
        { colId: 'country', pivot: true },
      ],
      defaultState: { pivot: false },
    });
  }, []);

  const removePivotColumn = useCallback(() => {
    gridRef.current.columnApi.applyColumnState({
      state: [{ colId: 'country', pivot: false }],
    });
  }, []);

  const emptyPivotColumns = useCallback(() => {
    gridRef.current.columnApi.applyColumnState({
      defaultState: { pivot: false },
    });
  }, []);

  const exportToCsv = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);

  return (
    <div style={containerStyle}>
      <div style={{ marginBottom: '5px' }}>
        <div>
          <button onClick={turnOnPivotMode}>Pivot Mode On</button>
          <button onClick={turnOffPivotMode}>Pivot Mode Off</button>
          <button onClick={addPivotColumn} style={{ marginLeft: '15px' }}>
            Pivot Country
          </button>
          <button onClick={addPivotColumns}>Pivot Year &amp; Country</button>
          <button onClick={removePivotColumn}>Un-Pivot Country</button>
        </div>
        <div style={{ marginTop: '5px' }}>
          <button onClick={emptyPivotColumns}>Remove All Pivots</button>
          <button onClick={exportToCsv} style={{ marginLeft: '15px' }}>
            CSV Export
          </button>
        </div>
      </div>
      <div style={{ height: 'calc(100% - 60px)' }}>
        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            autoGroupColumnDef={autoGroupColumnDef}
            sideBar={true}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
