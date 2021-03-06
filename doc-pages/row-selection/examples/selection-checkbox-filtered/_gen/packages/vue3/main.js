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
                    <button v-on:click="filterSwimming()">Filter Only Swimming</button>
                    <button v-on:click="ages16And20()">Filter Only ages 16 and 20</button>
                    <button v-on:click="clearFilter()" style="margin-left: 10px;">Clear Filter</button>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :autoGroupColumnDef="autoGroupColumnDef"
                :rowSelection="rowSelection"
                :groupSelectsChildren="true"
                :groupSelectsFiltered="true"
                :suppressAggFuncInHeader="true"
                :suppressRowClickSelection="true"
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
        { field: 'country', rowGroup: true, hide: true },
        { field: 'sport', rowGroup: true, hide: true },
        { field: 'age', minWidth: 120, aggFunc: 'sum' },
        { field: 'year', maxWidth: 120 },
        { field: 'date', minWidth: 150 },
        { field: 'gold', aggFunc: 'sum' },
        { field: 'silver', aggFunc: 'sum' },
        { field: 'bronze', aggFunc: 'sum' },
        { field: 'total', aggFunc: 'sum' },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        filter: true,
        resizable: true,
      },
      autoGroupColumnDef: null,
      rowSelection: null,
      rowData: null,
    };
  },
  created() {
    this.autoGroupColumnDef = {
      headerName: 'Athlete',
      field: 'athlete',
      minWidth: 250,
      cellRenderer: 'agGroupCellRenderer',
      cellRendererParams: {
        checkbox: true,
      },
    };
    this.rowSelection = 'multiple';
  },
  methods: {
    filterSwimming() {
      this.gridApi.setFilterModel({
        sport: {
          type: 'set',
          values: ['Swimming'],
        },
      });
    },
    ages16And20() {
      this.gridApi.setFilterModel({
        age: {
          type: 'set',
          values: ['16', '20'],
        },
      });
    },
    clearFilter() {
      this.gridApi.setFilterModel(null);
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
