import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridVue } from 'ag-grid-vue3';
import { createApp } from 'vue';

const VueExample = {
  template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowModelType="rowModelType"
                :rowSelection="rowSelection"
                :maxBlocksInCache="maxBlocksInCache"
                :suppressRowClickSelection="true"
                :getRowId="getRowId"
                :datasource="datasource"></ag-grid-vue>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: getColumnDefs(),
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        resizable: true,
      },
      rowModelType: null,
      rowSelection: null,
      maxBlocksInCache: null,
      getRowId: null,
      datasource: null,
    };
  },
  created() {
    this.rowModelType = 'infinite';
    this.rowSelection = 'multiple';
    this.maxBlocksInCache = 2;
    this.getRowId = (params) => {
      return params.data.a;
    };
    this.datasource = getDataSource(100);
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

window.getColumnDefs = function getColumnDefs() {
  const columnDefs = [
    { checkboxSelection: true, headerName: '', width: 60 },
    { headerName: '#', width: 80, valueGetter: 'node.rowIndex' },
  ];
  ALPHABET.forEach(function (letter) {
    columnDefs.push({
      headerName: letter.toUpperCase(),
      field: letter,
      width: 150,
    });
  });
  return columnDefs;
};

window.getDataSource = function getDataSource(count) {
  const dataSource = {
    rowCount: count,
    getRows: function (params) {
      var rowsThisPage = [];
      for (
        var rowIndex = params.startRow;
        rowIndex < params.endRow;
        rowIndex++
      ) {
        var record = {};
        ALPHABET.forEach(function (letter, colIndex) {
          var randomNumber = 17 + rowIndex + colIndex;
          var cellKey = letter.toUpperCase() + (rowIndex + 1);
          record[letter] = cellKey + ' = ' + randomNumber;
        });
        rowsThisPage.push(record);
      }
      // to mimic server call, we reply after a short delay
      setTimeout(function () {
        // no need to pass the second 'rowCount' parameter as we have already provided it
        params.successCallback(rowsThisPage);
      }, 100);
    },
  };
  return dataSource;
};

var ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');

createApp(VueExample).mount('#app');
