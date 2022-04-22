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
import CustomHeader from './customHeader';

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'athlete', suppressMenu: true, minWidth: 120 },
    {
      field: 'age',
      sortable: false,
      headerComponentParams: { menuIcon: 'fa-external-link-alt' },
    },
    { field: 'country', suppressMenu: true, minWidth: 120 },
    { field: 'year', sortable: false },
    { field: 'date', suppressMenu: true },
    { field: 'sport', sortable: false },
    {
      field: 'gold',
      headerComponentParams: { menuIcon: 'fa-cog' },
      minWidth: 120,
    },
    { field: 'silver', sortable: false },
    { field: 'bronze', suppressMenu: true, minWidth: 120 },
    { field: 'total', sortable: false },
  ]);
  const components = useMemo<{
    [p: string]: any;
  }>(() => {
    return {
      agColumnHeader: CustomHeader,
    };
  }, []);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      editable: true,
      sortable: true,
      flex: 1,
      minWidth: 100,
      filter: true,
      resizable: true,
      headerComponentParams: {
        menuIcon: 'fa-bars',
      },
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: any[]) => {
        setRowData(data);
      });
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          suppressMenuHide={true}
          components={components}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
