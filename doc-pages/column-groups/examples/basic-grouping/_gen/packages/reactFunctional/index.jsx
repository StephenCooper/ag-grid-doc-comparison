'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: 'Athlete Details',
      children: [
        {
          field: 'athlete',
          width: 180,
          filter: 'agTextColumnFilter',
        },
        {
          field: 'age',
          width: 90,
          filter: 'agNumberColumnFilter',
        },
        { headerName: 'Country', field: 'country', width: 140 },
      ],
    },
    {
      headerName: 'Sports Results',
      children: [
        { field: 'sport', width: 140 },
        {
          columnGroupShow: 'closed',
          field: 'total',
          width: 100,
          filter: 'agNumberColumnFilter',
        },
        {
          columnGroupShow: 'open',
          field: 'gold',
          width: 100,
          filter: 'agNumberColumnFilter',
        },
        {
          columnGroupShow: 'open',
          field: 'silver',
          width: 100,
          filter: 'agNumberColumnFilter',
        },
        {
          columnGroupShow: 'open',
          field: 'bronze',
          width: 100,
          filter: 'agNumberColumnFilter',
        },
      ],
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      resizable: true,
      filter: true,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
