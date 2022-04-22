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
        { field: 'country', chartDataType: 'category' },
        { field: 'sugar', chartDataType: 'series' },
        { field: 'fat', chartDataType: 'series' },
        { field: 'weight', chartDataType: 'series' },
      ],
      defaultColDef: {
        editable: true,
        sortable: true,
        flex: 1,
        minWidth: 100,
        filter: true,
        resizable: true,
      },
      rowData: getData(),
      popupParent: document.body,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  saveChart = () => {
    var chartModels = this.gridApi.getChartModels() || [];
    if (chartModels.length > 0) {
      chartModel = chartModels[0];
    }
    alert('Chart saved!');
  };

  clearChart = () => {
    if (currentChartRef) {
      currentChartRef.destroyChart();
      currentChartRef = null;
    }
  };

  restoreChart = () => {
    if (!chartModel) return;
    currentChartRef = this.gridApi.restoreChart(chartModel);
  };

  createChartContainer = (chartRef) => {
    // destroy existing chart
    if (currentChartRef) {
      currentChartRef.destroyChart();
    }
    var eChart = chartRef.chartElement;
    var eParent = document.querySelector('#myChart');
    eParent.appendChild(eChart);
    currentChartRef = chartRef;
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="wrapper">
          <div id="buttons">
            <button onClick={() => this.saveChart()}>Save chart</button>
            <button onClick={() => this.clearChart()}>Clear chart</button>
            <button onClick={() => this.restoreChart()}>Restore chart</button>
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
              rowData={this.state.rowData}
              enableRangeSelection={true}
              popupParent={this.state.popupParent}
              enableCharts={true}
              createChartContainer={this.createChartContainer}
              onGridReady={this.onGridReady}
            />
          </div>
          <div id="myChart" className="ag-theme-alpine my-chart"></div>
        </div>
      </div>
    );
  }
}

var chartModel;
var currentChartRef;

render(<GridExample></GridExample>, document.querySelector('#root'));
