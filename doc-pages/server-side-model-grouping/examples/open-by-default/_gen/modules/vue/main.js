import { ModuleRegistry } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css';
import { AgGridVue } from '@ag-grid-community/vue';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import Vue from 'vue';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ServerSideRowModelModule]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div style="margin-bottom: 5px;">
                    <button v-on:click="onBtRouteOfSelected()">Route of Selected</button>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine-dark"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :autoGroupColumnDef="autoGroupColumnDef"
                :getServerSideStoreParams="getServerSideStoreParams"
                :rowModelType="rowModelType"
                :rowSelection="rowSelection"
                :suppressAggFuncInHeader="true"
                :animateRows="true"
                :getRowId="getRowId"
                :isServerSideGroupOpenByDefault="isServerSideGroupOpenByDefault"></ag-grid-vue>
            </div>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: 'country', enableRowGroup: true, rowGroup: true, hide: true },
        { field: 'sport', enableRowGroup: true, rowGroup: true, hide: true },
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
      getServerSideStoreParams: null,
      rowModelType: null,
      rowSelection: null,
    };
  },
  created() {
    this.autoGroupColumnDef = {
      flex: 1,
      minWidth: 280,
    };
    this.getServerSideStoreParams = (params) => {
      var res = {
        storeType: params.level == 0 ? 'partial' : 'full',
      };
      return res;
    };
    this.rowModelType = 'serverSide';
    this.rowSelection = 'multiple';
  },
  methods: {
    onBtRouteOfSelected() {
      var selectedNodes = this.gridApi.getSelectedNodes();
      selectedNodes.forEach(function (rowNode, index) {
        var route = rowNode.getRoute();
        var routeString = route ? route.join(',') : undefined;
        console.log('#' + index + ', route = [' + routeString + ']');
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
    getRowId(params) {
      return Math.random().toString();
    },
    isServerSideGroupOpenByDefault(params) {
      var route = params.rowNode.getRoute();
      if (!route) {
        return false;
      }
      var routeAsString = route.join(',');
      var routesToOpenByDefault = [
        'Zimbabwe',
        'Zimbabwe,Swimming',
        'United States,Swimming',
      ];
      return routesToOpenByDefault.indexOf(routeAsString) >= 0;
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
      }, 400);
    },
  };
};

new Vue({
  el: '#app',
  components: {
    'my-component': VueExample,
  },
});
