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
      columnDefs: [
        { field: 'a' },
        { field: 'b' },
        { field: 'c' },
        { field: 'd' },
        { field: 'e' },
        { field: 'f' },
        { field: 'g' },
        { field: 'h' },
      ],
      defaultColDef: {
        flex: 1,
        editable: true,
      },
      rowData: getRows(),
      undoRedoCellEditingLimit: 5,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  onFirstDataRendered = () => {
    setValue('#undoInput', 0);
    disable('#undoInput', true);
    disable('#undoBtn', true);
    setValue('#redoInput', 0);
    disable('#redoInput', true);
    disable('#redoBtn', true);
  };

  onCellValueChanged = (params) => {
    var undoSize = params.api.getCurrentUndoSize();
    setValue('#undoInput', undoSize);
    disable('#undoBtn', undoSize < 1);
    var redoSize = params.api.getCurrentRedoSize();
    setValue('#redoInput', redoSize);
    disable('#redoBtn', redoSize < 1);
  };

  undo = () => {
    this.gridApi.undoCellEditing();
  };

  redo = () => {
    this.gridApi.redoCellEditing();
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="example-wrapper">
          <div>
            <span className="button-group">
              <label>Available Undo's</label>
              <input id="undoInput" className="undo-redo-input" />
              <label>Available Redo's</label>
              <input id="redoInput" className="undo-redo-input" />
              <button
                id="undoBtn"
                className="undo-btn"
                onClick={() => this.undo()}
              >
                Undo
              </button>
              <button
                id="redoBtn"
                className="redo-btn"
                onClick={() => this.redo()}
              >
                Redo
              </button>
            </span>
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
              rowData={this.state.rowData}
              enableRangeSelection={true}
              enableFillHandle={true}
              undoRedoCellEditing={true}
              undoRedoCellEditingLimit={this.state.undoRedoCellEditingLimit}
              enableCellChangeFlash={true}
              onGridReady={this.onGridReady}
              onFirstDataRendered={this.onFirstDataRendered.bind(this)}
              onCellValueChanged={this.onCellValueChanged.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}

function disable(id, disabled) {
  document.querySelector(id).disabled = disabled;
}
function setValue(id, value) {
  document.querySelector(id).value = value;
}
function getRows() {
  return Array.apply(null, Array(100)).map(function (_, i) {
    return {
      a: 'a-' + i,
      b: 'b-' + i,
      c: 'c-' + i,
      d: 'd-' + i,
      e: 'e-' + i,
      f: 'f-' + i,
      g: 'g-' + i,
      h: 'h-' + i,
    };
  });
}

render(<GridExample></GridExample>, document.querySelector('#root'));
