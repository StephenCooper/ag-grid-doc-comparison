'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          headerName: 'Athlete Details',
          children: [
            {
              field: 'athlete',
              width: 150,
              suppressSizeToFit: true,
              enableRowGroup: true,
              rowGroupIndex: 0,
            },
            {
              field: 'age',
              width: 90,
              minWidth: 75,
              maxWidth: 100,
              enableRowGroup: true,
            },
            {
              field: 'country',
              width: 120,
              enableRowGroup: true,
            },
            {
              field: 'year',
              width: 90,
              enableRowGroup: true,
              pivotIndex: 0,
            },
            { field: 'sport', width: 110, enableRowGroup: true },
            {
              field: 'gold',
              width: 60,
              enableValue: true,
              suppressMenu: true,
              filter: 'agNumberColumnFilter',
              aggFunc: 'sum',
            },
            {
              field: 'silver',
              width: 60,
              enableValue: true,
              suppressMenu: true,
              filter: 'agNumberColumnFilter',
              aggFunc: 'sum',
            },
            {
              field: 'bronze',
              width: 60,
              enableValue: true,
              suppressMenu: true,
              filter: 'agNumberColumnFilter',
              aggFunc: 'sum',
            },
            {
              field: 'total',
              width: 60,
              enableValue: true,
              suppressMenu: true,
              filter: 'agNumberColumnFilter',
              aggFunc: 'sum',
            },
          ],
        },
      ],
      defaultColDef: {
        sortable: true,
        resizable: true,
      },
      rowData: null,
      groupHeaderHeight: 75,
      headerHeight: 150,
      floatingFiltersHeight: 50,
      pivotGroupHeaderHeight: 50,
      pivotHeaderHeight: 100,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => params.api.setRowData(data);

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => updateData(data));
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
            groupHeaderHeight={this.state.groupHeaderHeight}
            headerHeight={this.state.headerHeight}
            floatingFiltersHeight={this.state.floatingFiltersHeight}
            pivotGroupHeaderHeight={this.state.pivotGroupHeaderHeight}
            pivotHeaderHeight={this.state.pivotHeaderHeight}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector('#root'));
