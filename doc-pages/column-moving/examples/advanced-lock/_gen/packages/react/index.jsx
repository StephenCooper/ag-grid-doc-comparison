'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import ControlsCellRenderer from './controlsCellRenderer.jsx';

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          lockPosition: 'left',
          valueGetter: 'node.rowIndex',
          cellClass: 'locked-col',
          width: 60,
          suppressNavigable: true,
        },
        {
          lockPosition: 'left',
          cellRenderer: ControlsCellRenderer,
          cellClass: 'locked-col',
          width: 120,
          suppressNavigable: true,
        },
        { field: 'athlete' },
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
      defaultColDef: {
        width: 150,
        resizable: true,
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

  onColumnPinned = (event) => {
    const allCols = event.columnApi.getAllGridColumns();
    const allFixedCols = allCols.filter((col) => col.getColDef().lockPosition);
    const allNonFixedCols = allCols.filter(
      (col) => !col.getColDef().lockPosition
    );
    const pinnedCount = allNonFixedCols.filter(
      (col) => col.getPinned() === 'left'
    ).length;
    const pinFixed = pinnedCount > 0;
    const columnStates = [];
    allFixedCols.forEach((col) => {
      if (pinFixed !== col.isPinned()) {
        columnStates.push({
          colId: col.getId(),
          pinned: pinFixed ? 'left' : null,
        });
      }
    });
    if (columnStates.length > 0) {
      event.columnApi.applyColumnState({ state: columnStates });
    }
  };

  onPinAthlete = () => {
    this.gridColumnApi.applyColumnState({
      state: [{ colId: 'athlete', pinned: 'left' }],
    });
  };

  onUnpinAthlete = () => {
    this.gridColumnApi.applyColumnState({
      state: [{ colId: 'athlete', pinned: null }],
    });
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="example-wrapper">
          <div className="legend-bar">
            <button onClick={() => this.onPinAthlete()}>Pin Athlete</button>
            <button onClick={() => this.onUnpinAthlete()}>
              Un-Pin Athlete
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="locked-col legend-box"></span> Position Locked
            Column
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
              suppressDragLeaveHidesColumns={true}
              onGridReady={this.onGridReady}
              onColumnPinned={this.onColumnPinned.bind(this)}
              rowData={this.state.rowData}
            />
          </div>
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector('#root'));
