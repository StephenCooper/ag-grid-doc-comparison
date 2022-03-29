import Vue from "vue";
import { AgGridVue } from "ag-grid-vue";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";

const VueExample = {
  template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine-dark"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :columnTypes="columnTypes"
                :rowModelType="rowModelType"
                :serverSideStoreType="serverSideStoreType"
                :animateRows="true"></ag-grid-vue>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: "athlete", filter: "agTextColumnFilter", minWidth: 220 },
        {
          field: "year",
          filter: "agNumberColumnFilter",
          filterParams: {
            buttons: ["reset"],
            debounceMs: 1000,
            suppressAndOrCondition: true,
          },
        },
        { field: "gold", type: "number" },
        { field: "silver", type: "number" },
        { field: "bronze", type: "number" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        sortable: true,
        resizable: true,
        menuTabs: ["filterMenuTab"],
      },
      columnTypes: null,
      rowModelType: null,
      serverSideStoreType: null,
    };
  },
  created() {
    this.columnTypes = {
      number: { filter: "agNumberColumnFilter" },
    };
    this.rowModelType = "serverSide";
    this.serverSideStoreType = "partial";
  },
  methods: {
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
      // get data for request from our fake server
      var response = server.getData(params.request);
      // simulating real server call with a 500ms delay
      setTimeout(function () {
        if (response.success) {
          // supply rows for requested block to grid
          params.success({
            rowData: response.rows,
            rowCount: response.lastRow,
          });
        } else {
          params.fail();
        }
      }, 500);
    },
  };
};

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
