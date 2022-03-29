import Vue from "vue";
import { AgGridVue } from "@ag-grid-community/vue";
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
                    <button v-on:click="refreshCache(undefined)">Refresh Top Level</button>
                    <button v-on:click="refreshCache(['Canada'])">Refresh [Canada]</button>
                    <button v-on:click="refreshCache(['Canada',2002])">Refresh [Canada,2002]</button>
                    <label><input type="checkbox" id="purge"> Purge</label>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine-dark"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :autoGroupColumnDef="autoGroupColumnDef"
                :getRowId="getRowId"
                :rowModelType="rowModelType"
                :serverSideStoreType="serverSideStoreType"
                :enableCellChangeFlash="true"
                :suppressAggFuncInHeader="true"
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
        { field: "country", rowGroup: true, hide: true },
        { field: "year", rowGroup: true, hide: true },
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
      getRowId: null,
      rowModelType: null,
      serverSideStoreType: null,
    };
  },
  created() {
    this.autoGroupColumnDef = {
      flex: 1,
      minWidth: 280,
      field: "athlete",
    };
    this.getRowId = (params) => {
      var data = params.data;
      var parts = [];
      if (data.country != null) {
        parts.push(data.country);
      }
      if (data.year != null) {
        parts.push(data.year);
      }
      if (data.id != null) {
        parts.push(data.id);
      }
      return parts.join("-");
    };
    this.rowModelType = "serverSide";
    this.serverSideStoreType = "full";
  },
  methods: {
    refreshCache(route) {
      versionCounter++;
      var purge = document.querySelector("#purge").checked === true;
      this.gridApi.refreshServerSideStore({ route: route, purge: purge });
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => {
        // give each data item an ID
        data.forEach(function (dataItem, index) {
          dataItem.id = index;
        });
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
        // for unique-id purposes in the client, we also want to attached
        // the parent group keys
        params.request.groupKeys.forEach(function (groupKey, index) {
          var col = params.request.rowGroupCols[index];
          var field = col.id;
          res[field] = groupKey;
        });
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

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
