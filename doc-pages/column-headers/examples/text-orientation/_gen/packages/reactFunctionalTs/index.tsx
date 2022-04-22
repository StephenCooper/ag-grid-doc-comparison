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
} from 'ag-grid-community';

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>();
  const [columnDefs, setColumnDefs] = useState<(ColDef | ColGroupDef)[]>([
    {
      headerName: 'Athlete Details',
      children: [
        {
          field: 'athlete',
          width: 150,
          suppressSizeToFit: true,
          enableRowGroup: true,
          rowGroupIndex: 0,
        },
        {
          field: 'age',
          width: 90,
          minWidth: 75,
          maxWidth: 100,
          enableRowGroup: true,
        },
        {
          field: 'country',
          width: 120,
          enableRowGroup: true,
        },
        {
          field: 'year',
          width: 90,
          enableRowGroup: true,
          pivotIndex: 0,
        },
        { field: 'sport', width: 110, enableRowGroup: true },
        {
          field: 'gold',
          width: 60,
          enableValue: true,
          suppressMenu: true,
          filter: 'agNumberColumnFilter',
          aggFunc: 'sum',
        },
        {
          field: 'silver',
          width: 60,
          enableValue: true,
          suppressMenu: true,
          filter: 'agNumberColumnFilter',
          aggFunc: 'sum',
        },
        {
          field: 'bronze',
          width: 60,
          enableValue: true,
          suppressMenu: true,
          filter: 'agNumberColumnFilter',
          aggFunc: 'sum',
        },
        {
          field: 'total',
          width: 60,
          enableValue: true,
          suppressMenu: true,
          filter: 'agNumberColumnFilter',
          aggFunc: 'sum',
        },
      ],
    },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      sortable: true,
      resizable: true,
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
          defaultColDef={defaultColDef}
          groupHeaderHeight={75}
          headerHeight={150}
          floatingFiltersHeight={50}
          pivotGroupHeaderHeight={50}
          pivotHeaderHeight={100}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
