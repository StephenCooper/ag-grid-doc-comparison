'use strict';

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ServerSideRowModelModule, RowGroupingModule]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: 'id', hide: true },
        { field: 'athlete' },
        { field: 'country', rowGroup: true, hide: true },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
      ],
      defaultColDef: {
        width: 250,
        resizable: true,
      },
      rowSelection: 'multiple',
      rowModelType: 'serverSide',
      serverSideStoreType: 'partial',
      cacheBlockSize: 75,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => {
      allData = data;
      // add id to data
      allData.forEach(function (item) {
        item.id = idSequence++;
      });
      var dataSource = {
        getRows: (params) => {
          // To make the demo look real, wait for 500ms before returning
          setTimeout(function () {
            var response = getMockServerResponse(params.request);
            // call the success callback
            params.success({
              rowData: response.rowsThisBlock,
              rowCount: response.lastRow,
            });
          }, 500);
        },
      };
      params.api.setServerSideDatasource(dataSource);
    };

    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  refreshStore = () => {
    this.gridApi.refreshServerSideStore({ purge: true });
  };

  updateSelectedRows = () => {
    var idsToUpdate = this.gridApi.getSelectedNodes().map(function (node) {
      return node.data.id;
    });
    var updatedRows = [];
    this.gridApi.forEachNode(function (rowNode) {
      if (idsToUpdate.indexOf(rowNode.data.id) >= 0) {
        // cloning underlying data otherwise the mock server data will also be updated
        var updated = JSON.parse(JSON.stringify(rowNode.data));
        // arbitrarily update medal count
        updated.gold += 1;
        updated.silver += 2;
        updated.bronze += 3;
        // directly update data in rowNode rather than requesting new data from server
        rowNode.setData(updated);
        // NOTE: setting row data will NOT change the row node ID - so if using getRowId() and the data changes
        // such that the ID will be different, the rowNode will not have it's ID updated!
        updatedRows.push(updated);
      }
    });
    // mimics server-side update
    updateServerRows(updatedRows);
  };

  getRowId = (params) => {
    return params.data.id;
  };

  // only select group rows
  isRowSelectable = (rowNode) => {
    return !rowNode.group;
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="example-wrapper">
          <div style={{ marginBottom: '5px' }}>
            <button onClick={() => this.updateSelectedRows()}>
              Update Selected Rows
            </button>
            <button onClick={() => this.refreshStore()}>Refresh Store</button>
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
              rowSelection={this.state.rowSelection}
              rowModelType={this.state.rowModelType}
              serverSideStoreType={this.state.serverSideStoreType}
              cacheBlockSize={this.state.cacheBlockSize}
              animateRows={true}
              getRowId={this.getRowId}
              isRowSelectable={this.isRowSelectable}
              onGridReady={this.onGridReady}
            />
          </div>
        </div>
      </div>
    );
  }
}

var idSequence = 0;
var allData = [];
// ******* Mock Server Implementation *********
// Note this a stripped down mock server implementation which only supports grouping
function getMockServerResponse(request) {
  var groupKeys = request.groupKeys;
  var rowGroupColIds = request.rowGroupCols.map(function (x) {
    return x.id;
  });
  var parentId = groupKeys.length > 0 ? groupKeys.join('') : '';
  var rows = group(allData, rowGroupColIds, groupKeys, parentId);
  var rowsThisBlock = rows.slice(request.startRow, request.endRow);
  rowsThisBlock.sort();
  var lastRow = rows.length <= (request.endRow || 0) ? rows.length : -1;
  return { rowsThisBlock: rowsThisBlock, lastRow: lastRow };
}
function group(data, rowGroupColIds, groupKeys, parentId) {
  var groupColId = rowGroupColIds.shift();
  if (!groupColId) return data;
  var groupedData = _(data)
    .groupBy(function (x) {
      return x[groupColId];
    })
    .value();
  if (groupKeys.length === 0) {
    return Object.keys(groupedData).map(function (key) {
      var res = {};
      // Note: the server provides group id's using a simple heuristic based on group keys:
      // i.e. group node ids will be in the following format: 'Russia', 'Russia-2002'
      res['id'] = getGroupId(parentId, key);
      res[groupColId] = key;
      return res;
    });
  }
  return group(
    groupedData[groupKeys.shift()],
    rowGroupColIds,
    groupKeys,
    parentId
  );
}
function updateServerRows(rowsToUpdate) {
  var updatedDataIds = rowsToUpdate.map(function (data) {
    return data.id;
  });
  for (var i = 0; i < allData.length; i++) {
    var updatedDataIndex = updatedDataIds.indexOf(allData[i].id);
    if (updatedDataIndex >= 0) {
      allData[i] = rowsToUpdate[updatedDataIndex];
    }
  }
}
function getGroupId(parentId, key) {
  return parentId ? parentId + '-' + key : key;
}

render(<GridExample></GridExample>, document.querySelector('#root'));
