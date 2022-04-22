import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { AgGridVue } from 'ag-grid-vue';
import Vue from 'vue';

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div style="margin-bottom: 5px;">
                    <button v-on:click="onNormalUpdate()">Normal Update</button>
                    <button v-on:click="onAsyncUpdate()">Async Update</button>
                    <span id="eMessage"></span>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :suppressAggFuncInHeader="true"
                :animateRows="true"
                :rowGroupPanelShow="rowGroupPanelShow"
                :pivotPanelShow="pivotPanelShow"
                :getRowId="getRowId"
                :defaultColDef="defaultColDef"
                :autoGroupColumnDef="autoGroupColumnDef"></ag-grid-vue>
            </div>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        {
          headerName: 'Product',
          field: 'product',
          enableRowGroup: true,
          enablePivot: true,
          rowGroupIndex: 0,
          hide: true,
        },
        {
          headerName: 'Portfolio',
          field: 'portfolio',
          enableRowGroup: true,
          enablePivot: true,
          rowGroupIndex: 1,
          hide: true,
        },
        {
          headerName: 'Book',
          field: 'book',
          enableRowGroup: true,
          enablePivot: true,
          rowGroupIndex: 2,
          hide: true,
        },
        { headerName: 'Trade', field: 'trade', width: 100 },
        {
          field: 'current',
          width: 200,
          aggFunc: 'sum',
          enableValue: true,
          cellClass: 'number',
          valueFormatter: numberCellFormatter,
          cellRenderer: 'agAnimateShowChangeCellRenderer',
        },
        {
          field: 'previous',
          width: 200,
          aggFunc: 'sum',
          enableValue: true,
          cellClass: 'number',
          valueFormatter: numberCellFormatter,
          cellRenderer: 'agAnimateShowChangeCellRenderer',
        },
        { field: 'dealType', enableRowGroup: true, enablePivot: true },
        {
          headerName: 'Bid',
          field: 'bidFlag',
          enableRowGroup: true,
          enablePivot: true,
          width: 100,
        },
        {
          headerName: 'PL 1',
          field: 'pl1',
          width: 200,
          aggFunc: 'sum',
          enableValue: true,
          cellClass: 'number',
          valueFormatter: numberCellFormatter,
          cellRenderer: 'agAnimateShowChangeCellRenderer',
        },
        {
          headerName: 'PL 2',
          field: 'pl2',
          width: 200,
          aggFunc: 'sum',
          enableValue: true,
          cellClass: 'number',
          valueFormatter: numberCellFormatter,
          cellRenderer: 'agAnimateShowChangeCellRenderer',
        },
        {
          headerName: 'Gain-DX',
          field: 'gainDx',
          width: 200,
          aggFunc: 'sum',
          enableValue: true,
          cellClass: 'number',
          valueFormatter: numberCellFormatter,
          cellRenderer: 'agAnimateShowChangeCellRenderer',
        },
        {
          headerName: 'SX / PX',
          field: 'sxPx',
          width: 200,
          aggFunc: 'sum',
          enableValue: true,
          cellClass: 'number',
          valueFormatter: numberCellFormatter,
          cellRenderer: 'agAnimateShowChangeCellRenderer',
        },
        {
          headerName: '99 Out',
          field: '_99Out',
          width: 200,
          aggFunc: 'sum',
          enableValue: true,
          cellClass: 'number',
          valueFormatter: numberCellFormatter,
          cellRenderer: 'agAnimateShowChangeCellRenderer',
        },
        {
          field: 'submitterID',
          width: 200,
          aggFunc: 'sum',
          enableValue: true,
          cellClass: 'number',
          valueFormatter: numberCellFormatter,
          cellRenderer: 'agAnimateShowChangeCellRenderer',
        },
        {
          field: 'submitterDealID',
          width: 200,
          aggFunc: 'sum',
          enableValue: true,
          cellClass: 'number',
          valueFormatter: numberCellFormatter,
          cellRenderer: 'agAnimateShowChangeCellRenderer',
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        width: 120,
        sortable: true,
        resizable: true,
      },
      rowGroupPanelShow: null,
      pivotPanelShow: null,
      getRowId: null,
      autoGroupColumnDef: null,
    };
  },
  created() {
    this.rowGroupPanelShow = 'always';
    this.pivotPanelShow = 'always';
    this.getRowId = (params) => {
      return params.data.trade;
    };
    this.autoGroupColumnDef = {
      width: 250,
    };
  },
  methods: {
    onNormalUpdate() {
      var startMillis = new Date().getTime();
      setMessage('Running Transaction');
      var api = this.gridApi;
      for (var i = 0; i < UPDATE_COUNT; i++) {
        setTimeout(function () {
          // pick one index at random
          var index = Math.floor(Math.random() * globalRowData.length);
          var itemToUpdate = globalRowData[index];
          var newItem = copyObject(itemToUpdate);
          // copy previous to current value
          newItem.previous = newItem.current;
          // then create new current value
          newItem.current = Math.floor(Math.random() * 100000) + 100;
          // do normal update. update is done before method returns
          api.applyTransaction({ update: [newItem] });
        }, 0);
      }
      // print message in next VM turn to allow browser to refresh first.
      // we assume the browser executes the timeouts in order they are created,
      // so this timeout executes after all the update timeouts created above.
      setTimeout(function () {
        var endMillis = new Date().getTime();
        var duration = endMillis - startMillis;
        setMessage('Transaction took ' + duration.toLocaleString() + 'ms');
      }, 0);
      function setMessage(msg) {
        var eMessage = document.querySelector('#eMessage');
        eMessage.innerHTML = msg;
      }
    },
    onAsyncUpdate() {
      var startMillis = new Date().getTime();
      setMessage('Running Async');
      var updatedCount = 0;
      var api = this.gridApi;
      for (var i = 0; i < UPDATE_COUNT; i++) {
        setTimeout(function () {
          // pick one index at random
          var index = Math.floor(Math.random() * globalRowData.length);
          var itemToUpdate = globalRowData[index];
          var newItem = copyObject(itemToUpdate);
          // copy previous to current value
          newItem.previous = newItem.current;
          // then create new current value
          newItem.current = Math.floor(Math.random() * 100000) + 100;
          // update using async method. passing the callback is
          // optional, we are doing it here so we know when the update
          // was processed by the grid.
          api.applyTransactionAsync({ update: [newItem] }, resultCallback);
        }, 0);
      }
      function resultCallback() {
        updatedCount++;
        if (updatedCount === UPDATE_COUNT) {
          // print message in next VM turn to allow browser to refresh
          setTimeout(function () {
            var endMillis = new Date().getTime();
            var duration = endMillis - startMillis;
            setMessage('Async took ' + duration.toLocaleString() + 'ms');
          }, 0);
        }
      }
      function setMessage(msg) {
        var eMessage = document.querySelector('#eMessage');
        eMessage.innerHTML = msg;
      }
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      getData();
      params.api.setRowData(globalRowData);
    },
  },
};

window.numberCellFormatter = function numberCellFormatter(params) {
  return Math.floor(params.value)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

window.copyObject = function copyObject(object) { // makes a copy of the original and merges in the new values
  // start with new object
  var newObject = {};
  // copy in the old values
  Object.keys(object).forEach(function (key) {
    newObject[key] = object[key];
  });
  return newObject;
};

// defined and updated in data.js
var UPDATE_COUNT = 200;

new Vue({
  el: '#app',
  components: {
    'my-component': VueExample,
  },
});
