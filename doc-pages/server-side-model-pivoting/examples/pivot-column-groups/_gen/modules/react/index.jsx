'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ServerSideRowModelModule,
  RowGroupingModule,
  MenuModule,
  ColumnsToolPanelModule,
]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: 'country', rowGroup: true },
        { field: 'sport', rowGroup: true },
        { field: 'year', pivot: true },
        { field: 'gold', aggFunc: 'sum' },
        { field: 'silver', aggFunc: 'sum' },
        { field: 'bronze', aggFunc: 'sum' },
      ],
      defaultColDef: {
        width: 150,
        resizable: true,
        sortable: true,
      },
      autoGroupColumnDef: {
        minWidth: 200,
      },
      rowModelType: 'serverSide',
      serverSideStoreType: 'partial',
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => {
      // setup the fake server with entire dataset
      var fakeServer = new FakeServer(data);
      // create datasource with a reference to the fake server
      var datasource = getServerSideDatasource(fakeServer);
      // register the datasource with the grid
      params.api.setServerSideDatasource(datasource);
    };

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
          className="ag-theme-alpine-dark"
        >
          <AgGridReact
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            autoGroupColumnDef={this.state.autoGroupColumnDef}
            rowModelType={this.state.rowModelType}
            serverSideStoreType={this.state.serverSideStoreType}
            pivotMode={true}
            animateRows={true}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

function getServerSideDatasource(server) {
  return {
    getRows: (params) => {
      var request = params.request;
      console.log('[Datasource] - rows requested by grid: ', params.request);
      var response = server.getData(request);
      // add pivot colDefs in the grid based on the resulting data
      addPivotColDefs(request, response, params.columnApi);
      // simulating real server call with a 500ms delay
      setTimeout(function () {
        if (response.success) {
          // supply data to grid
          params.success({
            rowData: response.rows,
            rowCount: response.lastRow,
          });
        } else {
          params.fail();
        }
      }, 500);
    },
  };
}
function addPivotColDefs(request, response, columnApi) {
  // check if pivot colDefs already exist
  var existingPivotColDefs = columnApi.getSecondaryColumns();
  if (existingPivotColDefs && existingPivotColDefs.length > 0) {
    return;
  }
  // create pivot colDef's based of data returned from the server
  var pivotColDefs = createPivotColDefs(request, response.pivotFields);
  // supply secondary columns to the grid
  columnApi.setSecondaryColumns(pivotColDefs);
}
function createPivotColDefs(request, pivotFields) {
  function addColDef(colId, parts, res) {
    if (parts.length === 0) return [];
    var first = parts.shift();
    var existing = res.filter(function (r) {
      return 'groupId' in r && r.groupId === first;
    })[0];
    if (existing) {
      existing['children'] = addColDef(colId, parts, existing.children);
    } else {
      var colDef = {};
      var isGroup = parts.length > 0;
      if (isGroup) {
        colDef['groupId'] = first;
        colDef['headerName'] = first;
      } else {
        var valueCol = request.valueCols.filter(function (r) {
          return r.field === first;
        })[0];
        colDef['colId'] = colId;
        colDef['headerName'] = valueCol.displayName;
        colDef['field'] = colId;
      }
      var children = addColDef(colId, parts, []);
      children.length > 0 ? (colDef['children'] = children) : null;
      res.push(colDef);
    }
    return res;
  }
  if (request.pivotMode && request.pivotCols.length > 0) {
    var secondaryCols = [];
    pivotFields.forEach(function (field) {
      addColDef(field, field.split('_'), secondaryCols);
    });
    return secondaryCols;
  }
  return [];
}

render(<GridExample></GridExample>, document.querySelector('#root'));
