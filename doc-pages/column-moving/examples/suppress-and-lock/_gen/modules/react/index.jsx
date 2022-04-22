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
          field: 'athlete',
          suppressMovable: true,
          cellClass: 'suppress-movable-col',
        },
        { field: 'age', lockPosition: 'left', cellClass: 'locked-col' },
        { field: 'country' },
        { field: 'year' },
        { field: 'total', lockPosition: 'right', cellClass: 'locked-col' },
      ],
      defaultColDef: {
        flex: 1,
        lockPinned: true, // Dont allow pinning for this example
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
        <div className="wrapper">
          <div className="legend-bar">
            <span className="legend-box locked-col"></span> Position Locked
            Column &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="legend-box suppress-movable-col"></span> Suppress
            Movable Column
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
              suppressDragLeaveHidesColumns={true}
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
