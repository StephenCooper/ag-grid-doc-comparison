import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css';
import { AgGridVue } from '@ag-grid-community/vue3';
import { createApp } from 'vue';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine-dark"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"></ag-grid-vue>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { headerName: '#', maxWidth: 100, valueGetter: hashValueGetter },
        { field: 'a' },
        { field: 'b' },
        { headerName: 'A + B', colId: 'a&b', valueGetter: abValueGetter },
        { headerName: 'A * 1000', minWidth: 95, valueGetter: a1000ValueGetter },
        { headerName: 'B * 137', minWidth: 90, valueGetter: b137ValueGetter },
        { headerName: 'Random', minWidth: 90, valueGetter: randomValueGetter },
        { headerName: 'Chain', valueGetter: chainValueGetter },
        { headerName: 'Const', minWidth: 85, valueGetter: constValueGetter },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 75,
        // cellClass: 'number-cell'
      },
      rowData: null,
    };
  },
  created() {
    this.rowData = createRowData();
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

window.hashValueGetter = function hashValueGetter(params) {
  return params.node ? params.node.rowIndex : null;
};

window.abValueGetter = function abValueGetter(params) {
  return params.data.a + params.data.b;
};

window.a1000ValueGetter = function a1000ValueGetter(params) {
  return params.data.a * 1000;
};

window.b137ValueGetter = function b137ValueGetter(params) {
  return params.data.b * 137;
};

window.randomValueGetter = function randomValueGetter() {
  return Math.floor(Math.random() * 1000);
};

window.chainValueGetter = function chainValueGetter(params) {
  return params.getValue('a&b') * 1000;
};

window.constValueGetter = function constValueGetter() {
  return 99999;
};

window.createRowData = function createRowData() {
  var rowData = [];
  for (var i = 0; i < 100; i++) {
    rowData.push({
      a: Math.floor(i % 4),
      b: Math.floor(i % 7),
    });
  }
  return rowData;
};

createApp(VueExample).mount('#app');
