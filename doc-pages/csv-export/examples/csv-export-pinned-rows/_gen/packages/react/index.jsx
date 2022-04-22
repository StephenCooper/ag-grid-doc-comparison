'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

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
      columnDefs: [{ field: 'make' }, { field: 'model' }, { field: 'price' }],
      pinnedTopRowData: [{ make: 'Top Make', model: 'Top Model', price: 0 }],
      pinnedBottomRowData: [
        { make: 'Bottom Make', model: 'Bottom Model', price: 10101010 },
      ],
      rowData: [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxster', price: 72000 },
      ],
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
              <label for="skipPinnedTop">
                <input id="skipPinnedTop" type="checkbox" />
                Skip Pinned Top Rows
              </label>
              <label for="skipPinnedBottom">
                <input id="skipPinnedBottom" type="checkbox" />
                Skip Pinned Bottom Rows
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
                  pinnedTopRowData={this.state.pinnedTopRowData}
                  pinnedBottomRowData={this.state.pinnedBottomRowData}
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
    skipPinnedTop: getBoolean('skipPinnedTop'),
    skipPinnedBottom: getBoolean('skipPinnedBottom'),
  };
}

render(<GridExample></GridExample>, document.querySelector('#root'));
