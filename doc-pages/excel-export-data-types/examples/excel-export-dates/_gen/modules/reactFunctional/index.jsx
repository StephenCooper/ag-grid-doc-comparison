'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { CsvExportModule } from '@ag-grid-community/csv-export';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';
import { MenuModule } from '@ag-grid-enterprise/menu';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  CsvExportModule,
  ExcelExportModule,
  MenuModule,
]);

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState([
    { date: '2020-05-30T10:01:00' },
    { date: '2015-04-21T16:30:00' },
    { date: '2010-02-19T12:02:00' },
    { date: '1995-10-04T03:27:00' },
  ]);
  const [columnDefs, setColumnDefs] = useState([
    {
      field: 'date',
      headerName: 'ISO Format',
      cellClass: 'dateISO',
      minWidth: 150,
    },
    {
      field: 'date',
      headerName: 'dd/mm/yy',
      cellClass: 'dateUK',
      valueFormatter: (params) => {
        var date = new Date(params.value);
        var day = date.getDate().toString().padStart(2, '0');
        var month = (date.getMonth() + 1).toString().padStart(2, '0');
        var year = date.getFullYear().toString().substring(2);
        return day + '/' + month + '/' + year;
      },
    },
    {
      field: 'date',
      headerName: 'mm/dd/yy',
      cellClass: 'dateUS',
      valueFormatter: (params) => {
        var date = new Date(params.value);
        var day = date.getDate().toString().padStart(2, '0');
        var month = (date.getMonth() + 1).toString().padStart(2, '0');
        var year = date.getFullYear().toString().substring(2);
        return month + '/' + day + '/' + year;
      },
    },
    {
      field: 'date',
      headerName: 'dd/mm/yyy h:mm:ss AM/PM',
      cellClass: 'dateLong',
      minWidth: 150,
      valueFormatter: (params) => {
        var date = new Date(params.value);
        var day = date.getDate().toString().padStart(2, '0');
        var month = (date.getMonth() + 1).toString().padStart(2, '0');
        var year = date.getFullYear().toString();
        var hourNum = date.getHours() % 12;
        var hour = (hourNum === 0 ? 12 : hourNum).toString().padStart(2, '0');
        var min = date.getMinutes().toString().padStart(2, '0');
        var sec = date.getSeconds().toString().padStart(2, '0');
        var amPM = date.getHours() < 12 ? 'AM' : 'PM';
        return (
          day +
          '/' +
          month +
          '/' +
          year +
          ' ' +
          hour +
          ':' +
          min +
          ':' +
          sec +
          ' ' +
          amPM
        );
      },
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      resizable: true,
    };
  }, []);
  const excelStyles = useMemo(() => {
    return [
      {
        id: 'dateISO',
        dataType: 'DateTime',
        numberFormat: {
          format: 'yyy-mm-ddThh:mm:ss',
        },
      },
      {
        id: 'dateUK',
        dataType: 'DateTime',
        numberFormat: {
          format: 'dd/mm/yy',
        },
      },
      {
        id: 'dateUS',
        dataType: 'DateTime',
        numberFormat: {
          format: 'mm/dd/yy',
        },
      },
      {
        id: 'dateLong',
        dataType: 'DateTime',
        numberFormat: {
          format: 'dd/mm/yyy h:mm:ss AM/PM',
        },
      },
    ];
  }, []);

  const onBtnExportDataAsExcel = useCallback(() => {
    gridRef.current.api.exportDataAsExcel();
  }, []);

  return (
    <div style={containerStyle}>
      <div className="page-wrapper">
        <div>
          <button
            onClick={onBtnExportDataAsExcel}
            style={{ marginBottom: '5px', fontWeight: 'bold' }}
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
