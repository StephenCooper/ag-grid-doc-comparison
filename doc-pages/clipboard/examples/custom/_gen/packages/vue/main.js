import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { AgGridVue } from 'ag-grid-vue';
import Vue from 'vue';

const VueExample = {
  template: `
        <div style="height: 100%">
            <div style="padding-bottom: 5px;">
                <button v-on:click="onBtCopyRows()">Copy Selected Rows to Clipboard</button>
                <button v-on:click="onBtCopyRange()">Copy Selected Range to Clipboard</button>
            </div>
            <ag-grid-vue
                
                style="width: 100%; height: 93%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :enableRangeSelection="true"
                :rowSelection="rowSelection"
                :sendToClipboard="sendToClipboard"
                :rowData="rowData"></ag-grid-vue>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: 'athlete', minWidth: 200 },
        { field: 'age' },
        { field: 'country', minWidth: 150 },
        { field: 'year' },
        { field: 'date', minWidth: 150 },
        { field: 'sport', minWidth: 150 },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        editable: true,
        flex: 1,
        minWidth: 100,
        resizable: true,
      },
      rowSelection: null,
      rowData: null,
    };
  },
  created() {
    this.rowSelection = 'multiple';
  },
  methods: {
    onBtCopyRows() {
      this.gridApi.copySelectedRowsToClipboard();
    },
    onBtCopyRange() {
      this.gridApi.copySelectedRangeToClipboard();
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => params.api.setRowData(data);

      fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
    sendToClipboard(params) {
      console.log('send to clipboard called with data:');
      console.log(params.data);
    },
  },
};

new Vue({
  el: '#app',
  components: {
    'my-component': VueExample,
  },
});
