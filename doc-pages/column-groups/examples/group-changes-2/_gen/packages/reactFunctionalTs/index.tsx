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

function createNormalColDefs() {
  return [
    {
      headerName: 'Athlete Details',
      headerClass: 'participant-group',
      children: [
        { field: 'athlete', colId: 'athlete' },
        { field: 'country', colId: 'country' },
      ],
    },
    { field: 'age', colId: 'age' },
    {
      headerName: 'Sports Results',
      headerClass: 'medals-group',
      children: [
        { field: 'sport', colId: 'sport' },
        { field: 'gold', colId: 'gold' },
      ],
    },
  ];
}

function createExtraColDefs() {
  return [
    {
      headerName: 'Athlete Details',
      headerClass: 'participant-group',
      children: [
        { field: 'athlete', colId: 'athlete' },
        { field: 'country', colId: 'country' },
        { field: 'region1', colId: 'region1' },
        { field: 'region2', colId: 'region2' },
      ],
    },
    { field: 'age', colId: 'age' },
    { field: 'distance', colId: 'distance' },
    {
      headerName: 'Sports Results',
      headerClass: 'medals-group',
      children: [
        { field: 'sport', colId: 'sport' },
        { field: 'gold', colId: 'gold' },
      ],
    },
  ];
}

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>();
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      resizable: true,
      width: 150,
    };
  }, []);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>(createNormalColDefs());

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: any[]) => setRowData(data));
  }, []);

  const onBtNormalCols = useCallback(() => {
    gridRef.current!.api.setColumnDefs(createNormalColDefs());
  }, []);

  const onBtExtraCols = useCallback(() => {
    gridRef.current!.api.setColumnDefs(createExtraColDefs());
  }, []);

  return (
    <div style={containerStyle}>
      <div className="test-container">
        <div className="test-header">
          <button onClick={onBtNormalCols}>Normal Cols</button>
          <button onClick={onBtExtraCols}>Extra Cols</button>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            defaultColDef={defaultColDef}
            columnDefs={columnDefs}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
