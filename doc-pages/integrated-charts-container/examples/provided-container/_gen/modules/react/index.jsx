'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { GridChartsModule } from '@ag-grid-enterprise/charts';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  GridChartsModule,
]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: 'athlete', width: 150, chartDataType: 'category' },
        { field: 'gold', chartDataType: 'series' },
        { field: 'silver', chartDataType: 'series' },
        { field: 'bronze', chartDataType: 'series' },
        { field: 'total', chartDataType: 'series' },
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

  createChartContainer = (chartRef) => {
    var eChart = chartRef.chartElement;
    var eTemp = document.createElement('div');
    eTemp.innerHTML = chartPanelTemplate;
    var eChartWrapper = eTemp.firstChild;
    var eParent = document.querySelector('#container');
    eParent.appendChild(eChartWrapper);
    eChartWrapper.querySelector('.chart-wrapper-body').appendChild(eChart);
    eChartWrapper.querySelector('.chart-wrapper-title').innerText =
      'Chart Created At ' + new Date();
    eChartWrapper
      .querySelector('.chart-wrapper-close')
      .addEventListener('click', function () {
        chartRef.destroyChart();
        eParent.removeChild(eChartWrapper);
      });
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div id="container">
          <div
            style={{
              height: '300px',
              width: '100%',
            }}
            className="ag-theme-alpine"
          >
            <AgGridReact
              columnDefs={this.state.columnDefs}
              defaultColDef={this.state.defaultColDef}
              enableRangeSelection={true}
              enableCharts={true}
              popupParent={this.state.popupParent}
              createChartContainer={this.createChartContainer}
              onGridReady={this.onGridReady}
              rowData={this.state.rowData}
            />
          </div>
        </div>
      </div>
    );
  }
}

var chartPanelTemplate =
  '<div class="chart-wrapper ag-theme-alpine">' +
  '<div class="chart-wrapper-top">' +
  '<span class="chart-wrapper-title"></span>' +
  '<button class="chart-wrapper-close">Destroy Chart</button>' +
  '</div>' +
  '<div class="chart-wrapper-body"></div>' +
  '</div>';

render(<GridExample></GridExample>, document.querySelector('#root'));
