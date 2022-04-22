'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {
  ColDef,
  ColGroupDef,
  ColumnState,
  Grid,
  GridOptions,
  GridReadyEvent,
  SideBarDef,
} from 'ag-grid-community';

var savedState: ColumnState[];

var savedPivotMode: boolean;

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'athlete', enableRowGroup: true, enablePivot: true },
    { field: 'age', enableValue: true },
    {
      field: 'country',
      enableRowGroup: true,
      enablePivot: true,
      rowGroup: true,
    },
    { field: 'year', enableRowGroup: true, enablePivot: true },
    { field: 'date', enableRowGroup: true, enablePivot: true },
    { field: 'sport', enableRowGroup: true, enablePivot: true, pivot: true },
    { field: 'gold', enableValue: true, aggFunc: 'sum' },
    { field: 'silver', enableValue: true, aggFunc: 'sum' },
    { field: 'bronze', enableValue: true },
    { field: 'total', enableValue: true },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 150,
      filter: true,
      resizable: true,
    };
  }, []);
  const autoGroupColumnDef = useMemo<ColDef>(() => {
    return {
      minWidth: 300,
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: any[]) => setRowData(data));
  }, []);

  const printState = useCallback(() => {
    var state = gridRef.current!.columnApi.getColumnState();
    console.log(state);
  }, []);

  const saveState = useCallback(() => {
    savedState = gridRef.current!.columnApi.getColumnState();
    savedPivotMode = gridRef.current!.columnApi.isPivotMode();
    console.log('column state saved');
  }, []);

  const restoreState = useCallback(() => {
    if (savedState) {
      // Pivot mode must be set first otherwise the columns we're trying to set state for won't exist yet
      gridRef.current!.columnApi.setPivotMode(savedPivotMode);
      gridRef.current!.columnApi.applyColumnState({
        state: savedState,
        applyOrder: true,
      });
      console.log('column state restored');
    } else {
      console.log('no previous column state to restore!');
    }
  }, [savedState]);

  const togglePivotMode = useCallback(() => {
    var pivotMode = gridRef.current!.columnApi.isPivotMode();
    gridRef.current!.columnApi.setPivotMode(!pivotMode);
  }, []);

  const resetState = useCallback(() => {
    gridRef.current!.columnApi.resetColumnState();
    gridRef.current!.columnApi.setPivotMode(false);
    console.log('column state reset');
  }, []);

  return (
    <div style={containerStyle}>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '5px' }}>
          <button onClick={saveState}>Save State</button>
          <button onClick={restoreState}>Restore State</button>
          <button onClick={printState}>Print State</button>
          <button onClick={resetState}>Reset State</button>
          <button onClick={togglePivotMode}>Toggle Pivot Mode</button>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            autoGroupColumnDef={autoGroupColumnDef}
            sideBar={true}
            pivotMode={true}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
