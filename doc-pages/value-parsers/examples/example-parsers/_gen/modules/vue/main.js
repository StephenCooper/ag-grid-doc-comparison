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
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine-dark"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"
                @cell-value-changed="onCellValueChanged"></ag-grid-vue>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { headerName: 'Name', field: 'simple' },
        { headerName: 'Bad Number', field: 'numberBad' },
        {
          headerName: 'Good Number',
          field: 'numberGood',
          valueParser: numberParser,
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        editable: true,
        resizable: true,
      },
      rowData: null,
    };
  },
  created() {
    this.rowData = getData();
  },
  methods: {
    onCellValueChanged(event) {
      console.log('data after changes is: ', event.data);
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      params.api.sizeColumnsToFit();
    },
  },
};

window.numberParser = function numberParser(params) {
  return Number(params.newValue);
};

new Vue({
  el: '#app',
  components: {
    'my-component': VueExample,
  },
});
