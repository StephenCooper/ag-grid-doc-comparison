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
          groupId: 'athleteGroupId',
          headerName: 'Athlete',
          children: [
            {
              headerName: 'Name',
              field: 'athlete',
              minWidth: 200,
              filter: 'agTextColumnFilter',
            },
            { field: 'age' },
            {
              groupId: 'competitionGroupId',
              headerName: 'Competition',
              children: [{ field: 'year' }, { field: 'date', minWidth: 180 }],
            },
            { field: 'country', minWidth: 200 },
          ],
        },
        { colId: 'sport', field: 'sport', minWidth: 200 },
        {
          headerName: 'Medals',
          children: [
            { field: 'gold' },
            { field: 'silver' },
            { field: 'bronze' },
            { field: 'total' },
          ],
        },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        filter: true,
        resizable: true,
      },
      sideBar: 'filters',
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

    // initially collapse all filter groups
    params.api.getToolPanelInstance('filters').collapseFilterGroups();
  };

  collapseAll = () => {
    this.gridApi.getToolPanelInstance('filters').collapseFilterGroups();
  };

  expandAthleteAndCompetition = () => {
    this.gridApi
      .getToolPanelInstance('filters')
      .expandFilterGroups(['athleteGroupId', 'competitionGroupId']);
  };

  collapseCompetition = () => {
    this.gridApi
      .getToolPanelInstance('filters')
      .collapseFilterGroups(['competitionGroupId']);
  };

  expandAll = () => {
    this.gridApi.getToolPanelInstance('filters').expandFilterGroups();
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="example-wrapper">
          <div>
            <span className="button-group">
              <button onClick={() => this.expandAthleteAndCompetition()}>
                Expand Athlete &amp; Competition
              </button>
              <button onClick={() => this.collapseCompetition()}>
                Collapse Competition
              </button>
              <button onClick={() => this.expandAll()}>Expand All</button>
              <button onClick={() => this.collapseAll()}>Collapse All</button>
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
              sideBar={this.state.sideBar}
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
