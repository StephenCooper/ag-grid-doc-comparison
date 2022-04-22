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
  Grid,
  GridOptions,
  ICellRendererComp,
  ICellRendererParams,
  KeyCreatorParams,
} from 'ag-grid-community';
import GenderRenderer from './genderRenderer';
import MoodEditor from './moodEditor';
import MoodRenderer from './moodRenderer';
import NumericEditor from './numericEditor';

class CountryCellRenderer implements ICellRendererComp {
  eGui!: HTMLElement;

  init(params: ICellRendererParams) {
    this.eGui = document.createElement('div');
    this.eGui.innerHTML = `${params.value.name}`;
  }

  getGui() {
    return this.eGui;
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }
}

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>(getData());
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      field: 'first_name',
      headerName: 'First Name',
      width: 120,
      editable: true,
    },
    { field: 'last_name', headerName: 'Last Name', width: 120, editable: true },
    {
      field: 'gender',
      width: 100,
      editable: true,
      cellRenderer: GenderRenderer,
      cellEditor: 'agRichSelectCellEditor',
      cellEditorPopup: true,
      cellEditorParams: {
        cellRenderer: GenderRenderer,
        values: ['Male', 'Female'],
      },
    },
    {
      field: 'age',
      width: 80,
      editable: true,
      cellEditor: NumericEditor,
      cellEditorPopup: true,
    },
    {
      field: 'mood',
      width: 100,
      cellRenderer: MoodRenderer,
      cellEditor: MoodEditor,
      cellEditorPopup: true,
      editable: true,
    },
    {
      field: 'country',
      width: 110,
      cellEditor: 'agRichSelectCellEditor',
      cellEditorPopup: true,
      cellRenderer: CountryCellRenderer,
      keyCreator: function (params: KeyCreatorParams) {
        return params.value.name;
      },
      cellEditorParams: {
        cellRenderer: CountryCellRenderer,
        values: [
          { name: 'Ireland', code: 'IE' },
          { name: 'UK', code: 'UK' },
          { name: 'France', code: 'FR' },
        ],
      },
      editable: true,
    },
    {
      field: 'address',
      editable: true,
      cellEditor: 'agLargeTextCellEditor',
      cellEditorPopup: true,
      cellEditorParams: {
        maxLength: '300',
        cols: '50',
        rows: '6',
      },
    },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      editable: true,
      sortable: true,
      flex: 1,
      minWidth: 100,
      filter: true,
      resizable: true,
    };
  }, []);

  const onRowEditingStarted = useCallback((event) => {
    console.log('never called - not doing row editing');
  }, []);

  const onRowEditingStopped = useCallback((event) => {
    console.log('never called - not doing row editing');
  }, []);

  const onCellEditingStarted = useCallback((event) => {
    console.log('cellEditingStarted');
  }, []);

  const onCellEditingStopped = useCallback((event) => {
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
