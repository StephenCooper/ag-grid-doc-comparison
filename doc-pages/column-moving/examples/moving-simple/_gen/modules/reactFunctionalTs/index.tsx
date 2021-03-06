'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import {
  ColDef,
  ColGroupDef,
  Column,
  Grid,
  GridOptions,
  GridReadyEvent,
} from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'athlete' },
    { field: 'age' },
    { field: 'country' },
    { field: 'year' },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      width: 150,
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: any[]) => setRowData(data));
  }, []);

  const onMedalsFirst = useCallback(() => {
    gridRef.current!.columnApi.moveColumns(
      ['gold', 'silver', 'bronze', 'total'],
      0
    );
  }, []);

  const onMedalsLast = useCallback(() => {
    gridRef.current!.columnApi.moveColumns(
      ['gold', 'silver', 'bronze', 'total'],
      6
    );
  }, []);

  const onCountryFirst = useCallback(() => {
    gridRef.current!.columnApi.moveColumn('country', 0);
  }, []);

  const onSwapFirstTwo = useCallback(() => {
    gridRef.current!.columnApi.moveColumnByIndex(0, 1);
  }, []);

  const onPrintColumns = useCallback(() => {
    const cols = gridRef.current!.columnApi.getAllGridColumns();
    const colToNameFunc = (col: Column, index: number) =>
      index + ' = ' + col.getId();
    const colNames = cols.map(colToNameFunc).join(', ');
    console.log('columns are: ' + colNames);
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div style={{ marginBottom: '1rem' }}>
          <button onClick={onMedalsFirst}>Medals First</button>
          <button onClick={onMedalsLast}>Medals Last</button>
          <button onClick={onCountryFirst}>Country First</button>
          <button onClick={onSwapFirstTwo}>Swap First Two</button>
          <button onClick={onPrintColumns}>Print Columns</button>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            suppressDragLeaveHidesColumns={true}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
