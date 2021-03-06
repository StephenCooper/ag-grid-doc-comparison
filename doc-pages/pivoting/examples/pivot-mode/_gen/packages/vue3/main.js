import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { AgGridVue } from 'ag-grid-vue3';
import { createApp } from 'vue';

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div style="margin-bottom: 5px;">
                    <button v-on:click="onBtNormal()">1 - Grouping Active</button>
                    <button v-on:click="onBtPivotMode()">2 - Grouping Active with Pivot Mode</button>
                    <button v-on:click="onBtFullPivot()">3 - Grouping Active with Pivot Mode and Pivot Active</button>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :autoGroupColumnDef="autoGroupColumnDef"
                :sideBar="sideBar"
                :rowData="rowData"></ag-grid-vue>
            </div>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: 'country', rowGroup: true, enableRowGroup: true },
        {
          field: 'year',
          rowGroup: true,
          enableRowGroup: true,
          enablePivot: true,
        },
        { field: 'date' },
        { field: 'sport' },
        { field: 'gold', aggFunc: 'sum' },
        { field: 'silver', aggFunc: 'sum' },
        { field: 'bronze', aggFunc: 'sum' },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        sortable: true,
        resizable: true,
      },
      autoGroupColumnDef: null,
      sideBar: null,
      rowData: null,
    };
  },
  created() {
    this.autoGroupColumnDef = {
      minWidth: 250,
    };
    this.sideBar = 'columns';
  },
  methods: {
    onBtNormal() {
      this.gridColumnApi.setPivotMode(false);
      this.gridColumnApi.applyColumnState({
        state: [
          { colId: 'country', rowGroup: true },
          { colId: 'year', rowGroup: true },
        ],
        defaultState: {
          pivot: false,
          rowGroup: false,
        },
      });
    },
    onBtPivotMode() {
      this.gridColumnApi.setPivotMode(true);
      this.gridColumnApi.applyColumnState({
        state: [
          { colId: 'country', rowGroup: true },
          { colId: 'year', rowGroup: true },
        ],
        defaultState: {
          pivot: false,
          rowGroup: false,
        },
      });
    },
    onBtFullPivot() {
      this.gridColumnApi.setPivotMode(true);
      this.gridColumnApi.applyColumnState({
        state: [
          { colId: 'country', rowGroup: true },
          { colId: 'year', pivot: true },
        ],
        defaultState: {
          pivot: false,
          rowGroup: false,
        },
      });
    },
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

createApp(VueExample).mount('#app');
