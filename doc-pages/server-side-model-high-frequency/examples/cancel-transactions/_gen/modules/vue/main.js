import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css";
import { AgGridVue } from "@ag-grid-community/vue";
import { ServerSideRowModelModule } from "@ag-grid-enterprise/server-side-row-model";
import Vue from "vue";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ServerSideRowModelModule]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div style="margin-bottom: 5px;">
                    <button v-on:click="onBtAdd()">Add</button>
                    <button v-on:click="onBtRefresh()">Refresh</button>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine-dark"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :isApplyServerSideTransaction="isApplyServerSideTransaction"
                :getRowId="getRowId"
                :rowModelType="rowModelType"
                :serverSideStoreType="serverSideStoreType"></ag-grid-vue>
            </div>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [{ field: "product" }, { field: "value" }],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        width: 250,
        resizable: true,
      },
      isApplyServerSideTransaction: null,
      getRowId: null,
      rowModelType: null,
      serverSideStoreType: null,
    };
  },
  created() {
    this.isApplyServerSideTransaction = (params) => {
      var tx = params.transaction;
      var storeInfo = params.storeInfo;
      var txCreatedSinceRowDataRead =
        tx.serverVersion > storeInfo.serverVersion;
      console.log(
        "tx.serverVersion = " +
          tx.serverVersion +
          ", storeInfo.serverVersion = " +
          storeInfo.serverVersion
      );
      if (txCreatedSinceRowDataRead) {
        console.log("Applying transaction");
        return true;
      } else {
        console.log("Cancelling transaction");
        return false;
      }
    };
    this.getRowId = (params) => {
      return params.data.product;
    };
    this.rowModelType = "serverSide";
    this.serverSideStoreType = "full";
  },
  methods: {
    onBtAdd() {
      var newProductName =
        all_products[Math.floor(all_products.length * Math.random())];
      var newItem = {
        product: newProductName + " " + newProductSequence++,
        value: Math.floor(Math.random() * 10000),
      };
      allServerSideData.push(newItem);
      serverVersion++;
      var tx = {
        add: [newItem],
        serverVersion: serverVersion,
      };
      this.gridApi.applyServerSideTransactionAsync(tx);
    },
    onBtRefresh() {
      this.gridApi.refreshServerSideStore({ purge: true });
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      setupData();
      var dataSource = {
        getRows: function (params2) {
          setTimeout(function () {
            var rowData = allServerSideData.slice();
            console.log(
              "getRows: found " + rowData.length + " records on server."
            );
            params2.success({
              rowData: rowData,
              storeInfo: { serverVersion: serverVersion },
            });
          }, 2000);
        },
      };
      params.api.setServerSideDatasource(dataSource);
    },
  },
};

window.setupData = function setupData() {
  products.forEach(function (product, index) {
    allServerSideData.push({
      product: product,
      value: Math.floor(Math.random() * 10000),
    });
  });
};

var products = ["Palm Oil", "Rubber", "Wool", "Amber", "Copper"];

var newProductSequence = 0;

var all_products = [
  "Palm Oil",
  "Rubber",
  "Wool",
  "Amber",
  "Copper",
  "Lead",
  "Zinc",
  "Tin",
  "Aluminium",
  "Aluminium Alloy",
  "Nickel",
  "Cobalt",
  "Molybdenum",
  "Recycled Steel",
  "Corn",
  "Oats",
  "Rough Rice",
  "Soybeans",
  "Rapeseed",
  "Soybean Meal",
  "Soybean Oil",
  "Wheat",
  "Milk",
  "Coca",
  "Coffee C",
  "Cotton No.2",
  "Sugar No.11",
  "Sugar No.14",
];

var allServerSideData = [];

var serverVersion = 0;

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
