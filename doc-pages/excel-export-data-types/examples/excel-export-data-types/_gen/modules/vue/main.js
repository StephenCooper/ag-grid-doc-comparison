import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { CsvExportModule } from '@ag-grid-community/csv-export';
import { AgGridVue } from '@ag-grid-community/vue';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';
import { MenuModule } from '@ag-grid-enterprise/menu';
import Vue from 'vue';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  CsvExportModule,
  ExcelExportModule,
  MenuModule,
]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div class="example-header">
                    <button v-on:click="onBtExport()" style="font-weight: bold;">Export to Excel</button>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"
                :excelStyles="excelStyles"
                :popupParent="popupParent"></ag-grid-vue>
            </div>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { headerName: 'provided', field: 'rawValue' },
        { headerName: 'number', field: 'rawValue', cellClass: 'numberType' },
        {
          headerName: 'currency',
          field: 'rawValue',
          cellClass: 'currencyFormat',
        },
        { headerName: 'boolean', field: 'rawValue', cellClass: 'booleanType' },
        {
          headerName: 'Negative',
          field: 'negativeValue',
          cellClass: 'negativeInBrackets',
        },
        { headerName: 'string', field: 'rawValue', cellClass: 'stringType' },
        {
          headerName: 'Date',
          field: 'dateValue',
          cellClass: 'dateType',
          minWidth: 220,
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        resizable: true,
      },
      rowData: null,
      excelStyles: null,
      popupParent: null,
    };
  },
  created() {
    this.rowData = [
      {
        rawValue: 1,
        negativeValue: -10,
        dateValue: '2009-04-20T00:00:00.000',
      },
    ];
    this.excelStyles = [
      {
        id: 'numberType',
        numberFormat: {
          format: '0',
        },
      },
      {
        id: 'currencyFormat',
        numberFormat: {
          format: '#,##0.00 ???',
        },
      },
      {
        id: 'negativeInBrackets',
        numberFormat: {
          format: '$[blue] #,##0;$ [red](#,##0)',
        },
      },
      {
        id: 'booleanType',
        dataType: 'Boolean',
      },
      {
        id: 'stringType',
        dataType: 'String',
      },
      {
        id: 'dateType',
        dataType: 'DateTime',
      },
    ];
    this.popupParent = document.body;
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

new Vue({
  el: '#app',
  components: {
    'my-component': VueExample,
  },
});
