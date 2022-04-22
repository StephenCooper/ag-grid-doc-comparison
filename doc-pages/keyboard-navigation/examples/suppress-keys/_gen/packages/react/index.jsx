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
        {
          field: 'athlete',
          minWidth: 170,
          suppressKeyboardEvent: function (params) {
            return suppressEnter(params) || suppressNavigation(params);
          },
        },
        { field: 'age' },
        {
          field: 'country',
          minWidth: 130,
          suppressHeaderKeyboardEvent: function (params) {
            var key = params.event.key;
            return (
              key === 'ArrowLeft' || key === 'ArrowRight' || key === 'Enter'
            );
          },
        },
        { field: 'year' },
        { field: 'date' },
        { field: 'sport' },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
      ],
      rowData: null,
      defaultColDef: {
        editable: true,
        sortable: true,
        flex: 1,
        minWidth: 100,
        filter: true,
        resizable: true,
        suppressKeyboardEvent: suppressNavigation,
        suppressHeaderKeyboardEvent: suppressUpDownNavigation,
      },
      rowSelection: 'multiple',
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
            rowData={this.state.rowData}
            defaultColDef={this.state.defaultColDef}
            enableRangeSelection={true}
            rowSelection={this.state.rowSelection}
            suppressRowClickSelection={true}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

function suppressEnter(params) {
  var KEY_ENTER = 'Enter';
  var event = params.event;
  var key = event.key;
  var suppress = key === KEY_ENTER;
  return suppress;
}
function suppressNavigation(params) {
  var KEY_A = 'A';
  var KEY_C = 'C';
  var KEY_V = 'V';
  var KEY_D = 'D';
  var KEY_PAGE_UP = 'PageUp';
  var KEY_PAGE_DOWN = 'PageDown';
  var KEY_TAB = 'Tab';
  var KEY_LEFT = 'ArrowLeft';
  var KEY_UP = 'ArrowUp';
  var KEY_RIGHT = 'ArrowRight';
  var KEY_DOWN = 'ArrowDown';
  var KEY_F2 = 'F2';
  var KEY_BACKSPACE = 'Backspace';
  var KEY_ESCAPE = 'Escape';
  var KEY_SPACE = ' ';
  var KEY_DELETE = 'Delete';
  var KEY_PAGE_HOME = 'Home';
  var KEY_PAGE_END = 'End';
  var event = params.event;
  var key = event.key;
  var keysToSuppress = [
    KEY_PAGE_UP,
    KEY_PAGE_DOWN,
    KEY_TAB,
    KEY_F2,
    KEY_ESCAPE,
  ];
  var editingKeys = [
    KEY_LEFT,
    KEY_RIGHT,
    KEY_UP,
    KEY_DOWN,
    KEY_BACKSPACE,
    KEY_DELETE,
    KEY_SPACE,
    KEY_PAGE_HOME,
    KEY_PAGE_END,
  ];
  if (event.ctrlKey || event.metaKey) {
    keysToSuppress.push(KEY_A);
    keysToSuppress.push(KEY_V);
    keysToSuppress.push(KEY_C);
    keysToSuppress.push(KEY_D);
  }
  if (!params.editing) {
    keysToSuppress = keysToSuppress.concat(editingKeys);
  }
  if (
    params.column.getId() === 'country' &&
    (key === KEY_UP || key === KEY_DOWN)
  ) {
    return false;
  }
  var suppress = keysToSuppress.some(function (suppressedKey) {
    return suppressedKey === key || key.toUpperCase() === suppressedKey;
  });
  return suppress;
}
function suppressUpDownNavigation(params) {
  var key = params.event.key;
  return key === 'ArrowUp' || key === 'ArrowDown';
}

render(<GridExample></GridExample>, document.querySelector('#root'));
