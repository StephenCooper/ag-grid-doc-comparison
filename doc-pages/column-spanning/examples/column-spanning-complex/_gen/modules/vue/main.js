import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { AgGridVue } from '@ag-grid-community/vue';
import Vue from 'vue';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :getRowHeight="getRowHeight"
                :rowData="rowData"
                :defaultColDef="defaultColDef"></ag-grid-vue>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        {
          headerName: 'Jan',
          field: 'jan',
          colSpan: (params) => {
            if (isHeaderRow(params)) {
              return 6;
            } else if (isQuarterRow(params)) {
              return 3;
            } else {
              return 1;
            }
          },
          cellClassRules: cellClassRules,
        },
        { headerName: 'Feb', field: 'feb' },
        { headerName: 'Mar', field: 'mar' },
        {
          headerName: 'Apr',
          field: 'apr',
          colSpan: (params) => {
            if (isQuarterRow(params)) {
              return 3;
            } else {
              return 1;
            }
          },
          cellClassRules: cellClassRules,
        },
        { headerName: 'May', field: 'may' },
        { headerName: 'Jun', field: 'jun' },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        width: 100,
      },
      getRowHeight: null,
      rowData: null,
    };
  },
  created() {
    this.getRowHeight = (params) => {
      if (isHeaderRow(params)) {
        return 60;
      }
    };
    this.rowData = getData();
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      params.api.sizeColumnsToFit();
    },
  },
};

window.isHeaderRow = function isHeaderRow(params) {
  return params.data.section === 'big-title';
};

window.isQuarterRow = function isQuarterRow(params) {
  return params.data.section === 'quarters';
};

var cellClassRules = {
  'header-cell': 'data.section === "big-title"',
  'quarters-cell': 'data.section === "quarters"',
};

new Vue({
  el: '#app',
  components: {
    'my-component': VueExample,
  },
});
