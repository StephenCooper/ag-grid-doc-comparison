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
  SideBarDef,
} from 'ag-grid-community';

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>();
  const [columnDefs, setColumnDefs] = useState<(ColDef | ColGroupDef)[]>([
    {
      headerName: ' ',
      headerCheckboxSelection: true,
      checkboxSelection: true,
      floatingFilter: false,
      suppressMenu: true,
      minWidth: 55,
      maxWidth: 55,
      width: 55,
      flex: 0,
      resizable: false,
      sortable: false,
      editable: false,
      filter: false,
      suppressColumnsToolPanel: true,
    },
    {
      headerName: 'Participant',
      children: [
        { field: 'athlete', minWidth: 170 },
        { field: 'country', minWidth: 150 },
      ],
    },
    { field: 'sport' },
    {
      headerName: 'Medals',
      children: [
        {
          field: 'total',
          columnGroupShow: 'closed',
          filter: 'agNumberColumnFilter',
          width: 120,
          flex: 0,
        },
        {
          field: 'gold',
          columnGroupShow: 'open',
          filter: 'agNumberColumnFilter',
          width: 100,
          flex: 0,
        },
        {
          field: 'silver',
          columnGroupShow: 'open',
          filter: 'agNumberColumnFilter',
          width: 100,
          flex: 0,
        },
        {
          field: 'bronze',
          columnGroupShow: 'open',
          filter: 'agNumberColumnFilter',
          width: 100,
          flex: 0,
        },
      ],
    },
    { field: 'year', filter: 'agNumberColumnFilter' },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      editable: true,
      sortable: true,
      minWidth: 100,
      filter: true,
      resizable: true,
      floatingFilter: true,
      flex: 1,
    };
  }, []);
  const sideBar = useMemo<
    SideBarDef | string | string[] | boolean | null
  >(() => {
    return {
      toolPanels: ['columns', 'filters'],
      defaultToolPanel: '',
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: any[]) => setRowData(data));
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          rowSelection={'multiple'}
          suppressRowClickSelection={true}
          defaultColDef={defaultColDef}
          sideBar={sideBar}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
