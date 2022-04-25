import { ModuleRegistry } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css';
import { AgGridVue } from '@ag-grid-community/vue3';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import { createApp } from 'vue';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ServerSideRowModelModule]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div style="margin-bottom: 5px;">
                    <button v-on:click="onBtStoreState()">Store State</button>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine-dark"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowGroupPanelShow="rowGroupPanelShow"
                :serverSideStoreType="serverSideStoreType"
                :autoGroupColumnDef="autoGroupColumnDef"
                :cacheBlockSize="cacheBlockSize"
                :rowModelType="rowModelType"
                :getServerSideStoreParams="getServerSideStoreParams"
                :suppressAggFuncInHeader="true"
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
        { field: 'country', enableRowGroup: true, rowGroup: true },
        { field: 'sport', enableRowGroup: true, rowGroup: true },
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
      rowGroupPanelShow: null,
      serverSideStoreType: null,
      autoGroupColumnDef: null,
      cacheBlockSize: null,
      rowModelType: null,
      getServerSideStoreParams: null,
    };
  },
  created() {
    this.rowGroupPanelShow = 'always';
    this.serverSideStoreType = 'full';
    this.autoGroupColumnDef = {
      flex: 1,
      minWidth: 280,
    };
    this.cacheBlockSize = 4;
    this.rowModelType = 'serverSide';
    this.getServerSideStoreParams = (params) => {
      var noGroupingActive = params.rowGroupColumns.length == 0;
      var res;
      if (noGroupingActive) {
        res = {
          // infinite scrolling
          storeType: 'partial',
          // 100 rows per block
          cacheBlockSize: 100,
          // purge blocks that are not needed
          maxBlocksInCache: 2,
        };
      } else {
        var topLevelRows = params.level == 0;
        res = {
          storeType: topLevelRows ? 'full' : 'partial',
          cacheBlockSize: params.level == 1 ? 5 : 2,
          maxBlocksInCache: -1, // never purge blocks
        };
      }
      console.log('############## NEW STORE ##############');
      console.log(
        'getServerSideStoreParams, level = ' +
          params.level +
          ', result = ' +
          JSON.stringify(res)
      );
      return res;
    };
  },
  methods: {
    onBtStoreState() {
      var storeState = this.gridApi.getServerSideStoreState();
      console.log('Store States:');
      storeState.forEach(function (state, index) {
        console.log(
          index +
            ' - ' +
            JSON.stringify(state).replace(/"/g, '').replace(/,/g, ', ')
        );
      });
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
    getRows: (params) => {
      console.log('[Datasource] - rows requested by grid: ', params.request);
      var response = server.getData(params.request);
      // adding delay to simulate real server call
      setTimeout(function () {
        if (response.success) {
          // call the success callback
          params.success({
            rowData: response.rows,
            rowCount: response.lastRow,
            storeInfo: {
              lastLoadedTime: new Date().toLocaleString(),
              randomValue: Math.random(),
            },
          });
        } else {
          // inform the grid request failed
          params.fail();
        }
      }, 400);
    },
  };
};

createApp(VueExample).mount('#app');
