'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import MultilineCellRenderer from './multilineCellRenderer.jsx';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';
import { CsvExportModule } from '@ag-grid-community/csv-export';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  ExcelExportModule,
  CsvExportModule,
]);

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState([
    {
      address:
        '1197 Thunder Wagon Common,\nCataract, RI, \n02987-1016, US, \n(401) 747-0763',
      col1: 'abc',
      col2: 'xyz',
    },
    {
      address:
        '3685 Rocky Glade, Showtucket, NU, \nX1E-9I0, CA, \n(867) 371-4215',
      col1: 'abc',
      col2: 'xyz',
    },
    {
      address:
        '3235 High Forest, Glen Campbell, MS, \n39035-6845, US, \n(601) 638-8186',
      col1: 'abc',
      col2: 'xyz',
    },
    {
      address:
        '2234 Sleepy Pony Mall , Drain, DC, \n20078-4243, US, \n(202) 948-3634',
      col1: 'abc',
      col2: 'xyz',
    },
  ]);
  const [columnDefs, setColumnDefs] = useState([
    { field: 'address' },
    {
      headerName: 'Custom column',
      autoHeight: true,
      valueGetter: (param) => {
        return param.data.col1 + '\n' + param.data.col2;
      },
      cellRenderer: MultilineCellRenderer,
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      cellClass: 'multiline',
      filter: true,
      resizable: true,
      minWidth: 100,
      flex: 1,
    };
  }, []);
  const excelStyles = useMemo(() => {
    return [
      {
        id: 'multiline',
        alignment: {
          wrapText: true,
        },
      },
    ];
  }, []);

  const onBtExport = useCallback(() => {
    gridRef.current.api.exportDataAsExcel();
  }, []);

  return (
    <div style={containerStyle}>
      <div className="container">
        <div>
          <button
            onClick={onBtExport}
            style={{ margin: '5px 0px', fontWeight: 'bold' }}
          >
            Export to Excel
          </button>
        </div>
        <div className="grid-wrapper">
          <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              excelStyles={excelStyles}
            ></AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
