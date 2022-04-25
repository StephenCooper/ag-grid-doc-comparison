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
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
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
        {
          field: 'sale',
          headerName: 'Sale ($)',
          filter: 'agNumberColumnFilter',
          floatingFilter: true,
          valueFormatter: numberValueFormatter,
        },
        {
          field: 'sale',
          headerName: 'Sale',
          filter: 'agNumberColumnFilter',
          floatingFilter: true,
          filterParams: saleFilterParams,
          valueFormatter: saleValueFormatter,
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 150,
      },
      rowData: null,
    };
  },
  created() {
    this.rowData = getData();
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

var numberValueFormatter = function (params) {
  return params.value.toFixed(2);
};

var saleFilterParams = {
  allowedCharPattern: '\\d\\-\\,\\$',
  numberParser: (text) => {
    return text == null
      ? null
      : parseFloat(text.replace(',', '.').replace('$', ''));
  },
};

var saleValueFormatter = function (params) {
  var formatted = params.value.toFixed(2).replace('.', ',');
  if (formatted.indexOf('-') === 0) {
    return '-$' + formatted.slice(1);
  }
  return '$' + formatted;
};

createApp(VueExample).mount('#app');
