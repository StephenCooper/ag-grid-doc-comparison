import { createApp } from "vue";
import { AgGridVue } from "@ag-grid-community/vue3";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ServerSideRowModelModule } from "@ag-grid-enterprise/server-side-row-model";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ServerSideRowModelModule, RowGroupingModule]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div style="margin-bottom: 5px;">
                    <button v-on:click="refreshCache([])">Refresh Top Level</button>
                    <button v-on:click="refreshCache(['Canada'])">Refresh [Canada]</button>
                    <button v-on:click="refreshCache(['Canada',2002])">Refresh [Canada,2002]</button>
                    <button v-on:click="getBlockState()">Print Block State</button>
                    <label><input type="checkbox" id="purge"> Purge</label>
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
                :suppressAggFuncInHeader="true"
                :rowGroupPanelShow="rowGroupPanelShow"
                :animateRows="true"
                :debug="true"></ag-grid-vue>
            </div>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: "country", rowGroup: true, enableRowGroup: true, hide: true },
        { field: "year", rowGroup: true, enableRowGroup: true, hide: true },
        { field: "version" },
        { field: "gold", aggFunc: "sum" },
        { field: "silver", aggFunc: "sum" },
        { field: "bronze", aggFunc: "sum" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        resizable: true,
        sortable: true,
      },
      autoGroupColumnDef: null,
      rowModelType: null,
      serverSideStoreType: null,
      rowGroupPanelShow: null,
    };
  },
  created() {
    this.autoGroupColumnDef = {
      flex: 1,
      minWidth: 280,
      field: "athlete",
    };
    this.rowModelType = "serverSide";
    this.serverSideStoreType = "full";
    this.rowGroupPanelShow = "always";
  },
  methods: {
    refreshCache(route) {
      versionCounter++;
      var purge = document.querySelector("#purge").checked === true;
      this.gridApi.refreshServerSideStore({ route: route, purge: purge });
    },
    getBlockState() {
      var blockState = this.gridApi.getCacheBlockState();
      console.log(blockState);
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

      fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

window.getServerSideDatasource = function getServerSideDatasource(server) {
  return {
    getRows: function (params) {
      console.log("[Datasource] - rows requested by grid: ", params.request);
      var response = server.getData(params.request);
      response.rows = response.rows.map(function (item) {
        var res = {};
        Object.assign(res, item);
        res.version =
          versionCounter + " - " + versionCounter + " - " + versionCounter;
        return res;
      });
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

var versionCounter = 1;

createApp(VueExample).mount("#app");
