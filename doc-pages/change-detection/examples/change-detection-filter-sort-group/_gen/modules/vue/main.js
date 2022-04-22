import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css';
import { AgGridVue } from '@ag-grid-community/vue';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import Vue from 'vue';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowGroupingModule,
  SetFilterModule,
]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine-dark"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :autoGroupColumnDef="autoGroupColumnDef"
                :columnTypes="columnTypes"
                :rowData="rowData"
                :groupDefaultExpanded="groupDefaultExpanded"
                :suppressAggFuncInHeader="true"
                :animateRows="true"
                @cell-value-changed="onCellValueChanged"></ag-grid-vue>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: 'group', rowGroup: true, editable: true },
        { field: 'a', type: 'valueColumn' },
        { field: 'b', type: 'valueColumn' },
        { field: 'c', type: 'valueColumn' },
        { field: 'd', type: 'valueColumn' },
        {
          headerName: 'Total',
          type: 'totalColumn',
          valueGetter:
            "getValue('a') + getValue('b') + getValue('c') + getValue('d')",
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        sortable: true,
        filter: true,
      },
      autoGroupColumnDef: null,
      columnTypes: null,
      rowData: null,
      groupDefaultExpanded: null,
    };
  },
  created() {
    this.autoGroupColumnDef = {
      minWidth: 100,
    };
    this.columnTypes = {
      valueColumn: {
        editable: true,
        aggFunc: 'sum',
        valueParser: 'Number(newValue)',
        cellClass: 'number-cell',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        filter: 'agNumberColumnFilter',
      },
      totalColumn: {
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        cellClass: 'number-cell',
      },
    };
    this.rowData = getRowData();
    this.groupDefaultExpanded = 1;
  },
  methods: {
    onCellValueChanged(params) {
      var changedData = [params.data];
      params.api.applyTransaction({ update: changedData });
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

window.getRowData = function getRowData() {
  var rowData = [];
  for (var i = 1; i <= 10; i++) {
    rowData.push({
      group: i < 5 ? 'A' : 'B',
      a: (i * 863) % 100,
      b: (i * 811) % 100,
      c: (i * 743) % 100,
      d: (i * 677) % 100,
    });
  }
  return rowData;
};

new Vue({
  el: '#app',
  components: {
    'my-component': VueExample,
  },
});
