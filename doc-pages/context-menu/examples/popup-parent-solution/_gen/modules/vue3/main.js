import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { AgGridVue } from '@ag-grid-community/vue3';
import { ClipboardModule } from '@ag-grid-enterprise/clipboard';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { createApp } from 'vue';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  ExcelExportModule,
  ClipboardModule,
]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100px;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :rowData="rowData"
                :popupParent="popupParent"></ag-grid-vue>
            <div style="padding: 10px;">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc posuere lobortis est, sit amet molestie justo mattis et. Suspendisse congue condimentum tristique. Cras et purus vehicula, rhoncus ante sit amet, tempus nulla. Morbi vitae turpis id diam tincidunt luctus aliquet non ante. Ut elementum odio risus, eu condimentum lectus varius vitae. Praesent faucibus id ex commodo mattis. Duis egestas nibh ut libero accumsan blandit. Nunc mollis elit non sem tempor, sit amet posuere velit commodo. Cras convallis sem mattis, scelerisque turpis sed, scelerisque arcu. Mauris ac nunc purus. Aenean sit amet dapibus augue.
            </div>
            <div style="padding: 10px;">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc posuere lobortis est, sit amet molestie justo mattis et. Suspendisse congue condimentum tristique. Cras et purus vehicula, rhoncus ante sit amet, tempus nulla. Morbi vitae turpis id diam tincidunt luctus aliquet non ante. Ut elementum odio risus, eu condimentum lectus varius vitae. Praesent faucibus id ex commodo mattis. Duis egestas nibh ut libero accumsan blandit. Nunc mollis elit non sem tempor, sit amet posuere velit commodo. Cras convallis sem mattis, scelerisque turpis sed, scelerisque arcu. Mauris ac nunc purus. Aenean sit amet dapibus augue.
            </div>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: 'a' },
        { field: 'b' },
        { field: 'c' },
        { field: 'd' },
        { field: 'e' },
      ],
      gridApi: null,
      columnApi: null,

      rowData: null,
      popupParent: null,
    };
  },
  created() {
    this.rowData = [
      { a: 1, b: 1, c: 1, d: 1, e: 1 },
      { a: 2, b: 2, c: 2, d: 2, e: 2 },
    ];
    this.popupParent = document.querySelector('body');
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

createApp(VueExample).mount('#app');
