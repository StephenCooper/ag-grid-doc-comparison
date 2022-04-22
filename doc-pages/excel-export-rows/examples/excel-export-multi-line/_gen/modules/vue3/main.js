import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { CsvExportModule } from '@ag-grid-community/csv-export';
import { AgGridVue } from '@ag-grid-community/vue3';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { createApp } from 'vue';
import MultilineCellRenderer from './multilineCellRendererVue.js';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  ExcelExportModule,
  CsvExportModule,
]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="container">
                <div>
                    <button v-on:click="onBtExport()" style="margin: 5px 0px; font-weight: bold;">Export to Excel</button>
                </div>
                <div class="grid-wrapper">
                    <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"
                :excelStyles="excelStyles"></ag-grid-vue>
                </div>
            </div>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
    MultilineCellRenderer,
  },
  data: function () {
    return {
      columnDefs: [
        { field: 'address' },
        {
          headerName: 'Custom column',
          autoHeight: true,
          valueGetter: (param) => {
            return param.data.col1 + '\n' + param.data.col2;
          },
          cellRenderer: 'MultilineCellRenderer',
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        sortable: true,
        cellClass: 'multiline',
        filter: true,
        resizable: true,
        minWidth: 100,
        flex: 1,
      },
      rowData: null,
      excelStyles: null,
    };
  },
  created() {
    this.rowData = [
      {
        address:
          '1197 Thunder Wagon Common,\nCataract, RI, \n02987-1016, US, \n(401) 747-0763',
        col1: 'abc',
        col2: 'xyz',
      },
      {
        address:
          '3685 Rocky Glade, Showtucket, NU, \nX1E-9I0, CA, \n(867) 371-4215',
        col1: 'abc',
        col2: 'xyz',
      },
      {
        address:
          '3235 High Forest, Glen Campbell, MS, \n39035-6845, US, \n(601) 638-8186',
        col1: 'abc',
        col2: 'xyz',
      },
      {
        address:
          '2234 Sleepy Pony Mall , Drain, DC, \n20078-4243, US, \n(202) 948-3634',
        col1: 'abc',
        col2: 'xyz',
      },
    ];
    this.excelStyles = [
      {
        id: 'multiline',
        alignment: {
          wrapText: true,
        },
      },
    ];
  },
  methods: {
    onBtExport() {
      this.gridApi.exportDataAsExcel();
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

createApp(VueExample).mount('#app');
