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
  GridReadyEvent,
  ProcessCellForExportParams,
  ProcessGroupHeaderForExportParams,
  ProcessHeaderForExportParams,
} from 'ag-grid-community';

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>();
  const [columnDefs, setColumnDefs] = useState<(ColDef | ColGroupDef)[]>([
    {
      headerName: 'Participants',
      children: [
        { field: 'athlete', headerName: 'Athlete Name', minWidth: 200 },
        { field: 'age' },
        { field: 'country', minWidth: 150 },
      ],
    },
    {
      headerName: 'Olympic Games',
      children: [
        { field: 'year' },
        { field: 'date', minWidth: 150 },
        { field: 'sport', minWidth: 150 },
        { field: 'gold' },
        { field: 'silver', suppressPaste: true },
        { field: 'bronze' },
        { field: 'total' },
      ],
    },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      editable: true,
      flex: 1,
      minWidth: 100,
      resizable: true,
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: any[]) => setRowData(data));
  }, []);

  const processCellForClipboard = useCallback(
    (params: ProcessCellForExportParams) => {
      return 'C-' + params.value;
    },
    []
  );

  const processHeaderForClipboard = useCallback(
    (params: ProcessHeaderForExportParams) => {
      const colDef = params.column.getColDef();
      let headerName = colDef.headerName || colDef.field || '';
      if (colDef.headerName !== '') {
        headerName = headerName.charAt(0).toUpperCase() + headerName.slice(1);
      }
      return 'H-' + headerName;
    },
    []
  );

  const processGroupHeaderForClipboard = useCallback(
    (params: ProcessGroupHeaderForExportParams) => {
      const colGroupDef = params.columnGroup.getColGroupDef() || ({} as any);
      const headerName = colGroupDef.headerName || '';
      if (headerName === '') {
        return '';
      }
      return 'GH-' + headerName;
    },
    []
  );

  const processCellFromClipboard = useCallback(
    (params: ProcessCellForExportParams) => {
      return 'Z-' + params.value;
    },
    []
  );

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          enableRangeSelection={true}
          rowSelection={'multiple'}
          processCellForClipboard={processCellForClipboard}
          processHeaderForClipboard={processHeaderForClipboard}
          processGroupHeaderForClipboard={processGroupHeaderForClipboard}
          processCellFromClipboard={processCellFromClipboard}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
