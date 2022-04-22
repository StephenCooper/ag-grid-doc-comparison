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
        { field: 'country', pivot: true },
        { field: 'year', rowGroup: true },
        { field: 'sport', rowGroup: true },
        { field: 'total', aggFunc: 'sum' },
        { field: 'gold', aggFunc: 'sum' },
      ],
      defaultColDef: {
        editable: true,
        sortable: true,
        flex: 1,
        minWidth: 130,
        filter: true,
        resizable: true,
      },
      autoGroupColumnDef: {
        minWidth: 200,
      },
      popupParent: document.body,
      rowData: null,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => {
      this.setState({ rowData: data });
    };

    fetch('https://www.ag-grid.com/example-assets/wide-spread-of-sports.json')
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  onFirstDataRendered = (event) => {
    var chartContainer = document.querySelector('#chart');
    var params = {
      chartType: 'groupedColumn',
      chartContainer: chartContainer,
      chartThemeName: 'ag-vivid',
      chartThemeOverrides: {
        common: {
          padding: {
            top: 20,
            left: 10,
            bottom: 30,
            right: 10,
          },
          legend: {
            enabled: true,
            position: 'bottom',
          },
          navigator: {
            enabled: true,
            height: 10,
          },
        },
      },
    };
    event.api.createPivotChart(params);
    // expand one row for demonstration purposes
    setTimeout(function () {
      event.api.getDisplayedRowAtIndex(2).setExpanded(true);
    }, 0);
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '40%',
              width: '100%',
            }}
            className="ag-theme-alpine"
          >
            <AgGridReact
              columnDefs={this.state.columnDefs}
              defaultColDef={this.state.defaultColDef}
              autoGroupColumnDef={this.state.autoGroupColumnDef}
              pivotMode={true}
              popupParent={this.state.popupParent}
              onGridReady={this.onGridReady}
              onFirstDataRendered={this.onFirstDataRendered.bind(this)}
              rowData={this.state.rowData}
            />
          </div>
          <div
            id="chart"
            style={{ flex: '1 1 auto', overflow: 'hidden', height: '60%' }}
          ></div>
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector('#root'));
