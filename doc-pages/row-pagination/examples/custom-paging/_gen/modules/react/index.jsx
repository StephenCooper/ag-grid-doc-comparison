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
          headerName: 'Athlete',
          field: 'athlete',
          minWidth: 170,
          checkboxSelection: checkboxSelection,
          headerCheckboxSelection: headerCheckboxSelection,
        },
        { field: 'age' },
        { field: 'country' },
        { field: 'year' },
        { field: 'date' },
        { field: 'sport' },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
      ],
      autoGroupColumnDef: {
        headerName: 'Group',
        minWidth: 170,
        field: 'athlete',
        valueGetter: function (params) {
          if (params.node.group) {
            return params.node.key;
          } else {
            return params.data[params.colDef.field];
          }
        },
        headerCheckboxSelection: true,
        cellRenderer: 'agGroupCellRenderer',
        cellRendererParams: {
          checkbox: true,
        },
      },
      defaultColDef: {
        editable: true,
        enableRowGroup: true,
        enablePivot: true,
        enableValue: true,
        sortable: true,
        resizable: true,
        filter: true,
        flex: 1,
        minWidth: 100,
      },
      rowSelection: 'multiple',
      rowGroupPanelShow: 'always',
      pivotPanelShow: 'always',
      paginationPageSize: 10,
      paginationNumberFormatter: function (params) {
        return '[' + params.value.toLocaleString() + ']';
      },
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

  onFirstDataRendered = (params) => {
    params.api.paginationGoToPage(4);
  };

  onPageSizeChanged = () => {
    var value = document.getElementById('page-size').value;
    this.gridApi.paginationSetPageSize(Number(value));
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="example-wrapper">
          <div className="example-header">
            Page Size:
            <select onChange={() => this.onPageSizeChanged()} id="page-size">
              <option value="10" selected={true}>
                10
              </option>
              <option value="100">100</option>
              <option value="500">500</option>
              <option value="1000">1000</option>
            </select>
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
              autoGroupColumnDef={this.state.autoGroupColumnDef}
              defaultColDef={this.state.defaultColDef}
              suppressRowClickSelection={true}
              groupSelectsChildren={true}
              rowSelection={this.state.rowSelection}
              rowGroupPanelShow={this.state.rowGroupPanelShow}
              pivotPanelShow={this.state.pivotPanelShow}
              enableRangeSelection={true}
              pagination={true}
              paginationPageSize={this.state.paginationPageSize}
              paginationNumberFormatter={this.state.paginationNumberFormatter}
              onGridReady={this.onGridReady}
              onFirstDataRendered={this.onFirstDataRendered.bind(this)}
              rowData={this.state.rowData}
            />
          </div>
        </div>
      </div>
    );
  }
}

var checkboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0;
};
var headerCheckboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0;
};

render(<GridExample></GridExample>, document.querySelector('#root'));
