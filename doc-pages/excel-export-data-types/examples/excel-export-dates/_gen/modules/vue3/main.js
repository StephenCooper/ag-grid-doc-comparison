import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { CsvExportModule } from '@ag-grid-community/csv-export';
import { AgGridVue } from '@ag-grid-community/vue3';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { createApp } from 'vue';

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
            <div class="page-wrapper">
                <div>
                    <button v-on:click="onBtnExportDataAsExcel()" style="margin-bottom: 5px; font-weight: bold;">Export to Excel</button>
                </div>
                <div class="grid-wrapper">
                    <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :excelStyles="excelStyles"
                :rowData="rowData"></ag-grid-vue>
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
        {
          field: 'date',
          headerName: 'ISO Format',
          cellClass: 'dateISO',
          minWidth: 150,
        },
        {
          field: 'date',
          headerName: 'dd/mm/yy',
          cellClass: 'dateUK',
          valueFormatter: (params) => {
            var date = new Date(params.value);
            var day = date.getDate().toString().padStart(2, '0');
            var month = (date.getMonth() + 1).toString().padStart(2, '0');
            var year = date.getFullYear().toString().substring(2);
            return day + '/' + month + '/' + year;
          },
        },
        {
          field: 'date',
          headerName: 'mm/dd/yy',
          cellClass: 'dateUS',
          valueFormatter: (params) => {
            var date = new Date(params.value);
            var day = date.getDate().toString().padStart(2, '0');
            var month = (date.getMonth() + 1).toString().padStart(2, '0');
            var year = date.getFullYear().toString().substring(2);
            return month + '/' + day + '/' + year;
          },
        },
        {
          field: 'date',
          headerName: 'dd/mm/yyy h:mm:ss AM/PM',
          cellClass: 'dateLong',
          minWidth: 150,
          valueFormatter: (params) => {
            var date = new Date(params.value);
            var day = date.getDate().toString().padStart(2, '0');
            var month = (date.getMonth() + 1).toString().padStart(2, '0');
            var year = date.getFullYear().toString();
            var hourNum = date.getHours() % 12;
            var hour = (hourNum === 0 ? 12 : hourNum)
              .toString()
              .padStart(2, '0');
            var min = date.getMinutes().toString().padStart(2, '0');
            var sec = date.getSeconds().toString().padStart(2, '0');
            var amPM = date.getHours() < 12 ? 'AM' : 'PM';
            return (
              day +
              '/' +
              month +
              '/' +
              year +
              ' ' +
              hour +
              ':' +
              min +
              ':' +
              sec +
              ' ' +
              amPM
            );
          },
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        resizable: true,
      },
      excelStyles: null,
      rowData: null,
    };
  },
  created() {
    this.excelStyles = [
      {
        id: 'dateISO',
        dataType: 'DateTime',
        numberFormat: {
          format: 'yyy-mm-ddThh:mm:ss',
        },
      },
      {
        id: 'dateUK',
        dataType: 'DateTime',
        numberFormat: {
          format: 'dd/mm/yy',
        },
      },
      {
        id: 'dateUS',
        dataType: 'DateTime',
        numberFormat: {
          format: 'mm/dd/yy',
        },
      },
      {
        id: 'dateLong',
        dataType: 'DateTime',
        numberFormat: {
          format: 'dd/mm/yyy h:mm:ss AM/PM',
        },
      },
    ];
    this.rowData = [
      { date: '2020-05-30T10:01:00' },
      { date: '2015-04-21T16:30:00' },
      { date: '2010-02-19T12:02:00' },
      { date: '1995-10-04T03:27:00' },
    ];
  },
  methods: {
    onBtnExportDataAsExcel() {
      this.gridApi.exportDataAsExcel();
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

createApp(VueExample).mount('#app');
