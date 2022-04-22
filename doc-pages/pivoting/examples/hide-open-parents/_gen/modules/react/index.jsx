'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowGroupingModule,
  MenuModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        // row group columns
        { field: 'country', rowGroup: true },
        { field: 'athlete', rowGroup: true },
        // pivot column
        {
          headerName: 'Year',
          // to mix it up a bit, here we are using a valueGetter for the year column.
          valueGetter: 'data.year',
          pivot: true,
        },
        // aggregation columns
        { field: 'gold', aggFunc: 'sum' },
        { field: 'silver', aggFunc: 'sum' },
        { field: 'bronze', aggFunc: 'sum' },
        { field: 'total', aggFunc: 'sum' },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        enableRowGroup: true,
        enablePivot: true,
        enableValue: true,
        filter: true,
        resizable: true,
        sortable: true,
      },
      autoGroupColumnDef: {
        minWidth: 250,
      },
      groupDefaultExpanded: 9,
      groupDisplayType: 'multipleColumns',
      rowData: null,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => {
      this.setState({ rowData: data });
    };

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="test-container">
          <div className="test-header">
            <span className="legend-item ag-row-level-0"></span>
            <span className="legend-label">
              Top Level Group (After collapsing)
            </span>
            <span className="legend-item ag-row-level-1"></span>
            <span className="legend-label">Second Level Group</span>
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
              autoGroupColumnDef={this.state.autoGroupColumnDef}
              pivotMode={true}
              groupDefaultExpanded={this.state.groupDefaultExpanded}
              groupHideOpenParents={true}
              groupDisplayType={this.state.groupDisplayType}
              animateRows={true}
              sideBar={true}
              onGridReady={this.onGridReady}
              rowData={this.state.rowData}
            />
          </div>
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector('#root'));
