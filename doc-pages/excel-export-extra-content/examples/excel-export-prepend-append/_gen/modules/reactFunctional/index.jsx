'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
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

const getRows = () => [
  [],
  [
    {
      data: { value: 'Here is a comma, and a some "quotes".', type: 'String' },
    },
  ],
  [
    {
      data: {
        value:
          'They are visible when the downloaded file is opened in Excel because custom content is properly escaped.',
        type: 'String',
      },
    },
  ],
  [
    { data: { value: 'this cell:', type: 'String' }, mergeAcross: 1 },
    {
      data: {
        value: 'is empty because the first cell has mergeAcross=1',
        type: 'String',
      },
    },
  ],
  [],
];

const getBoolean = (inputSelector) =>
  !!document.querySelector(inputSelector).checked;

const getParams = () => ({
  prependContent: getBoolean('#prependContent') ? getRows() : undefined,
  appendContent: getBoolean('#appendContent') ? getRows() : undefined,
});

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: 'athlete', minWidth: 200 },
    { field: 'country', minWidth: 200 },
    { field: 'sport', minWidth: 150 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      filter: true,
      resizable: true,
      minWidth: 100,
      flex: 1,
    };
  }, []);
  const popupParent = useMemo(() => {
    return document.body;
  }, []);

  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/small-olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => setRowData(data.filter((rec) => rec.country != null)));
  }, []);

  const onBtExport = useCallback(() => {
    gridRef.current.api.exportDataAsExcel(getParams());
  }, []);

  return (
    <div style={containerStyle}>
      <div className="container">
        <div className="columns">
          <label className="option" htmlFor="prependContent">
            <input type="checkbox" id="prependContent" />
            Prepend Content
          </label>
          <label className="option" htmlFor="appendContent">
            <input type="checkbox" id="appendContent" /> Append Content
          </label>
        </div>
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
              popupParent={popupParent}
              onGridReady={onGridReady}
            ></AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
