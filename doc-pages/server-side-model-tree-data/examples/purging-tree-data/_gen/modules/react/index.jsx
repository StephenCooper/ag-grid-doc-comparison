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
        { field: 'employeeId', hide: true },
        { field: 'employeeName', hide: true },
        { field: 'employmentType' },
        { field: 'startDate' },
      ],
      defaultColDef: {
        width: 235,
        resizable: true,
        flex: 1,
      },
      autoGroupColumnDef: {
        field: 'employeeName',
      },
      rowModelType: 'serverSide',
      serverSideStoreType: 'partial',
      cacheBlockSize: 10,
      isServerSideGroupOpenByDefault: function (params) {
        var isKathrynPowers =
          params.rowNode.level == 0 &&
          params.data.employeeName == 'Kathryn Powers';
        var isMabelWard =
          params.rowNode.level == 1 && params.data.employeeName == 'Mabel Ward';
        return isKathrynPowers || isMabelWard;
      },
      isServerSideGroup: function (dataItem) {
        // indicate if node is a group
        return dataItem.group;
      },
      getServerSideGroupKey: function (dataItem) {
        // specify which group key to use
        return dataItem.employeeName;
      },
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => {
      var fakeServer = createFakeServer(data);
      var datasource = createServerSideDatasource(fakeServer);
      params.api.setServerSideDatasource(datasource);
    };

    fetch('https://www.ag-grid.com/example-assets/tree-data.json')
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  refreshCache = (route) => {
    this.gridApi.refreshServerSideStore({ route: route, purge: true });
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="example-wrapper">
          <div style={{ marginBottom: '5px' }}>
            <button onClick={() => this.refreshCache([])}>
              Refresh Everything
            </button>
            <button
              onClick={() =>
                this.refreshCache(['Kathryn Powers', 'Mabel Ward'])
              }
            >
              Refresh ['Kathryn Powers','Mabel Ward']
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
              rowModelType={this.state.rowModelType}
              serverSideStoreType={this.state.serverSideStoreType}
              treeData={true}
              animateRows={true}
              cacheBlockSize={this.state.cacheBlockSize}
              isServerSideGroupOpenByDefault={
                this.state.isServerSideGroupOpenByDefault
              }
              isServerSideGroup={this.state.isServerSideGroup}
              getServerSideGroupKey={this.state.getServerSideGroupKey}
              onGridReady={this.onGridReady}
            />
          </div>
        </div>
      </div>
    );
  }
}

function createFakeServer(fakeServerData) {
  const fakeServer = {
    getData: function (request) {
      function extractRowsFromData(groupKeys, data) {
        if (groupKeys.length === 0) {
          return data.map(function (d) {
            return {
              group: !!d.underlings,
              employeeId: d.employeeId + '',
              employeeName: d.employeeName,
              employmentType: d.employmentType,
              startDate: d.startDate,
            };
          });
        }
        var key = groupKeys[0];
        for (var i = 0; i < data.length; i++) {
          if (data[i].employeeName === key) {
            return extractRowsFromData(
              groupKeys.slice(1),
              data[i].underlings.slice()
            );
          }
        }
      }
      return extractRowsFromData(request.groupKeys, fakeServerData);
    },
  };
  return fakeServer;
}
function createServerSideDatasource(fakeServer) {
  const dataSource = {
    getRows: function (params) {
      console.log('ServerSideDatasource.getRows: params = ', params);
      var request = params.request;
      var allRows = fakeServer.getData(request);
      var doingInfinite = request.startRow != null && request.endRow != null;
      var result = doingInfinite
        ? {
            rowData: allRows.slice(request.startRow, request.endRow),
            rowCount: allRows.length,
          }
        : { rowData: allRows };
      console.log('getRows: result = ', result);
      setTimeout(function () {
        params.success(result);
      }, 500);
    },
  };
  return dataSource;
}

render(<GridExample></GridExample>, document.querySelector('#root'));
