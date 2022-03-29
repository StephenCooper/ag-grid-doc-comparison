import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css";
import { AgGridVue } from "@ag-grid-community/vue3";
import { ServerSideRowModelModule } from "@ag-grid-enterprise/server-side-row-model";
import { createApp } from "vue";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ServerSideRowModelModule]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div style="margin-bottom: 5px;">
                    <button v-on:click="onBtAdd()">Add</button>
                    <button v-on:click="onBtFlush()">Flush</button>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine-dark"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :getRowId="getRowId"
                :rowSelection="rowSelection"
                :serverSideStoreType="serverSideStoreType"
                :rowModelType="rowModelType"
                :animateRows="true"
                :asyncTransactionWaitMillis="asyncTransactionWaitMillis"
                @async-transactions-flushed="onAsyncTransactionsFlushed"></ag-grid-vue>
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
      getRowId: null,
      rowSelection: null,
      serverSideStoreType: null,
      rowModelType: null,
      asyncTransactionWaitMillis: null,
    };
  },
  created() {
    this.getRowId = (params) => {
      return params.data.product;
    };
    this.rowSelection = "multiple";
    this.serverSideStoreType = "full";
    this.rowModelType = "serverSide";
    this.asyncTransactionWaitMillis = 4000;
  },
  methods: {
    onAsyncTransactionsFlushed(e) {
      var summary = {};
      e.results.forEach((result) => {
        var status = result.status;
        if (summary[status] == null) {
          summary[status] = 0;
        }
        summary[status]++;
      });
      console.log("onAsyncTransactionsFlushed: " + JSON.stringify(summary));
    },
    onBtAdd() {
      var newProductName =
        all_products[Math.floor(all_products.length * Math.random())];
      var newItem = {
        product: newProductName + " " + newProductSequence++,
        value: Math.floor(Math.random() * 10000),
      };
      allServerSideData.push(newItem);
      var tx = {
        add: [newItem],
      };
      this.gridApi.applyServerSideTransactionAsync(tx);
    },
    onBtFlush() {
      this.gridApi.flushServerSideAsyncTransactions();
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      setupData();
      var dataSource = {
        getRows: function (params2) {
          var rowData = allServerSideData.slice();
          setTimeout(function () {
            params2.success({ rowData: rowData });
          }, 200);
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

window.getNextValue = function getNextValue() {
  valueCounter++;
  return Math.floor((valueCounter * 987654321) / 7) % 10000;
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

var valueCounter = 0;

createApp(VueExample).mount("#app");
