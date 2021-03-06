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
        { field: 'country', enableRowGroup: true, rowGroup: true, hide: true },
        { field: 'sport', enableRowGroup: true, rowGroup: true, hide: true },
        { field: 'year', minWidth: 100 },
        { field: 'gold', aggFunc: 'sum' },
        { field: 'silver', aggFunc: 'sum' },
        { field: 'bronze', aggFunc: 'sum' },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 120,
        resizable: true,
        sortable: true,
      },
      autoGroupColumnDef: {
        flex: 1,
        minWidth: 280,
      },
      getServerSideStoreParams: (params) => {
        var res = {
          storeType: params.level == 0 ? 'partial' : 'full',
        };
        return res;
      },
      rowModelType: 'serverSide',
      rowSelection: 'multiple',
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

  onBtRouteOfSelected = () => {
    var selectedNodes = this.gridApi.getSelectedNodes();
    selectedNodes.forEach(function (rowNode, index) {
      var route = rowNode.getRoute();
      var routeString = route ? route.join(',') : undefined;
      console.log('#' + index + ', route = [' + routeString + ']');
    });
  };

  getRowId = (params) => {
    return Math.random().toString();
  };

  isServerSideGroupOpenByDefault = (params) => {
    var route = params.rowNode.getRoute();
    if (!route) {
      return false;
    }
    var routeAsString = route.join(',');
    var routesToOpenByDefault = [
      'Zimbabwe',
      'Zimbabwe,Swimming',
      'United States,Swimming',
    ];
    return routesToOpenByDefault.indexOf(routeAsString) >= 0;
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="example-wrapper">
          <div style={{ marginBottom: '5px' }}>
            <button onClick={() => this.onBtRouteOfSelected()}>
              Route of Selected
            </button>
          </div>
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
              getServerSideStoreParams={this.state.getServerSideStoreParams}
              rowModelType={this.state.rowModelType}
              rowSelection={this.state.rowSelection}
              suppressAggFuncInHeader={true}
              animateRows={true}
              getRowId={this.getRowId}
              isServerSideGroupOpenByDefault={
                this.isServerSideGroupOpenByDefault
              }
              onGridReady={this.onGridReady}
            />
          </div>
        </div>
      </div>
    );
  }
}

function getServerSideDatasource(server) {
  return {
    getRows: (params) => {
      console.log('[Datasource] - rows requested by grid: ', params.request);
      var response = server.getData(params.request);
      // adding delay to simulate real server call
      setTimeout(function () {
        if (response.success) {
          // call the success callback
          params.success({
            rowData: response.rows,
            rowCount: response.lastRow,
          });
        } else {
          // inform the grid request failed
          params.fail();
        }
      }, 400);
    },
  };
}

render(<GridExample></GridExample>, document.querySelector('#root'));
