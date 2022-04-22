'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  GridReadyEvent,
} from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { CsvExportModule } from '@ag-grid-community/csv-export';
import { MenuModule } from '@ag-grid-enterprise/menu';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  CsvExportModule,
  MenuModule,
]);

function getBoolean(id: string) {
  var field = document.querySelector('#' + id) as HTMLInputElement;
  return !!field.checked;
}

function getParams() {
  return {
    skipColumnGroupHeaders: getBoolean('columnGroups'),
    skipColumnHeaders: getBoolean('skipHeader'),
  };
}

const GridExample = () => {
  const gridRef = useRef<AgGridReact>(null);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState<any[]>([
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      editable: true,
      resizable: true,
      minWidth: 100,
      flex: 1,
    };
  }, []);
  const popupParent = useMemo<HTMLElement>(() => {
    return document.body;
  }, []);
  const [columnDefs, setColumnDefs] = useState<(ColDef | ColGroupDef)[]>([
    { headerName: 'Brand', children: [{ field: 'make' }, { field: 'model' }] },
    {
      headerName: 'Value',
      children: [{ field: 'price' }],
    },
  ]);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    (document.getElementById(
      'columnGroups'
    ) as HTMLInputElement).checked = true;
  }, []);

  const onBtnExport = useCallback(() => {
    gridRef.current!.api.exportDataAsCsv(getParams());
  }, []);

  const onBtnUpdate = useCallback(() => {
    (document.querySelector(
      '#csvResult'
    ) as any).value = gridRef.current!.api.getDataAsCsv(getParams());
  }, []);

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ display: 'flex' }}>
          <div className="row">
            <label htmlFor="columnGroups">
              <input id="columnGroups" type="checkbox" />
              Skip Column Group Headers
            </label>
            <label htmlFor="skipHeader">
              <input id="skipHeader" type="checkbox" />
              Skip Column Headers
            </label>
          </div>
        </div>

        <div style={{ margin: '10px 0' }}>
          <button onClick={onBtnUpdate}>Show CSV export content text</button>
          <button onClick={onBtnExport}>Download CSV export file</button>
        </div>

        <div style={{ flex: '1 1 0px', position: 'relative' }}>
          <div id="gridContainer">
            <div style={gridStyle} className="ag-theme-alpine">
              <AgGridReact
                ref={gridRef}
                rowData={rowData}
                defaultColDef={defaultColDef}
                suppressExcelExport={true}
                popupParent={popupParent}
                columnDefs={columnDefs}
                onGridReady={onGridReady}
              ></AgGridReact>
            </div>
          </div>
          <textarea id="csvResult">
            Click the Show CSV export content button to view exported CSV here
          </textarea>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
