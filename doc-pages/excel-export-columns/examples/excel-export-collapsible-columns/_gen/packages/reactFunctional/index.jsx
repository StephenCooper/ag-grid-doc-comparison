'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const GridExample = () => {
  const gridRef = useRef();
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
  const defaultExcelExportParams = useMemo(() => {
    return {
      allColumns: true,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  const onBtExport = useCallback(() => {
    gridRef.current.api.exportDataAsExcel();
  }, []);

  return (
    <div style={containerStyle}>
      <div className="container">
        <div className="columns">
          <div>
            <button onClick={onBtExport} style={{ fontWeight: 'bold' }}>
              Export to Excel
            </button>
          </div>
        </div>
        <div className="grid-wrapper">
          <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              defaultExcelExportParams={defaultExcelExportParams}
              onGridReady={onGridReady}
            ></AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
