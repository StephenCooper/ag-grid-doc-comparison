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
        { field: 'country', width: 150, chartDataType: 'category' },
        { field: 'total', chartDataType: 'series' },
        { field: 'gold', chartDataType: 'series' },
        { field: 'silver', chartDataType: 'series' },
        { field: 'bronze', chartDataType: 'series' },
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
      rowData: getData(),
      chartThemeOverrides: {
        scatter: {
          series: {
            fillOpacity: 0.7,
            strokeOpacity: 0.6,
            strokeWidth: 2,
            highlightStyle: {
              item: {
                fill: 'red',
                stroke: 'yellow',
              },
            },
            marker: {
              enabled: true,
              shape: 'square',
              size: 5,
              maxSize: 12,
              strokeWidth: 4,
            },
            tooltip: {
              renderer: (params) => {
                var label = params.datum[params.labelKey];
                var size = params.datum[params.sizeKey];
                return {
                  content:
                    (label != null
                      ? '<b>' +
                        params.labelName.toUpperCase() +
                        ':</b> ' +
                        label +
                        '<br/>'
                      : '') +
                    '<b>' +
                    params.xName.toUpperCase() +
                    ':</b> ' +
                    params.xValue +
                    '<br/>' +
                    '<b>' +
                    params.yName.toUpperCase() +
                    ':</b> ' +
                    params.yValue +
                    (size != null
                      ? '<br/><b>' +
                        params.sizeName.toUpperCase() +
                        ':</b> ' +
                        size
                      : ''),
                };
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
    var cellRange = {
      rowStartIndex: 0,
      rowEndIndex: 4,
      columns: ['country', 'total', 'gold', 'silver', 'bronze'],
    };
    var createRangeChartParams = {
      cellRange: cellRange,
      chartType: 'scatter',
    };
    params.api.createRangeChart(createRangeChartParams);
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
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
            rowData={this.state.rowData}
            enableRangeSelection={true}
            enableCharts={true}
            chartThemeOverrides={this.state.chartThemeOverrides}
            onGridReady={this.onGridReady}
            onFirstDataRendered={this.onFirstDataRendered.bind(this)}
          />
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector('#root'));
