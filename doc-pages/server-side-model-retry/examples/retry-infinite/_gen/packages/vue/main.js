import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import 'ag-grid-enterprise';
import { AgGridVue } from 'ag-grid-vue';
import Vue from 'vue';

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div style="margin-bottom: 5px;">
                    <label><input type="checkbox" id="failLoad"> Make Loads Fail</label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <button v-on:click="onBtRetry()">Retry Failed Loads</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <button v-on:click="onBtReset()">Reset Entire Grid</button>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine-dark"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :autoGroupColumnDef="autoGroupColumnDef"
                :rowModelType="rowModelType"
                :serverSideStoreType="serverSideStoreType"
                :maxConcurrentDatasourceRequests="maxConcurrentDatasourceRequests"
                :suppressAggFuncInHeader="true"
                :purgeClosedRowNodes="true"
                :cacheBlockSize="cacheBlockSize"
                :animateRows="true"></ag-grid-vue>
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
          colId: 'country',
          valueGetter: 'data.country',
          rowGroup: true,
          hide: true,
        },
        { field: 'sport', rowGroup: true, hide: true },
        { field: 'year', minWidth: 100 },
        { field: 'gold', aggFunc: 'sum' },
        { field: 'silver', aggFunc: 'sum' },
        { field: 'bronze', aggFunc: 'sum' },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 120,
        resizable: true,
        sortable: true,
      },
      autoGroupColumnDef: null,
      rowModelType: null,
      serverSideStoreType: null,
      maxConcurrentDatasourceRequests: null,
      cacheBlockSize: null,
    };
  },
  created() {
    this.autoGroupColumnDef = {
      flex: 1,
      minWidth: 280,
      field: 'athlete',
    };
    this.rowModelType = 'serverSide';
    this.serverSideStoreType = 'partial';
    this.maxConcurrentDatasourceRequests = 1;
    this.cacheBlockSize = 20;
  },
  methods: {
    onBtRetry() {
      this.gridApi.retryServerSideLoads();
    },
    onBtReset() {
      this.gridApi.refreshServerSideStore({ purge: true });
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => {
        // setup the fake server with entire dataset
        var fakeServer = new FakeServer(data);
        // create datasource with a reference to the fake server
        var datasource = getServerSideDatasource(fakeServer);
        // register the datasource with the grid
        params.api.setServerSideDatasource(datasource);
      };

      fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

window.getServerSideDatasource = function getServerSideDatasource(server) {
  return {
    getRows: function (params) {
      console.log('[Datasource] - rows requested by grid: ', params.request);
      var response = server.getData(params.request);
      // adding delay to simulate real server call
      setTimeout(function () {
        if (response.success) {
          // call the success callback
          params.success({
            rowData: response.rows,
            rowCount: response.lastRow,
          });
        } else {
          // inform the grid request failed
          params.fail();
        }
      }, 1000);
    },
  };
};

new Vue({
  el: '#app',
  components: {
    'my-component': VueExample,
  },
});
