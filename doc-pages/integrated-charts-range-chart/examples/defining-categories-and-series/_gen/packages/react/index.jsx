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
        // different ways to define 'categories'
        { field: 'athlete', width: 150, chartDataType: 'category' },
        { field: 'age', chartDataType: 'category', sort: 'asc' },
        { field: 'sport' },
        // excludes year from charts
        { field: 'year', chartDataType: 'excluded' },
        // different ways to define 'series'
        { field: 'gold', chartDataType: 'series' },
        { field: 'silver', chartDataType: 'series' },
        { field: 'bronze' }, // inferred as series by grid
      ],
      defaultColDef: {
        editable: true,
        sortable: true,
        flex: 1,
        minWidth: 100,
        filter: true,
        resizable: true,
      },
      popupParent: document.body,
      chartThemeOverrides: {
        common: {
          title: {
            enabled: true,
            text: 'Medals by Age',
          },
          legend: {
            position: 'bottom',
          },
        },
        column: {
          axes: {
            category: {
              label: {
                rotation: 0,
              },
            },
          },
        },
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

    fetch('https://www.ag-grid.com/example-assets/wide-spread-of-sports.json')
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  onFirstDataRendered = (params) => {
    var createRangeChartParams = {
      cellRange: {
        rowStartIndex: 0,
        rowEndIndex: 79,
        columns: ['age', 'gold', 'silver', 'bronze'],
      },
      chartType: 'groupedColumn',
      chartContainer: document.querySelector('#myChart'),
      aggFunc: 'sum',
    };
    params.api.createRangeChart(createRangeChartParams);
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="wrapper">
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
              popupParent={this.state.popupParent}
              enableRangeSelection={true}
              enableCharts={true}
              chartThemeOverrides={this.state.chartThemeOverrides}
              onGridReady={this.onGridReady}
              onFirstDataRendered={this.onFirstDataRendered.bind(this)}
              rowData={this.state.rowData}
            />
          </div>
          <div id="myChart" className="ag-theme-alpine my-chart"></div>
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector('#root'));
