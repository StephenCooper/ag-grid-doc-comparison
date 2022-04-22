import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css';
import { AgGridVue } from '@ag-grid-community/vue';
import Vue from 'vue';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div class="example-header">
                    <div>
                        <button v-on:click="scrambleAndRefreshAll()">Scramble &amp; Refresh All</button>
                        <button v-on:click="scrambleAndRefreshLeftToRight()">Scramble &amp; Refresh Left to Right</button>
                        <button v-on:click="scrambleAndRefreshTopToBottom()">Scramble &amp; Refresh Top to Bottom</button>
                    </div>
                    <div>
                        <label>
                            <input type="checkbox" id="forceRefresh">
                            Force Refresh
                        </label>
                        <label>
                            <input type="checkbox" id="suppressFlash">
                            Suppress Flash
                        </label>
                    </div>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine-dark"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"
                :pinnedTopRowData="pinnedTopRowData"
                :pinnedBottomRowData="pinnedBottomRowData"
                :enableCellChangeFlash="true"></ag-grid-vue>
            </div>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: 'a', suppressCellFlash: true },
        { field: 'b' },
        { field: 'c' },
        { field: 'd' },
        { field: 'e' },
        { field: 'f' },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
      },
      rowData: null,
      pinnedTopRowData: null,
      pinnedBottomRowData: null,
    };
  },
  created() {
    this.rowData = [];
    this.pinnedTopRowData = [];
    this.pinnedBottomRowData = [];
  },
  methods: {
    scrambleAndRefreshAll() {
      scramble();
      var params = {
        force: isForceRefreshSelected(),
        suppressFlash: isSuppressFlashSelected(),
      };
      this.gridApi.refreshCells(params);
    },
    scrambleAndRefreshLeftToRight() {
      scramble();
      var api = this.gridApi;
      ['a', 'b', 'c', 'd', 'e', 'f'].forEach(function (col, index) {
        var millis = index * 100;
        var params = {
          force: isForceRefreshSelected(),
          suppressFlash: isSuppressFlashSelected(),
          columns: [col],
        };
        callRefreshAfterMillis(params, millis, api);
      });
    },
    scrambleAndRefreshTopToBottom() {
      scramble();
      var frame = 0;
      var i;
      var rowNode;
      var api = this.gridApi;
      for (i = 0; i < api.getPinnedTopRowCount(); i++) {
        rowNode = api.getPinnedTopRow(i);
        refreshRow(rowNode, api);
      }
      for (i = 0; i < api.getDisplayedRowCount(); i++) {
        rowNode = api.getDisplayedRowAtIndex(i);
        refreshRow(rowNode, api);
      }
      for (i = 0; i < api.getPinnedBottomRowCount(); i++) {
        rowNode = api.getPinnedBottomRow(i);
        refreshRow(rowNode, api);
      }
      function refreshRow(rowNode, api) {
        var millis = frame++ * 100;
        var rowNodes = [rowNode]; // params needs an array
        var params = {
          force: isForceRefreshSelected(),
          suppressFlash: isSuppressFlashSelected(),
          rowNodes: rowNodes,
        };
        callRefreshAfterMillis(params, millis, api);
      }
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      // placing in 13 rows, so there are exactly enough rows to fill the grid, makes
      // the row animation look nice when you see all the rows
      data = createData(14);
      topRowData = createData(2);
      bottomRowData = createData(2);
      params.api.setRowData(data);
      params.api.setPinnedTopRowData(topRowData);
      params.api.setPinnedBottomRowData(bottomRowData);
    },
  },
};

window.createData = function createData(count) {
  var result = [];
  for (var i = 1; i <= count; i++) {
    result.push({
      a: (i * 863) % 100,
      b: (i * 811) % 100,
      c: (i * 743) % 100,
      d: (i * 677) % 100,
      e: (i * 619) % 100,
      f: (i * 571) % 100,
    });
  }
  return result;
};

window.isForceRefreshSelected = function isForceRefreshSelected() {
  return document.querySelector('#forceRefresh').checked;
};

window.isSuppressFlashSelected = function isSuppressFlashSelected() {
  return document.querySelector('#suppressFlash').checked;
};

window.callRefreshAfterMillis = function callRefreshAfterMillis(
  params,
  millis,
  gridApi
) {
  setTimeout(function () {
    gridApi.refreshCells(params);
  }, millis);
};

window.scramble = function scramble() {
  data.forEach(scrambleItem);
  topRowData.forEach(scrambleItem);
  bottomRowData.forEach(scrambleItem);
};

window.scrambleItem = function scrambleItem(item) {
  ['a', 'b', 'c', 'd', 'e', 'f'].forEach(function (colId) {
    // skip 50% of the cells so updates are random
    if (Math.random() > 0.5) {
      return;
    }
    item[colId] = Math.floor(Math.random() * 100);
  });
};

// placing in 13 rows, so there are exactly enough rows to fill the grid, makes
// the row animation look nice when you see all the rows
var data = [];

var topRowData = [];

var bottomRowData = [];

new Vue({
  el: '#app',
  components: {
    'my-component': VueExample,
  },
});
