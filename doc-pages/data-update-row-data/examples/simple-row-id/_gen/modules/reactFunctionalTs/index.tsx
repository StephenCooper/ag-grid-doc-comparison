'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import {
  ColDef,
  ColGroupDef,
  GetRowIdFunc,
  GetRowIdParams,
  Grid,
  GridOptions,
} from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

// specify the data
var rowDataA = [
  { id: '1', make: 'Toyota', model: 'Celica', price: 35000 },
  { id: '4', make: 'BMW', model: 'M50', price: 60000 },
  { id: '5', make: 'Aston Martin', model: 'DBX', price: 190000 },
];

var rowDataB = [
  { id: '1', make: 'Toyota', model: 'Celica', price: 35000 },
  { id: '2', make: 'Ford', model: 'Mondeo', price: 32000 },
  { id: '3', make: 'Porsche', model: 'Boxster', price: 72000 },
  { id: '4', make: 'BMW', model: 'M50', price: 60000 },
  { id: '5', make: 'Aston Martin', model: 'DBX', price: 190000 },
];

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>(rowDataA);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'make' },
    { field: 'model' },
    { field: 'price' },
  ]);
  const getRowId = useCallback((params: GetRowIdParams) => params.data.id, []);

  const onRowDataA = useCallback(() => {
    gridRef.current!.api.setRowData(rowDataA);
  }, []);

  const onRowDataB = useCallback(() => {
    gridRef.current!.api.setRowData(rowDataB);
  }, []);

  return (
    <div style={containerStyle}>
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ marginBottom: '5px', minHeight: '30px' }}>
          <button onClick={onRowDataA}>Row Data A</button>
          <button onClick={onRowDataB}>Row Data B</button>
        </div>
        <div style={{ flex: '1 1 0px' }}>
          <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              rowSelection={'single'}
              animateRows={true}
              getRowId={getRowId}
            ></AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
