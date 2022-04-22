'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: 'athlete', rowDrag: true },
    { field: 'country' },
    { field: 'year', width: 100 },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      width: 170,
      sortable: true,
      filter: true,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  const onRowDragEnter = useCallback((e) => {
    console.log('onRowDragEnter', e);
  }, []);

  const onRowDragEnd = useCallback((e) => {
    console.log('onRowDragEnd', e);
  }, []);

  const onRowDragMove = useCallback((e) => {
    console.log('onRowDragMove', e);
  }, []);

  const onRowDragLeave = useCallback((e) => {
    console.log('onRowDragLeave', e);
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div className="example-header" style={{ background: '#ffdddd' }}>
          Rows in this example do not move, only events are fired
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            animateRows={true}
            onGridReady={onGridReady}
            onRowDragEnter={onRowDragEnter}
            onRowDragEnd={onRowDragEnd}
            onRowDragMove={onRowDragMove}
            onRowDragLeave={onRowDragLeave}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
