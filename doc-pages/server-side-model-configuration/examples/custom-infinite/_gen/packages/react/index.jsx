'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: 'id', maxWidth: 80 },
        { field: 'athlete', minWidth: 220 },
        { field: 'country', minWidth: 200 },
        { field: 'year' },
        { field: 'sport', minWidth: 200 },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        resizable: true,
      },
      rowBuffer: 0,
      rowModelType: 'serverSide',
      serverSideStoreType: 'partial',
      cacheBlockSize: 50,
      maxBlocksInCache: 2,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => {
      // adding row id to data
      var idSequence = 0;
      data.forEach(function (item) {
        item.id = idSequence++;
      });
      // setup the fake server with entire dataset
      var fakeServer = createFakeServer(data);
      // create datasource with a reference to the fake server
      var datasource = createServerSideDatasource(fakeServer);
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
            rowBuffer={this.state.rowBuffer}
            rowModelType={this.state.rowModelType}
            serverSideStoreType={this.state.serverSideStoreType}
            cacheBlockSize={this.state.cacheBlockSize}
            maxBlocksInCache={this.state.maxBlocksInCache}
            debug={true}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

function createServerSideDatasource(server) {
  return {
    getRows: function (params) {
      console.log('[Datasource] - rows requested by grid: ', params.request);
      // get data for request from our fake server
      var response = server.getData(params.request);
      // simulating real server call with a 500ms delay
      setTimeout(function () {
        if (response.success) {
          // supply rows for requested block to grid
          params.success({
            rowData: response.rows,
            rowCount: response.lastRow,
          });
        } else {
          params.fail();
        }
      }, 1000);
    },
  };
}
function createFakeServer(allData) {
  return {
    getData: function (request) {
      // take a slice of the total rows for requested block
      var rowsForBlock = allData.slice(request.startRow, request.endRow);
      // here we are pretending we don't know the last row until we reach it!
      var lastRow = getLastRowIndex(request, rowsForBlock);
      return {
        success: true,
        rows: rowsForBlock,
        lastRow: lastRow,
      };
    },
  };
}
function getLastRowIndex(request, results) {
  if (!results) return undefined;
  var currentLastRow = (request.startRow || 0) + results.length;
  // if on or after the last block, work out the last row, otherwise return 'undefined'
  return currentLastRow < (request.endRow || 0) ? currentLastRow : undefined;
}

render(<GridExample></GridExample>, document.querySelector('#root'));
