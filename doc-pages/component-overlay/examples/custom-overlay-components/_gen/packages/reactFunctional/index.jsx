'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import CustomLoadingOverlay from './customLoadingOverlay.jsx';
import CustomNoRowsOverlay from './customNoRowsOverlay.jsx';

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: 'athlete', width: 150 },
    { field: 'age', width: 90 },
    { field: 'country', width: 120 },
    { field: 'year', width: 90 },
    { field: 'date', width: 110 },
    { field: 'sport', width: 110 },
    { field: 'gold', width: 100 },
    { field: 'silver', width: 100 },
    { field: 'bronze', width: 100 },
    { field: 'total', width: 100 },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      sortable: true,
      flex: 1,
      minWidth: 100,
      filter: true,
      resizable: true,
    };
  }, []);
  const loadingOverlayComponent = useMemo(() => {
    return CustomLoadingOverlay;
  }, []);
  const loadingOverlayComponentParams = useMemo(() => {
    return {
      loadingMessage: 'One moment please...',
    };
  }, []);
  const noRowsOverlayComponent = useMemo(() => {
    return CustomNoRowsOverlay;
  }, []);
  const noRowsOverlayComponentParams = useMemo(() => {
    return {
      noRowsMessageFunc: () => 'Sorry - no rows! at: ' + new Date(),
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => {
        setRowData(data);
      });
  }, []);

  const onBtShowLoading = useCallback(() => {
    gridRef.current.api.showLoadingOverlay();
  }, []);

  const onBtShowNoRows = useCallback(() => {
    gridRef.current.api.showNoRowsOverlay();
  }, []);

  const onBtHide = useCallback(() => {
    gridRef.current.api.hideOverlay();
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div style={{ marginBottom: '5px' }}>
          <button onClick={onBtShowLoading}>Show Loading Overlay</button>
          <button onClick={onBtShowNoRows}>Show No Rows Overlay</button>
          <button onClick={onBtHide}>Hide Overlay</button>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            loadingOverlayComponent={loadingOverlayComponent}
            loadingOverlayComponentParams={loadingOverlayComponentParams}
            noRowsOverlayComponent={noRowsOverlayComponent}
            noRowsOverlayComponentParams={noRowsOverlayComponentParams}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
