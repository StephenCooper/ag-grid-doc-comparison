import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridVue } from 'ag-grid-vue';
import Vue from 'vue';

const VueExample = {
  template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowSelection="rowSelection"
                :rowMultiSelectWithClick="true"
                :rowData="rowData"></ag-grid-vue>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: 'athlete', minWidth: 150 },
        { field: 'age', maxWidth: 90 },
        { field: 'country', minWidth: 150 },
        { field: 'year', maxWidth: 90 },
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
        flex: 1,
        minWidth: 100,
      },
      rowSelection: null,
      rowData: null,
    };
  },
  created() {
    this.rowSelection = 'multiple';
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => params.api.setRowData(data);

      fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

new Vue({
  el: '#app',
  components: {
    'my-component': VueExample,
  },
});
