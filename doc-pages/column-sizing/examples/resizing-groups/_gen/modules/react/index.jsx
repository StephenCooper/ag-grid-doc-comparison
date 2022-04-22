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
        {
          headerName: 'Everything Resizes',
          children: [
            {
              field: 'athlete',
              headerClass: 'resizable-header',
            },
            { field: 'age', headerClass: 'resizable-header' },
            {
              field: 'country',
              headerClass: 'resizable-header',
            },
          ],
        },
        {
          headerName: 'Only Year Resizes',
          children: [
            { field: 'year', headerClass: 'resizable-header' },
            {
              field: 'date',
              resizable: false,
              headerClass: 'fixed-size-header',
            },
            {
              field: 'sport',
              resizable: false,
              headerClass: 'fixed-size-header',
            },
          ],
        },
        {
          headerName: 'Nothing Resizes',
          children: [
            {
              field: 'gold',
              resizable: false,
              headerClass: 'fixed-size-header',
            },
            {
              field: 'silver',
              resizable: false,
              headerClass: 'fixed-size-header',
            },
            {
              field: 'bronze',
              resizable: false,
              headerClass: 'fixed-size-header',
            },
            {
              field: 'total',
              resizable: false,
              headerClass: 'fixed-size-header',
            },
          ],
        },
      ],
      defaultColDef: {
        width: 150,
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

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="example-wrapper">
          <div className="legend-bar">
            <span className="legend-box resizable-header"></span> Resizable
            Column &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="legend-box fixed-size-header"></span> Fixed Width
            Column
          </div>
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
              rowData={this.state.rowData}
            />
          </div>
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector('#root'));
