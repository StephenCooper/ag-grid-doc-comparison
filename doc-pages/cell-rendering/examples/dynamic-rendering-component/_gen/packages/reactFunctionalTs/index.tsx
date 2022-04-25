'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {
  CellEditingStartedEvent,
  CellEditingStoppedEvent,
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  ICellRendererParams,
  RowEditingStartedEvent,
  RowEditingStoppedEvent,
} from 'ag-grid-community';
import GenderRenderer from './genderRenderer';
import MoodRenderer from './moodRenderer';

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>([
    { value: 14, type: 'age' },
    { value: 'female', type: 'gender' },
    { value: 'Happy', type: 'mood' },
    { value: 21, type: 'age' },
    { value: 'male', type: 'gender' },
    { value: 'Sad', type: 'mood' },
  ]);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'value' },
    {
      headerName: 'Rendered Value',
      field: 'value',
      cellRendererSelector: (params: ICellRendererParams) => {
        const moodDetails = {
          component: MoodRenderer,
        };
        const genderDetails = {
          component: GenderRenderer,
          params: { values: ['Male', 'Female'] },
        };
        if (params.data.type === 'gender') return genderDetails;
        else if (params.data.type === 'mood') return moodDetails;
        else return undefined;
      },
    },
    { field: 'type' },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
    };
  }, []);

  const onRowEditingStarted = useCallback((event: RowEditingStartedEvent) => {
    console.log('never called - not doing row editing');
  }, []);

  const onRowEditingStopped = useCallback((event: RowEditingStoppedEvent) => {
    console.log('never called - not doing row editing');
  }, []);

  const onCellEditingStarted = useCallback((event: CellEditingStartedEvent) => {
    console.log('cellEditingStarted');
  }, []);

  const onCellEditingStopped = useCallback((event: CellEditingStoppedEvent) => {
    console.log('cellEditingStopped');
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onRowEditingStarted={onRowEditingStarted}
          onRowEditingStopped={onRowEditingStopped}
          onCellEditingStarted={onCellEditingStarted}
          onCellEditingStopped={onCellEditingStopped}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
