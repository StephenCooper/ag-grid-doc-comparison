'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const rowSpan = (params) => {
  if (params.data.show) {
    return 4;
  } else {
    return 1;
  }
};

class ShowCellRenderer {
  init(params) {
    const cellBlank = !params.value;
    if (cellBlank) {
      return;
    }

    this.ui = document.createElement('div');
    this.ui.innerHTML =
      '<div class="show-name">' +
      params.value.name +
      '' +
      '</div>' +
      '<div class="show-presenter">' +
      params.value.presenter +
      '</div>';
  }

  getGui() {
    return this.ui;
  }

  refresh() {
    return false;
  }
}

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState(getData());
  const [columnDefs, setColumnDefs] = useState([
    { field: 'localTime' },
    {
      field: 'show',
      cellRenderer: ShowCellRenderer,
      rowSpan: rowSpan,
      cellClassRules: {
        'show-cell': 'value !== undefined',
      },
      width: 200,
    },
    { field: 'a' },
    { field: 'b' },
    { field: 'c' },
    { field: 'd' },
    { field: 'e' },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      resizable: true,
      width: 170,
    };
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          suppressRowTransform={true}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
