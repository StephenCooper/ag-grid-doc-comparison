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
      rowHeight: 70,
      columnDefs: [
        {
          field: 'sparkline',
          headerName: 'Line Sparkline',
          minWidth: 100,
          cellRenderer: 'agSparklineCellRenderer',
          cellRendererParams: {
            sparklineOptions: {
              line: {
                stroke: 'rgb(124, 255, 178)',
                strokeWidth: 3,
              },
              padding: {
                top: 10,
                bottom: 10,
              },
              marker: {
                shape: 'diamond',
                formatter: lineMarkerFormatter,
              },
            },
          },
        },
        {
          field: 'sparkline',
          headerName: 'Column Sparkline',
          minWidth: 100,
          cellRenderer: 'agSparklineCellRenderer',
          cellRendererParams: {
            sparklineOptions: {
              type: 'column',
              padding: {
                top: 10,
                bottom: 10,
              },
              formatter: columnFormatter,
            },
          },
        },
        {
          field: 'sparkline',
          headerName: 'Area Sparkline',
          minWidth: 100,
          cellRenderer: 'agSparklineCellRenderer',
          cellRendererParams: {
            sparklineOptions: {
              type: 'area',
              fill: 'rgba(84, 112, 198, 0.3)',
              line: {
                stroke: 'rgb(84, 112, 198)',
              },
              padding: {
                top: 10,
                bottom: 10,
              },
              marker: {
                formatter: areaMarkerFormatter,
              },
            },
          },
        },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        resizable: true,
      },
      rowData: getData(),
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
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
            rowHeight={this.state.rowHeight}
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            rowData={this.state.rowData}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

const colors = {
  firstLast: 'rgb(253, 221, 96)',
  min: 'rgb(239, 108, 0)',
  max: 'rgb(59, 162, 114)',
  negative: 'rgb(255, 110, 118)',
  positive: 'rgba(0,128,0, 0.3)',
  highlighted: 'rgb(88, 217, 249)',
};
function lineMarkerFormatter(params) {
  const { min, max, first, last, highlighted } = params;
  const color = highlighted
    ? colors.highlighted
    : min
    ? colors.min
    : max
    ? colors.max
    : colors.firstLast;
  return {
    size: highlighted || min || max || first || last ? 5 : 0,
    fill: color,
    stroke: color,
  };
}
function columnFormatter(params) {
  const { first, last, yValue, highlighted } = params;
  let fill = undefined;
  if (!highlighted) {
    if (first || last) {
      fill = colors.firstLast;
    } else if (yValue < 0) {
      fill = colors.negative;
    } else {
      fill = colors.positive;
    }
  } else {
    fill = colors.highlighted;
  }
  return { fill };
}
function areaMarkerFormatter(params) {
  const { min, max, first, last, highlighted } = params;
  const color = highlighted
    ? colors.highlighted
    : min
    ? colors.min
    : max
    ? colors.max
    : colors.firstLast;
  return {
    size: highlighted || min || max || first || last ? 5 : 0,
    fill: color,
    stroke: color,
  };
}

render(<GridExample></GridExample>, document.querySelector('#root'));
