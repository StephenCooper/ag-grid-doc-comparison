'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: 'athlete', minWidth: 150 },
        { field: 'age', minWidth: 70, maxWidth: 90 },
        { field: 'country', minWidth: 130 },
        { field: 'year', minWidth: 70, maxWidth: 90 },
        { field: 'date', minWidth: 120 },
        { field: 'sport', minWidth: 120 },
        { field: 'gold', minWidth: 80 },
        { field: 'silver', minWidth: 80 },
        { field: 'bronze', minWidth: 80 },
        { field: 'total', minWidth: 80 },
      ],
      defaultColDef: {
        resizable: true,
      },
      rowData: null,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => params.api.setRowData(data);

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  onFirstDataRendered = (params) => {
    params.api.sizeColumnsToFit();
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div
          style={{
            height: '100%',
            width: '100%',
          }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            onGridReady={this.onGridReady}
            onFirstDataRendered={this.onFirstDataRendered.bind(this)}
            rowData={this.state.rowData}
          />
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector('#root'));
