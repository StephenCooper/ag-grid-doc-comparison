'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
} from '@ag-grid-community/core';
import ColourCellRenderer from './colourCellRenderer';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RichSelectModule } from '@ag-grid-enterprise/rich-select';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RichSelectModule]);

const colors = ['Red', 'Green', 'Blue'];

const data = Array.from(Array(20).keys()).map((val: any, index: number) => ({
  color1: colors[index % 3],
  color2: colors[index % 3],
  color3: colors[index % 3],
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
}));

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>(data);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      headerName: 'Text Editor',
      field: 'color1',
      cellRenderer: ColourCellRenderer,
      cellEditor: 'agTextCellEditor',
    },
    {
      headerName: 'Select Editor',
      field: 'color2',
      cellRenderer: ColourCellRenderer,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: colors,
      },
    },
    {
      headerName: 'Rich Select Editor',
      field: 'color3',
      cellRenderer: ColourCellRenderer,
      cellEditor: 'agRichSelectCellEditor',
      cellEditorPopup: true,
      cellEditorParams: {
        values: colors,
        cellRenderer: ColourCellRenderer,
      },
    },
    {
      headerName: 'Large Text Editor',
      field: 'description',
      cellEditorPopup: true,
      cellEditor: 'agLargeTextCellEditor',
      flex: 2,
    },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      resizable: true,
      editable: true,
    };
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
