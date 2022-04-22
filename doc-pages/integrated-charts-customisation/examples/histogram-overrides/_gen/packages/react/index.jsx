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
        { field: 'gold', chartDataType: 'series' },
        { field: 'silver', chartDataType: 'series' },
        { field: 'bronze', chartDataType: 'series' },
        {
          headerName: 'A',
          valueGetter: 'Math.floor(Math.random()*1000)',
          chartDataType: 'series',
        },
        {
          headerName: 'B',
          valueGetter: 'Math.floor(Math.random()*1000)',
          chartDataType: 'series',
        },
        {
          headerName: 'C',
          valueGetter: 'Math.floor(Math.random()*1000)',
          chartDataType: 'series',
        },
        {
          headerName: 'D',
          valueGetter: 'Math.floor(Math.random()*1000)',
          chartDataType: 'series',
        },
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
        histogram: {
          series: {
            bins: [
              [0, 10],
              [10, 40],
              [40, 80],
              [80, 100],
            ],
            fillOpacity: 0.8,
            strokeOpacity: 0.8,
            strokeWidth: 4,
            shadow: {
              enabled: true,
              color: 'rgba(0, 0, 0, 0.3)',
              xOffset: 10,
              yOffset: 10,
              blur: 8,
            },
            label: {
              enabled: true,
              fontStyle: 'italic',
              fontWeight: 'bold',
              fontSize: 15,
              fontFamily: 'Arial, sans-serif',
              color: 'green',
              formatter: (params) => {
                return '<' + params.value + '>';
              },
            },
            highlightStyle: {
              item: {
                fill: 'black',
                stroke: 'yellow',
              },
            },
            tooltip: {
              renderer: (params) => {
                var bin = params.datum;
                var binSize = bin.frequency;
                var medalColour = params.xKey;
                return {
                  content:
                    binSize +
                    (binSize >= 2 ? ' countries' : ' country') +
                    ' got between ' +
                    params.xValue[0] +
                    ' and ' +
                    params.xValue[1] +
                    ' ' +
                    medalColour +
                    ' medals',
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
      rowEndIndex: 20,
      columns: ['bronze'],
    };
    var createRangeChartParams = {
      cellRange: cellRange,
      chartType: 'histogram',
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
