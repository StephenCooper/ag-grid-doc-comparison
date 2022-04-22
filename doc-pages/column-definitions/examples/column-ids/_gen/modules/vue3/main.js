import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { AgGridVue } from '@ag-grid-community/vue3';
import { createApp } from 'vue';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <div style="height: 100%; box-sizing: border-box;">
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :rowData="rowData"></ag-grid-vue>
            </div>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { headerName: 'Col 1', colId: 'firstCol', field: 'height' },
        { headerName: 'Col 2', colId: 'firstCol', field: 'height' },
        { headerName: 'Col 3', field: 'height' },
        { headerName: 'Col 4', field: 'height' },
        { headerName: 'Col 5', valueGetter: 'data.width' },
        { headerName: 'Col 6', valueGetter: 'data.width' },
      ],
      gridApi: null,
      columnApi: null,

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

      var cols = params.columnApi.getAllColumns();
      cols.forEach(function (col) {
        var colDef = col.getColDef();
        console.log(
          colDef.headerName + ', Column ID = ' + col.getId(),
          JSON.stringify(colDef)
        );
      });
    },
  },
};

window.createRowData = function createRowData() {
  var data = [];
  for (var i = 0; i < 20; i++) {
    data.push({
      height: Math.floor(Math.random() * 100),
      width: Math.floor(Math.random() * 100),
      depth: Math.floor(Math.random() * 100),
    });
  }
  return data;
};

createApp(VueExample).mount('#app');
