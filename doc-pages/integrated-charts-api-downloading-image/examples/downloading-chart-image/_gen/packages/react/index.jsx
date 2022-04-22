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
      chartThemeOverrides: {
        cartesian: {
          axes: {
            category: {
              label: {
                rotation: 335,
              },
            },
          },
        },
      },
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  onFirstDataRendered = (params) => {
    const createRangeChartParams = {
      cellRange: {
        columns: ['country', 'sugar', 'fat', 'weight'],
      },
      chartType: 'groupedColumn',
      chartContainer: document.querySelector('#myChart'),
    };
    params.api.createRangeChart(createRangeChartParams);
  };

  onChartCreated = (event) => {
    chartId = event.chartId;
  };

  downloadChartImage = (fileFormat) => {
    if (!chartId) {
      return;
    }
    const params = { fileFormat, chartId };
    const imageDataURL = this.gridApi.getChartImageDataURL(params);
    if (imageDataURL) {
      const a = document.createElement('a');
      a.href = imageDataURL;
      a.download = 'image';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  openChartImage = (fileFormat) => {
    if (!chartId) {
      return;
    }
    const params = { fileFormat, chartId };
    const imageDataURL = this.gridApi.getChartImageDataURL(params);
    if (imageDataURL) {
      const image = new Image();
      image.src = imageDataURL;
      const w = window.open('');
      w.document.write(image.outerHTML);
      w.document.close();
    }
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="wrapper">
          <div id="buttons">
            <button onClick={() => this.downloadChartImage('image/png')}>
              Download chart PNG
            </button>
            <button onClick={() => this.downloadChartImage('image/jpeg')}>
              Download chart JPEG
            </button>
            <button onClick={() => this.openChartImage('image/png')}>
              Open PNG
            </button>
            <button onClick={() => this.openChartImage('image/jpeg')}>
              Open JPEG
            </button>
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
              chartThemeOverrides={this.state.chartThemeOverrides}
              onGridReady={this.onGridReady}
              onFirstDataRendered={this.onFirstDataRendered.bind(this)}
              onChartCreated={this.onChartCreated.bind(this)}
            />
          </div>
          <div id="myChart" className="ag-theme-alpine my-chart"></div>
        </div>
      </div>
    );
  }
}

var chartId;

render(<GridExample></GridExample>, document.querySelector('#root'));
