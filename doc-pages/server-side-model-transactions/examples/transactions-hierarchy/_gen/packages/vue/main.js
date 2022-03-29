import Vue from "vue";
import { AgGridVue } from "ag-grid-vue";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div style="margin-bottom: 5px;">
                    <button v-on:click="onBtNewPalmOil()">New Palm Oil</button>
                    <button v-on:click="onBtNewRubber()">New Rubber</button>
                    <button v-on:click="onBtNewWoolAmber()">New Wool &amp; Amber</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <button v-on:click="onBtNewProduct()">New Product (will fail)</button>
                    <button v-on:click="onBtStoreState()">Store State</button>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine-dark"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :getRowId="getRowId"
                :rowModelType="rowModelType"
                :serverSideStoreType="serverSideStoreType"
                :animateRows="true"
                :purgeClosedRowNodes="true"
                :getServerSideStoreParams="getServerSideStoreParams"></ag-grid-vue>
            </div>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: "productName", rowGroup: true, hide: true },
        { field: "tradeName" },
        { field: "value" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        width: 250,
        resizable: true,
      },
      getRowId: null,
      rowModelType: null,
      serverSideStoreType: null,
      getServerSideStoreParams: null,
    };
  },
  created() {
    this.getRowId = (params) => {
      return params.data.id;
    };
    this.rowModelType = "serverSide";
    this.serverSideStoreType = "full";
    this.getServerSideStoreParams = (params) => {
      const type = params.level == 0 ? "partial" : "full";
      return {
        storeType: type,
      };
    };
  },
  methods: {
    onBtNewPalmOil() {
      const transaction = {
        route: ["Palm Oil"],
        add: [createOneTrade()],
      };
      const res = this.gridApi.applyServerSideTransaction(transaction);
      console.log("New Palm Oil, result = " + (res && res.status));
    },
    onBtNewRubber() {
      const transaction = {
        route: ["Rubber"],
        add: [createOneTrade()],
      };
      const res = this.gridApi.applyServerSideTransaction(transaction);
      console.log("New Rubber, result = " + (res && res.status));
    },
    onBtNewWoolAmber() {
      const transactions = [];
      transactions.push({
        route: ["Wool"],
        add: [createOneTrade()],
      });
      transactions.push({
        route: ["Amber"],
        add: [createOneTrade()],
      });
      const api = this.gridApi;
      transactions.forEach(function (tx) {
        const res = api.applyServerSideTransaction(tx);
        console.log("New " + tx.route[0] + ", result = " + (res && res.status));
      });
    },
    onBtNewProduct() {
      const transaction = {
        route: [],
        add: [{ id: idSequence++, productName: "Rice", trades: [] }],
      };
      const res = this.gridApi.applyServerSideTransaction(transaction);
      console.log("New Product, result = " + (res && res.status));
    },
    onBtStoreState() {
      const storeState = this.gridApi.getServerSideStoreState();
      console.log("Store States:");
      storeState.forEach(function (state, index) {
        console.log(
          index +
            " - " +
            JSON.stringify(state).replace(/"/g, "").replace(/,/g, ", ")
        );
      });
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      setupData();
      const dataSource = {
        getRows: function (params2) {
          // To make the demo look real, wait for 500ms before returning
          setTimeout(function () {
            const doingTopLevel = params2.request.groupKeys.length == 0;
            if (doingTopLevel) {
              params2.success({
                rowData: products.slice(),
                rowCount: products.length,
              });
            } else {
              const key = params2.request.groupKeys[0];
              let foundProduct = undefined;
              products.forEach(function (product) {
                if (product.productName == key) {
                  foundProduct = product;
                }
              });
              if (foundProduct) {
                params2.success({ rowData: foundProduct.trades });
              } else {
                params2.fail();
              }
            }
          }, 2000);
        },
      };
      params.api.setServerSideDatasource(dataSource);
    },
  },
};

window.createOneTrade = function createOneTrade() {
  return {
    id: idSequence++,
    tradeName: "TRD-" + Math.floor(Math.random() * 20000),
    value: Math.floor(Math.random() * 20000),
  };
};

window.setupData = function setupData() {
  productsNames.forEach(function (productName) {
    const product = { id: idSequence++, productName: productName, trades: [] };
    products.push(product);
    for (let i = 0; i < 2; i++) {
      product.trades.push(createOneTrade());
    }
  });
};

const productsNames = ["Palm Oil", "Rubber", "Wool", "Amber", "Copper"];

const products = [];

let idSequence = 0;

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
