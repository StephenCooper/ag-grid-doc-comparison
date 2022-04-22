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
      defaultColDef: {
        width: 80,
        sortable: true,
        filter: true,
        resizable: true,
      },
      rowSelection: 'multiple',
      rowClassRules: {
        'red-row': 'data.color == "Red"',
        'green-row': 'data.color == "Green"',
        'blue-row': 'data.color == "Blue"',
      },
      rowData: getData(),
      columnDefs: [
        {
          valueGetter: "'Drag'",
          dndSource: true,
          dndSourceOnRowDrag: onRowDrag,
          checkboxSelection: true,
        },
        { field: 'id' },
        { field: 'color' },
        { field: 'value1' },
        { field: 'value2' },
      ],
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  onDragOver = (event) => {
    var dragSupported = event.dataTransfer.types.length;
    if (dragSupported) {
      event.dataTransfer.dropEffect = 'move';
    }
    event.preventDefault();
  };

  onDrop = (event) => {
    event.preventDefault();
    var jsonData = event.dataTransfer.getData('application/json');
    var eJsonRow = document.createElement('div');
    eJsonRow.classList.add('json-row');
    eJsonRow.innerText = jsonData;
    var eJsonDisplay = document.querySelector('#eJsonDisplay');
    eJsonDisplay.appendChild(eJsonRow);
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="outer">
          <div className="grid-col">
            <div
              style={{
                height: '100%',
                width: '100%',
              }}
              className="ag-theme-alpine"
            >
              <AgGridReact
                defaultColDef={this.state.defaultColDef}
                rowSelection={this.state.rowSelection}
                suppressRowClickSelection={true}
                rowClassRules={this.state.rowClassRules}
                rowData={this.state.rowData}
                rowDragManaged={true}
                columnDefs={this.state.columnDefs}
                animateRows={true}
                onGridReady={this.onGridReady}
              />
            </div>
          </div>

          <div
            className="drop-col"
            onDragOver={() => this.onDragOver(event)}
            onDrop={() => this.onDrop(event)}
          >
            <span id="eDropTarget" className="drop-target">
              ==&gt; Drop to here
            </span>
            <div id="eJsonDisplay" className="json-display"></div>
          </div>
        </div>
      </div>
    );
  }
}

function onRowDrag(params) {
  // create the data that we want to drag
  var rowNode = params.rowNode;
  var e = params.dragEvent;
  var jsonObject = {
    grid: 'GRID_001',
    operation: 'Drag on Column',
    rowId: rowNode.data.id,
    selected: rowNode.isSelected(),
  };
  var jsonData = JSON.stringify(jsonObject);
  e.dataTransfer.setData('application/json', jsonData);
  e.dataTransfer.setData('text/plain', jsonData);
}

render(<GridExample></GridExample>, document.querySelector('#root'));
