'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import MedalCellRenderer from './medalCellRenderer.jsx';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: 'athlete', width: 150 },
        { field: 'country', width: 150 },
        { field: 'year', width: 100 },
        { field: 'gold', width: 100, cellRenderer: MedalCellRenderer },
        { field: 'silver', width: 100, cellRenderer: MedalCellRenderer },
        { field: 'bronze', width: 100, cellRenderer: MedalCellRenderer },
        { field: 'total', width: 100 },
      ],
      defaultColDef: {
        editable: true,
        sortable: true,
        flex: 1,
        minWidth: 100,
        filter: true,
        resizable: true,
      },
      rowData: null,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => {
      this.setState({ rowData: data });
    };

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  onCallGold = () => {
    console.log('=========> calling all gold');
    // pass in list of columns, here it's gold only
    const params = { columns: ['gold'] };
    const instances = this.gridApi.getCellRendererInstances(params);
    instances.forEach((instance) => {
      instance.medalUserFunction();
    });
  };

  onFirstRowGold = () => {
    console.log('=========> calling gold row one');
    // pass in one column and one row to identify one cell
    const firstRowNode = this.gridApi.getDisplayedRowAtIndex(0);
    const params = { columns: ['gold'], rowNodes: [firstRowNode] };
    const instances = this.gridApi.getCellRendererInstances(params);
    instances.forEach((instance) => {
      instance.medalUserFunction();
    });
  };

  onCallAllCells = () => {
    console.log('=========> calling everything');
    // no params, goes through all rows and columns where cell renderer exists
    const instances = this.gridApi.getCellRendererInstances();
    instances.forEach((instance) => {
      instance.medalUserFunction();
    });
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="example-wrapper">
          <div style={{ marginBottom: '5px' }}>
            <button onClick={() => this.onCallGold()}>Gold</button>
            <button onClick={() => this.onFirstRowGold()}>
              First Row Gold
            </button>
            <button onClick={() => this.onCallAllCells()}>All Cells</button>
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
