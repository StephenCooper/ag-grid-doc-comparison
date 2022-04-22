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
      columnDefs: [{ field: 'make' }, { field: 'model' }, { field: 'price' }],
      rowData: [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxster', price: 72000 },
      ],
      defaultColDef: {
        editable: true,
        sortable: true,
        resizable: true,
        filter: true,
        flex: 1,
        minWidth: 100,
      },
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

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
            rowData={this.state.rowData}
            alwaysShowHorizontalScroll={true}
            alwaysShowVerticalScroll={true}
            defaultColDef={this.state.defaultColDef}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector('#root'));
