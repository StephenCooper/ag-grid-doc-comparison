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
                :rowData="rowData"
                :rowHeight="rowHeight"></ag-grid-vue>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: 'symbol', maxWidth: 120 },
        { field: 'name', minWidth: 250 },
        {
          field: 'change',
          cellRenderer: 'agSparklineCellRenderer',
          cellRendererParams: {
            sparklineOptions: {
              type: 'column',
              fill: '#fac858',
              highlightStyle: { stroke: '#fac858' },
              padding: { top: 10, bottom: 10 },
              label: { enabled: true, placement: 'outsideEnd' },
            },
          },
        },
        { field: 'volume', type: 'numericColumn', maxWidth: 140 },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        resizable: true,
      },
      rowData: null,
      rowHeight: null,
    };
  },
  created() {
    this.rowData = getData();
    this.rowHeight = 80;
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
