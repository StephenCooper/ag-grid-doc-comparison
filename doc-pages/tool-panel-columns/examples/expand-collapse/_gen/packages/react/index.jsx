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
            {
              groupId: 'competitionGroupId',
              headerName: 'Competition',
              children: [{ field: 'year' }, { field: 'date', minWidth: 180 }],
            },
          ],
        },
        {
          groupId: 'medalsGroupId',
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
        // allow every column to be aggregated
        enableValue: true,
        // allow every column to be grouped
        enableRowGroup: true,
        // allow every column to be pivoted
        enablePivot: true,
        filter: true,
        sortable: true,
        resizable: true,
      },
      sideBar: 'columns',
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

    var columnToolPanel = params.api.getToolPanelInstance('columns');
    columnToolPanel.collapseColumnGroups();
  };

  expandAllGroups = () => {
    var columnToolPanel = this.gridApi.getToolPanelInstance('columns');
    columnToolPanel.expandColumnGroups();
  };

  collapseAllGroups = () => {
    var columnToolPanel = this.gridApi.getToolPanelInstance('columns');
    columnToolPanel.collapseColumnGroups();
  };

  expandAthleteAndCompetitionGroups = () => {
    var columnToolPanel = this.gridApi.getToolPanelInstance('columns');
    columnToolPanel.expandColumnGroups([
      'athleteGroupId',
      'competitionGroupId',
    ]);
  };

  collapseCompetitionGroups = () => {
    var columnToolPanel = this.gridApi.getToolPanelInstance('columns');
    columnToolPanel.collapseColumnGroups(['competitionGroupId']);
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="example-wrapper">
          <div>
            <span className="button-group">
              <button onClick={() => this.expandAllGroups()}>Expand All</button>
              <button onClick={() => this.collapseAllGroups()}>
                Collapse All
              </button>
              <button onClick={() => this.expandAthleteAndCompetitionGroups()}>
                Expand Athlete &amp; Competition
              </button>
              <button onClick={() => this.collapseCompetitionGroups()}>
                Collapse Competition
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
