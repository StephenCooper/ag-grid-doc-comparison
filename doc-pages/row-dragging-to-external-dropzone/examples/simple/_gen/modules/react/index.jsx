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
        { field: 'id', rowDrag: true },
        { field: 'color' },
        { field: 'value1' },
        { field: 'value2' },
      ],
      defaultColDef: {
        sortable: true,
        filter: true,
        resizable: true,
        flex: 1,
      },
      rowClassRules: {
        'red-row': 'data.color == "Red"',
        'green-row': 'data.color == "Green"',
        'blue-row': 'data.color == "Blue"',
      },
      rowData: createRowData(),
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    addDropZones(params);
    addCheckboxListener(params);
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="example-wrapper">
          <div className="toolbar">
            <label>
              <input type="checkbox" /> Enable suppressMoveWhenRowDragging
            </label>
          </div>
          <div className="drop-containers">
            <div className="grid-wrapper">
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
                  rowClassRules={this.state.rowClassRules}
                  rowData={this.state.rowData}
                  rowDragManaged={true}
                  animateRows={true}
                  onGridReady={this.onGridReady}
                />
              </div>
            </div>
            <div className="drop-col">
              <span id="eDropTarget" className="drop-target">
                ==&gt; Drop to here
              </span>
              <div className="tile-container"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

var rowIdSequence = 100;
function addCheckboxListener(params) {
  var checkbox = document.querySelector('input[type=checkbox]');
  checkbox.addEventListener('change', function () {
    params.api.setSuppressMoveWhenRowDragging(checkbox.checked);
  });
}
function createRowData() {
  var data = [];
  [
    'Red',
    'Green',
    'Blue',
    'Red',
    'Green',
    'Blue',
    'Red',
    'Green',
    'Blue',
  ].forEach(function (color) {
    var newDataItem = {
      id: rowIdSequence++,
      color: color,
      value1: Math.floor(Math.random() * 100),
      value2: Math.floor(Math.random() * 100),
    };
    data.push(newDataItem);
  });
  return data;
}
function createTile(data) {
  var el = document.createElement('div');
  el.classList.add('tile');
  el.classList.add(data.color.toLowerCase());
  el.innerHTML =
    '<div class="id">' +
    data.id +
    '</div>' +
    '<div class="value">' +
    data.value1 +
    '</div>' +
    '<div class="value">' +
    data.value2 +
    '</div>';
  return el;
}
function addDropZones(params) {
  var tileContainer = document.querySelector('.tile-container');
  var dropZone = {
    getContainer: () => {
      return tileContainer;
    },
    onDragStop: (params) => {
      var tile = createTile(params.node.data);
      tileContainer.appendChild(tile);
    },
  };
  params.api.addRowDropZone(dropZone);
}

render(<GridExample></GridExample>, document.querySelector('#root'));
