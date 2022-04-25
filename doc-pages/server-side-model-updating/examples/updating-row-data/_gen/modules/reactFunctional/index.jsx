'use strict';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ServerSideRowModelModule, RowGroupingModule]);

var idSequence = 0;

var allData = [];

// ******* Mock Server Implementation *********
// Note this a stripped down mock server implementation which only supports grouping
const getMockServerResponse = (request) => {
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
};

const group = (data, rowGroupColIds, groupKeys, parentId) => {
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
};

const updateServerRows = (rowsToUpdate) => {
  var updatedDataIds = rowsToUpdate.map(function (data) {
    return data.id;
  });
  for (var i = 0; i < allData.length; i++) {
    var updatedDataIndex = updatedDataIds.indexOf(allData[i].id);
    if (updatedDataIndex >= 0) {
      allData[i] = rowsToUpdate[updatedDataIndex];
    }
  }
};

const getGroupId = (parentId, key) => {
  return parentId ? parentId + '-' + key : key;
};

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

  const [columnDefs, setColumnDefs] = useState([
    { field: 'id', hide: true },
    { field: 'athlete' },
    { field: 'country', rowGroup: true, hide: true },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      width: 250,
      resizable: true,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => {
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
      });
  }, []);

  const refreshStore = useCallback(() => {
    gridRef.current.api.refreshServerSideStore({ purge: true });
  }, []);

  const updateSelectedRows = useCallback(() => {
    var idsToUpdate = gridRef.current.api
      .getSelectedNodes()
      .map(function (node) {
        return node.data.id;
      });
    var updatedRows = [];
    gridRef.current.api.forEachNode(function (rowNode) {
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
  }, []);

  const getRowId = useCallback((params) => {
    return params.data.id;
  }, []);

  // only select group rows
  const isRowSelectable = useCallback((rowNode) => {
    return !rowNode.group;
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div style={{ marginBottom: '5px' }}>
          <button onClick={updateSelectedRows}>Update Selected Rows</button>
          <button onClick={refreshStore}>Refresh Store</button>
        </div>

        <div style={gridStyle} className="ag-theme-alpine-dark">
          <AgGridReact
            ref={gridRef}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowSelection={'multiple'}
            rowModelType={'serverSide'}
            serverSideStoreType={'partial'}
            cacheBlockSize={75}
            animateRows={true}
            getRowId={getRowId}
            isRowSelectable={isRowSelectable}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector('#root'));
