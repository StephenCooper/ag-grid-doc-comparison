'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: 'city', chartDataType: 'category' },
        { field: 'country', chartDataType: 'category' },
        { field: 'longitude', chartDataType: 'series' },
        { field: 'latitude', chartDataType: 'series' },
        { field: 'population', chartDataType: 'series' },
      ],
      defaultColDef: {
        flex: 1,
        editable: true,
        sortable: true,
        filter: 'agMultiColumnFilter',
        floatingFilter: true,
        resizable: true,
      },
      rowData: getData(),
      chartThemes: ['ag-default-dark'],
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  onFirstDataRendered = (params) => {
    createColumnChart(params.api);
    createBubbleChart(params.api);
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div id="wrapper">
          <div id="barChart" className="ag-theme-alpine-dark"></div>
          <div id="bubbleChart" className="ag-theme-alpine-dark"></div>
          <div
            style={{
              height: '100%',
              width: '100%',
            }}
            className="ag-theme-alpine-dark"
          >
            <AgGridReact
              columnDefs={this.state.columnDefs}
              defaultColDef={this.state.defaultColDef}
              rowData={this.state.rowData}
              enableCharts={true}
              chartThemes={this.state.chartThemes}
              onGridReady={this.onGridReady}
              onFirstDataRendered={this.onFirstDataRendered.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}

function createColumnChart(gridApi) {
  gridApi.createCrossFilterChart({
    chartType: 'column',
    cellRange: {
      columns: ['country', 'population'],
    },
    aggFunc: 'count',
    chartThemeOverrides: {
      common: {
        title: {
          enabled: true,
          text: 'Number of Most Populous Cities by Country',
        },
        legend: {
          enabled: false,
        },
      },
      cartesian: {
        axes: {
          category: {
            label: {
              rotation: 325,
            },
          },
        },
      },
    },
    chartContainer: document.querySelector('#barChart'),
  });
}
function createBubbleChart(gridApi) {
  gridApi.createCrossFilterChart({
    chartType: 'bubble',
    cellRange: {
      columns: ['longitude', 'latitude', 'population'],
    },
    chartThemeOverrides: {
      common: {
        title: {
          enabled: true,
          text: 'Latitude vs Longitude of Most Populous Cities',
        },
        legend: {
          enabled: false,
        },
      },
    },
    chartContainer: document.querySelector('#bubbleChart'),
  });
}

render(<GridExample></GridExample>, document.querySelector('#root'));
