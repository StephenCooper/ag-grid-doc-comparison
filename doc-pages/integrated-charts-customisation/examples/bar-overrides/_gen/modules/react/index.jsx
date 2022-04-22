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
        bar: {
          series: {
            fillOpacity: 0.8,
            strokeOpacity: 0.8,
            strokeWidth: 2,
            shadow: {
              enabled: true,
              color: 'rgba(0, 0, 0, 0.3)',
              xOffset: 10,
              yOffset: 5,
              blur: 8,
            },
            label: {
              enabled: true,
              fontStyle: 'italic',
              fontWeight: 'bold',
              fontSize: 15,
              fontFamily: 'Arial, sans-serif',
              color: 'green',
              formatter: function (params) {
                return '<' + params.value + '>';
              },
            },
            highlightStyle: {
              item: {
                fill: 'red',
                stroke: 'yellow',
              },
            },
            tooltip: {
              renderer: function (params) {
                return {
                  content:
                    '<b>' +
                    params.xName.toUpperCase() +
                    ':</b> ' +
                    params.xValue +
                    '<br/>' +
                    '<b>' +
                    params.yName.toUpperCase() +
                    ':</b> ' +
                    params.yValue,
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
      columns: ['country', 'gold', 'silver', 'bronze'],
    };
    var createRangeChartParams = {
      cellRange: cellRange,
      chartType: 'groupedBar',
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
