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

function getValue(inputSelector: string) {
  var text = (document.querySelector(inputSelector) as any).value;
  switch (text) {
    case 'none':
      return;
    case 'tab':
      return '\t';
    default:
      return text;
  }
}

function getParams() {
  return {
    columnSeparator: getValue('#columnSeparator'),
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
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    { field: 'make' },
    { field: 'model' },
    { field: 'price' },
  ]);

  const onBtnExport = useCallback(() => {
    var params = getParams();
    if (params.columnSeparator) {
      alert(
        'NOTE: you are downloading a file with non-standard separators - it may not render correctly in Excel.'
      );
    }
    gridRef.current!.api.exportDataAsCsv(params);
  }, [alert]);

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
            <label>columnSeparator = </label>
            <select id="columnSeparator">
              <option value="none">(default)</option>
              <option value="tab">tab</option>
              <option value="|">bar (|)</option>
            </select>
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
