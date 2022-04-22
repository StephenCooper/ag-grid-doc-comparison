import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css';
import { AgGridVue } from '@ag-grid-community/vue3';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { createApp } from 'vue';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowGroupingModule,
  SetFilterModule,
]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="parent-container">
                <div class="top-container">
                    <button v-on:click="updateOneRecord()">Update One Value</button>
                    <button v-on:click="updateUsingTransaction()">Update Using Transaction</button>
                    <button v-on:click="removeUsingTransaction()">Remove Using Transaction</button>
                    <button v-on:click="addUsingTransaction()">Add Using Transaction</button>
                    <button v-on:click="changeGroupUsingTransaction()">Change Group Using Transaction</button>
                </div>
                <div class="center-container">
                    <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine-dark"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :autoGroupColumnDef="autoGroupColumnDef"
                :columnTypes="columnTypes"
                :aggregateOnlyChangedColumns="true"
                :aggFuncs="aggFuncs"
                :groupDefaultExpanded="groupDefaultExpanded"
                :suppressAggFuncInHeader="true"
                :animateRows="true"
                :getRowId="getRowId"></ag-grid-vue>
                </div>
            </div>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: 'topGroup', rowGroup: true, hide: true },
        { field: 'group', rowGroup: true, hide: true },
        {
          headerName: 'ID',
          field: 'id',
          cellClass: 'number-cell',
          maxWidth: 70,
        },
        { field: 'a', type: 'valueColumn' },
        { field: 'b', type: 'valueColumn' },
        { field: 'c', type: 'valueColumn' },
        { field: 'd', type: 'valueColumn' },
        {
          headerName: 'Total',
          type: 'totalColumn',
          minWidth: 120,
          valueGetter:
            "getValue('a') + getValue('b') + getValue('c') + getValue('d')",
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        sortable: true,
        resizable: true,
      },
      autoGroupColumnDef: null,
      columnTypes: null,
      aggFuncs: null,
      groupDefaultExpanded: null,
      getRowId: null,
    };
  },
  created() {
    this.autoGroupColumnDef = {
      minWidth: 180,
    };
    this.columnTypes = {
      valueColumn: {
        editable: true,
        aggFunc: 'sum',
        cellClass: 'number-cell',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        filter: 'agNumberColumnFilter',
        valueParser: numberValueParser,
      },
      totalColumn: {
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        cellClass: 'number-cell',
      },
    };
    this.aggFuncs = {
      sum: (params) => {
        var values = params && params.values ? params.values : [];
        var result = 0;
        if (values) {
          values.forEach(function (value) {
            if (typeof value === 'number') {
              result += value;
            }
          });
        }
        callCount++;
        console.log(
          callCount +
            ' aggregation: sum([' +
            values.join(',') +
            ']) = ' +
            result
        );
        return result;
      },
    };
    this.groupDefaultExpanded = 1;
    this.getRowId = (params) => {
      return params.data.id;
    };
  },
  methods: {
    updateOneRecord() {
      var rowNodeToUpdate = pickExistingRowNodeAtRandom(this.gridApi);
      if (!rowNodeToUpdate) return;
      var randomValue = createRandomNumber();
      var randomColumnId = pickRandomColumn();
      console.log(
        'updating ' + randomColumnId + ' to ' + randomValue + ' on ',
        rowNodeToUpdate.data
      );
      rowNodeToUpdate.setDataValue(randomColumnId, randomValue);
    },
    updateUsingTransaction() {
      var itemToUpdate = pickExistingRowItemAtRandom(this.gridApi);
      if (!itemToUpdate) {
        return;
      }
      console.log('updating - before', itemToUpdate);
      itemToUpdate[pickRandomColumn()] = createRandomNumber();
      itemToUpdate[pickRandomColumn()] = createRandomNumber();
      var transaction = {
        update: [itemToUpdate],
      };
      console.log('updating - after', itemToUpdate);
      this.gridApi.applyTransaction(transaction);
    },
    removeUsingTransaction() {
      var itemToRemove = pickExistingRowItemAtRandom(this.gridApi);
      if (!itemToRemove) {
        return;
      }
      var transaction = {
        remove: [itemToRemove],
      };
      console.log('removing', itemToRemove);
      this.gridApi.applyTransaction(transaction);
    },
    addUsingTransaction() {
      var i = Math.floor(Math.random() * 2);
      var j = Math.floor(Math.random() * 5);
      var k = Math.floor(Math.random() * 3);
      var newItem = createRowItem(i, j, k);
      var transaction = {
        add: [newItem],
      };
      console.log('adding', newItem);
      this.gridApi.applyTransaction(transaction);
    },
    changeGroupUsingTransaction() {
      var itemToUpdate = pickExistingRowItemAtRandom(this.gridApi);
      if (!itemToUpdate) {
        return;
      }
      itemToUpdate.topGroup =
        itemToUpdate.topGroup === 'Top' ? 'Bottom' : 'Top';
      var transaction = {
        update: [itemToUpdate],
      };
      console.log('updating', itemToUpdate);
      this.gridApi.applyTransaction(transaction);
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      params.api.setRowData(createRowData());
    },
  },
};

window.createRowData = function createRowData() {
  var result = [];
  for (var i = 1; i <= 2; i++) {
    for (var j = 1; j <= 5; j++) {
      for (var k = 1; k <= 3; k++) {
        var rowDataItem = createRowItem(i, j, k);
        result.push(rowDataItem);
      }
    }
  }
  return result;
};

window.createRowItem = function createRowItem(i, j, k) {
  var rowDataItem = {
    id: rowIdCounter++,
    a: (j * k * 863) % 100,
    b: (j * k * 811) % 100,
    c: (j * k * 743) % 100,
    d: (j * k * 677) % 100,
    topGroup: 'Bottom',
    group: 'Group B' + j,
  };
  if (i === 1) {
    rowDataItem.topGroup = 'Top';
    rowDataItem.group = 'Group A' + j;
  }
  return rowDataItem;
};

window.numberValueParser = function numberValueParser(params) { // converts strings to numbers
  console.log('=> updating to ' + params.newValue);
  return Number(params.newValue);
};

window.pickRandomColumn = function pickRandomColumn() {
  var letters = ['a', 'b', 'c', 'd'];
  var randomIndex = Math.floor(Math.random() * letters.length);
  return letters[randomIndex];
};

window.createRandomNumber = function createRandomNumber() {
  return Math.floor(Math.random() * 100);
};

window.pickExistingRowItemAtRandom = function pickExistingRowItemAtRandom(
  gridApi
) {
  var rowNode = pickExistingRowNodeAtRandom(gridApi);
  return rowNode ? rowNode.data : null;
};

window.pickExistingRowNodeAtRandom = function pickExistingRowNodeAtRandom(
  gridApi
) {
  var allItems = [];
  gridApi.forEachLeafNode(function (rowNode) {
    allItems.push(rowNode);
  });
  if (allItems.length === 0) {
    return undefined;
  }
  var result = allItems[Math.floor(Math.random() * allItems.length)];
  return result;
};

var rowIdCounter = 0;

var callCount = 0;

createApp(VueExample).mount('#app');
