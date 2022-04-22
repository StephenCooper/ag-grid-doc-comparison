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
    { field: 'country', rowGroup: true, enableRowGroup: true },
    { field: 'year', rowGroup: true, enableRowGroup: true, enablePivot: true },
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
      sortable: true,
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

  const onBtNormal = useCallback(() => {
    gridRef.current.columnApi.setPivotMode(false);
    gridRef.current.columnApi.applyColumnState({
      state: [
        { colId: 'country', rowGroup: true },
        { colId: 'year', rowGroup: true },
      ],
      defaultState: {
        pivot: false,
        rowGroup: false,
      },
    });
  }, []);

  const onBtPivotMode = useCallback(() => {
    gridRef.current.columnApi.setPivotMode(true);
    gridRef.current.columnApi.applyColumnState({
      state: [
        { colId: 'country', rowGroup: true },
        { colId: 'year', rowGroup: true },
      ],
      defaultState: {
        pivot: false,
        rowGroup: false,
      },
    });
  }, []);

  const onBtFullPivot = useCallback(() => {
    gridRef.current.columnApi.setPivotMode(true);
    gridRef.current.columnApi.applyColumnState({
      state: [
        { colId: 'country', rowGroup: true },
        { colId: 'year', pivot: true },
      ],
      defaultState: {
        pivot: false,
        rowGroup: false,
      },
    });
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div style={{ marginBottom: '5px' }}>
          <button onClick={onBtNormal}>1 - Grouping Active</button>
          <button onClick={onBtPivotMode}>
            2 - Grouping Active with Pivot Mode
          </button>
          <button onClick={onBtFullPivot}>
            3 - Grouping Active with Pivot Mode and Pivot Active
          </button>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            autoGroupColumnDef={autoGroupColumnDef}
            sideBar={'columns'}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
