'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  SetFilterModule,
  MenuModule,
  ColumnsToolPanelModule,
]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        // set filter
        {
          field: 'athlete',
          filter: 'agSetColumnFilter',
          filterParams: filterParams,
        },
        // number filters
        { field: 'gold', filter: 'agNumberColumnFilter' },
        { field: 'silver', filter: 'agNumberColumnFilter' },
        { field: 'bronze', filter: 'agNumberColumnFilter' },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 200,
        resizable: true,
        floatingFilter: true,
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
    );
  }
}

function replaceAccents(value) {
  return value
    .replace(new RegExp('[àáâãäå]', 'g'), 'a')
    .replace(new RegExp('æ', 'g'), 'ae')
    .replace(new RegExp('ç', 'g'), 'c')
    .replace(new RegExp('[èéêë]', 'g'), 'e')
    .replace(new RegExp('[ìíîï]', 'g'), 'i')
    .replace(new RegExp('ñ', 'g'), 'n')
    .replace(new RegExp('[òóôõøö]', 'g'), 'o')
    .replace(new RegExp('œ', 'g'), 'oe')
    .replace(new RegExp('[ùúûü]', 'g'), 'u')
    .replace(new RegExp('[ýÿ]', 'g'), 'y')
    .replace(new RegExp('\\W', 'g'), '');
}
const filterParams = {
  textFormatter: replaceAccents,
};

render(<GridExample></GridExample>, document.querySelector('#root'));
