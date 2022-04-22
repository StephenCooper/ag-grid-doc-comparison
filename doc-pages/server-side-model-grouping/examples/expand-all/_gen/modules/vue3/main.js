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
                    <button v-on:click="onBtExpandAll()">Expand All</button>
                    &nbsp;&nbsp;&nbsp;
                    <button v-on:click="onBtCollapseAll()">Collapse All</button>
                    &nbsp;&nbsp;&nbsp;
                    <button v-on:click="onBtExpandTopLevel()">Expand Top Level Only</button>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine-dark"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :autoGroupColumnDef="autoGroupColumnDef"
                :maxConcurrentDatasourceRequests="maxConcurrentDatasourceRequests"
                :rowModelType="rowModelType"
                :serverSideStoreType="serverSideStoreType"
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
        {
          field: 'year',
          enableRowGroup: true,
          rowGroup: true,
          hide: true,
          minWidth: 100,
        },
        { field: 'country', enableRowGroup: true, rowGroup: true, hide: true },
        { field: 'sport', enableRowGroup: true, rowGroup: true, hide: true },
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
      maxConcurrentDatasourceRequests: null,
      rowModelType: null,
      serverSideStoreType: null,
    };
  },
  created() {
    this.autoGroupColumnDef = {
      flex: 1,
      minWidth: 280,
    };
    this.maxConcurrentDatasourceRequests = 1;
    this.rowModelType = 'serverSide';
    this.serverSideStoreType = 'full';
  },
  methods: {
    onBtExpandAll() {
      this.gridApi.expandAll();
    },
    onBtCollapseAll() {
      this.gridApi.collapseAll();
    },
    onBtExpandTopLevel() {
      this.gridApi.forEachNode(function (node) {
        if (node.group && node.level == 0) {
          node.setExpanded(true);
        }
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
            storeInfo: {
              lastLoadedTime: new Date().toLocaleString(),
              randomValue: Math.random(),
            },
          });
        } else {
          // inform the grid request failed
          params.fail();
        }
      }, 200);
    },
  };
};

createApp(VueExample).mount('#app');
