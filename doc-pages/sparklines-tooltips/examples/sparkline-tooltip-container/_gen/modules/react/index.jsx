'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { SparklinesModule } from '@ag-grid-enterprise/sparklines';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, SparklinesModule]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: 'symbol', maxWidth: 120 },
        { field: 'name', minWidth: 250 },
        {
          field: 'change',
          cellRenderer: 'agSparklineCellRenderer',
          cellRendererParams: {
            sparklineOptions: {
              tooltip: {
                container: body,
                xOffset: 0,
                yOffset: 20,
                renderer: tooltipRenderer,
              },
              highlightStyle: {
                size: 5,
                fill: 'rgb(0, 113, 235)',
                strokeWidth: 0,
              },
            },
          },
        },
        {
          field: 'volume',
          type: 'numericColumn',
          maxWidth: 140,
        },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        resizable: true,
      },
      rowData: getData(),
      rowHeight: 50,
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
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            rowData={this.state.rowData}
            rowHeight={this.state.rowHeight}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

const body = document.body;
function tooltipRenderer(params) {
  const { yValue, context } = params;
  return `<div class='sparkline-tooltip'>
            <div class='tooltip-title'>${context.data.symbol}</div>
            <div class='tooltip-content'>${yValue}</div>
         </div>`;
}

render(<GridExample></GridExample>, document.querySelector('#root'));
