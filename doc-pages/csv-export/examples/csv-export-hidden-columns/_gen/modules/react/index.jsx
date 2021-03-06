'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
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

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      defaultColDef: {
        editable: true,
        resizable: true,
        minWidth: 100,
        flex: 1,
      },
      popupParent: document.body,
      columnDefs: [
        { field: 'athlete' },
        { field: 'country' },
        { field: 'sport' },
        { field: 'gold', hide: true },
        { field: 'silver', hide: true },
        { field: 'bronze', hide: true },
        { field: 'total' },
      ],
      rowData: getData(),
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  onBtnExport = () => {
    this.gridApi.exportDataAsCsv(getParams());
  };

  onBtnUpdate = () => {
    document.querySelector('#csvResult').value = this.gridApi.getDataAsCsv(
      getParams()
    );
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div
          style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        >
          <div style={{ display: 'flex' }}>
            <div className="row">
              <label for="allColumns">
                <input id="allColumns" type="checkbox" />
                All Columns
              </label>
            </div>
          </div>
          <div style={{ margin: '10px 0' }}>
            <button onClick={() => this.onBtnUpdate()}>
              Show CSV export content text
            </button>
            <button onClick={() => this.onBtnExport()}>
              Download CSV export file
            </button>
          </div>
          <div style={{ flex: '1 1 0px', position: 'relative' }}>
            <div id="gridContainer">
              <div
                style={{
                  height: '100%',
                  width: '100%',
                }}
                className="ag-theme-alpine"
              >
                <AgGridReact
                  defaultColDef={this.state.defaultColDef}
                  suppressExcelExport={true}
                  popupParent={this.state.popupParent}
                  columnDefs={this.state.columnDefs}
                  rowData={this.state.rowData}
                  onGridReady={this.onGridReady}
                />
              </div>
            </div>
            <textarea id="csvResult">
              Click the Show CSV export content button to view exported CSV here
            </textarea>
          </div>
        </div>
      </div>
    );
  }
}

function getBoolean(id) {
  var field = document.querySelector('#' + id);
  return !!field.checked;
}
function getParams() {
  return {
    allColumns: getBoolean('allColumns'),
  };
}

render(<GridExample></GridExample>, document.querySelector('#root'));
