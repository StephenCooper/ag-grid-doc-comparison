import { ModuleRegistry } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css';
import { AgGridVue } from '@ag-grid-community/vue';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import Vue from 'vue';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ServerSideRowModelModule, RowGroupingModule]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div style="margin-bottom: 5px;">
                    <button v-on:click="updateSelectedRows()">Update Selected Rows</button>
                    <button v-on:click="refreshStore()">Refresh Store</button>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine-dark"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowSelection="rowSelection"
                :rowModelType="rowModelType"
                :serverSideStoreType="serverSideStoreType"
                :cacheBlockSize="cacheBlockSize"
                :animateRows="true"
                :getRowId="getRowId"
                :isRowSelectable="isRowSelectable"></ag-grid-vue>
            </div>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: 'id', hide: true },
        { field: 'athlete' },
        { field: 'country', rowGroup: true, hide: true },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        width: 250,
        resizable: true,
      },
      rowSelection: null,
      rowModelType: null,
      serverSideStoreType: null,
      cacheBlockSize: null,
    };
  },
  created() {
    this.rowSelection = 'multiple';
    this.rowModelType = 'serverSide';
    this.serverSideStoreType = 'partial';
    this.cacheBlockSize = 75;
  },
  methods: {
    refreshStore() {
      this.gridApi.refreshServerSideStore({ purge: true });
    },
    updateSelectedRows() {
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
    },
    onGridReady(params) {
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
    },
    getRowId(params) {
      return params.data.id;
    },
    // only select group rows
    isRowSelectable(rowNode) {
      return !rowNode.group;
    },
  },
};

window.getMockServerResponse = // ******* Mock Server Implementation *********
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
  };

window.group = function group(data, rowGroupColIds, groupKeys, parentId) {
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

window.updateServerRows = function updateServerRows(rowsToUpdate) {
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

window.getGroupId = function getGroupId(parentId, key) {
  return parentId ? parentId + '-' + key : key;
};

var idSequence = 0;

var allData = [];

new Vue({
  el: '#app',
  components: {
    'my-component': VueExample,
  },
});
