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
        { field: 'athlete', minWidth: 170 },
        { field: 'age' },
        { field: 'country' },
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
      },
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

  onCellKeyDown = (e) => {
    console.log('onCellKeyDown', e);
  };

  onCellKeyPress = (e) => {
    console.log('onCellKeyPress', e);
    if (e.event) {
      var keyPressed = e.event.key;
      console.log('Key Pressed = ' + keyPressed);
      if (keyPressed === 's') {
        var rowNode = e.node;
        var newSelection = !rowNode.isSelected();
        console.log(
          'setting selection on node ' +
            rowNode.data.athlete +
            ' to ' +
            newSelection
        );
        rowNode.setSelected(newSelection);
      }
    }
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
            onGridReady={this.onGridReady}
            onCellKeyDown={this.onCellKeyDown.bind(this)}
            onCellKeyPress={this.onCellKeyPress.bind(this)}
          />
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector('#root'));
