'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import {
  ColDef,
  ColGroupDef,
  ExcelStyle,
  Grid,
  GridOptions,
} from '@ag-grid-community/core';
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
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>([
    {
      rawValue: 1,
      negativeValue: -10,
      dateValue: '2009-04-20T00:00:00.000',
    },
  ]);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { headerName: 'provided', field: 'rawValue' },
    { headerName: 'number', field: 'rawValue', cellClass: 'numberType' },
    { headerName: 'currency', field: 'rawValue', cellClass: 'currencyFormat' },
    { headerName: 'boolean', field: 'rawValue', cellClass: 'booleanType' },
    {
      headerName: 'Negative',
      field: 'negativeValue',
      cellClass: 'negativeInBrackets',
    },
    { headerName: 'string', field: 'rawValue', cellClass: 'stringType' },
    {
      headerName: 'Date',
      field: 'dateValue',
      cellClass: 'dateType',
      minWidth: 220,
    },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 100,
      resizable: true,
    };
  }, []);
  const excelStyles = useMemo<ExcelStyle[]>(() => {
    return [
      {
        id: 'numberType',
        numberFormat: {
          format: '0',
        },
      },
      {
        id: 'currencyFormat',
        numberFormat: {
          format: '#,##0.00 €',
        },
      },
      {
        id: 'negativeInBrackets',
        numberFormat: {
          format: '$[blue] #,##0;$ [red](#,##0)',
        },
      },
      {
        id: 'booleanType',
        dataType: 'Boolean',
      },
      {
        id: 'stringType',
        dataType: 'String',
      },
      {
        id: 'dateType',
        dataType: 'DateTime',
      },
    ];
  }, []);
  const popupParent = useMemo<HTMLElement>(() => {
    return document.body;
  }, []);

  const onBtExport = useCallback(() => {
    gridRef.current!.api.exportDataAsExcel();
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div className="example-header">
          <button onClick={onBtExport} style={{ fontWeight: 'bold' }}>
            Export to Excel
          </button>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            excelStyles={excelStyles}
            popupParent={popupParent}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
