import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import { AgGridVue } from 'ag-grid-vue3';
import { createApp } from 'vue';

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
        { headerName: 'A', field: 'a' },
        { headerName: 'B', field: 'b' },
        { headerName: '£A', field: 'a', valueFormatter: currencyFormatter },
        { headerName: '£B', field: 'b', valueFormatter: currencyFormatter },
        { headerName: '(A)', field: 'a', valueFormatter: bracketsFormatter },
        { headerName: '(B)', field: 'b', valueFormatter: bracketsFormatter },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        cellClass: 'number-cell',
        resizable: true,
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

window.bracketsFormatter = function bracketsFormatter(params) {
  return '(' + params.value + ')';
};

window.currencyFormatter = function currencyFormatter(params) {
  return '£' + formatNumber(params.value);
};

window.formatNumber = function formatNumber(number) {
  // this puts commas into the number eg 1000 goes to 1,000,
  // i pulled this from stack overflow, i have no idea how it works
  return Math.floor(number)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

window.createRowData = function createRowData() {
  var rowData = [];
  for (var i = 0; i < 100; i++) {
    rowData.push({
      a: Math.floor(((i + 2) * 173456) % 10000),
      b: Math.floor(((i + 7) * 373456) % 10000),
    });
  }
  return rowData;
};

createApp(VueExample).mount('#app');
