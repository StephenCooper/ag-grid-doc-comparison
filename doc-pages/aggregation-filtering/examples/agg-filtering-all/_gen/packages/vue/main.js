import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
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
                :autoGroupColumnDef="autoGroupColumnDef"
                :groupDefaultExpanded="groupDefaultExpanded"
                :groupAggFiltering="true"
                :rowData="rowData"></ag-grid-vue>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: 'country', rowGroup: true, hide: true },
        { field: 'sport', rowGroup: true, hide: true },
        { field: 'athlete', hide: true },
        { field: 'year' },
        { field: 'total', aggFunc: 'sum', filter: 'agNumberColumnFilter' },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        filter: true,
        floatingFilter: true,
        resizable: true,
      },
      autoGroupColumnDef: null,
      groupDefaultExpanded: null,
      rowData: null,
    };
  },
  created() {
    this.autoGroupColumnDef = {
      field: 'athlete',
    };
    this.groupDefaultExpanded = -1;
    this.rowData = getData();
  },
  methods: {
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
