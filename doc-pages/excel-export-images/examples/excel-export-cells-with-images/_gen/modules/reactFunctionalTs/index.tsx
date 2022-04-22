'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import {
  ColDef,
  ColGroupDef,
  ExcelExportParams,
  Grid,
  GridOptions,
  GridReadyEvent,
} from '@ag-grid-community/core';
import CountryCellRenderer from './countryCellRenderer';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';
import { MenuModule } from '@ag-grid-enterprise/menu';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ExcelExportModule,
  MenuModule,
]);

declare function createBase64FlagsFromResponse(
  response: any,
  countryCodes: any,
  base64flags: any
): any;

const countryCodes: any = {};

const base64flags: any = {};

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>();
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      field: 'country',
      headerName: ' ',
      minWidth: 70,
      width: 70,
      maxWidth: 70,
      cellRenderer: CountryCellRenderer,
      cellRendererParams: {
        base64flags: base64flags,
        countryCodes: countryCodes,
      },
    },
    { field: 'athlete' },
    { field: 'age' },
    { field: 'year' },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      width: 150,
      resizable: true,
    };
  }, []);
  const defaultExcelExportParams = useMemo<ExcelExportParams>(() => {
    return {
      addImageToCell: function (rowIndex, col, value) {
        if (col.getColId() !== 'country') {
          return;
        }
        const countryCode = countryCodes[value];
        return {
          image: {
            id: countryCode,
            base64: base64flags[countryCode],
            imageType: 'png',
            width: 20,
            height: 11,
            position: {
              offsetX: 30,
              offsetY: 5.5,
            },
          },
        };
      },
    };
  }, []);
  const context = useMemo<any>(() => {
    return {
      base64flags: base64flags,
      countryCodes: countryCodes,
    };
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    fetch('https://www.ag-grid.com/example-assets/small-olympic-winners.json')
      .then((data) =>
        createBase64FlagsFromResponse(data, countryCodes, base64flags)
      )
      .then((data) => params.api.setRowData(data));
  }, []);

  const onBtExport = useCallback(() => {
    gridRef.current!.api.exportDataAsExcel();
  }, []);

  return (
    <div style={containerStyle}>
      <div className="container">
        <div>
          <button className="export" onClick={onBtExport}>
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
              defaultExcelExportParams={defaultExcelExportParams}
              context={context}
              onGridReady={onGridReady}
            ></AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
