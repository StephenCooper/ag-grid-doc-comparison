'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import {
  CellValueChangedEvent,
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  GridReadyEvent,
  ValueParserParams,
} from 'ag-grid-community';

function numberParser(params: ValueParserParams) {
  return Number(params.newValue);
}

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>(getData());
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { headerName: 'Name', field: 'simple' },
    { headerName: 'Bad Number', field: 'numberBad' },
    {
      headerName: 'Good Number',
      field: 'numberGood',
      valueParser: numberParser,
    },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      editable: true,
      resizable: true,
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    gridRef.current!.api.sizeColumnsToFit();
  }, []);

  const onCellValueChanged = useCallback((event: CellValueChangedEvent) => {
    console.log('data after changes is: ', event.data);
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine-dark">
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          onCellValueChanged={onCellValueChanged}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
