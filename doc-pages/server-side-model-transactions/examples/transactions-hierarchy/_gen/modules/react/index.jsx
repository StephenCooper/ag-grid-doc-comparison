"use strict";

import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ServerSideRowModelModule } from "@ag-grid-enterprise/server-side-row-model";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ServerSideRowModelModule, RowGroupingModule]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: "productName", rowGroup: true, hide: true },
        { field: "tradeName" },
        { field: "value" },
      ],
      defaultColDef: {
        width: 250,
        resizable: true,
      },
      getRowId: function (params) {
        return params.data.id;
      },
      rowModelType: "serverSide",
      serverSideStoreType: "full",
      getServerSideStoreParams: function (params) {
        const type = params.level == 0 ? "partial" : "full";
        return {
          storeType: type,
        };
      },
    };
  }

  onGridReady = (params) => {
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
  };

  onBtNewPalmOil = () => {
    const transaction = {
      route: ["Palm Oil"],
      add: [createOneTrade()],
    };
    const res = this.gridApi.applyServerSideTransaction(transaction);
    console.log("New Palm Oil, result = " + (res && res.status));
  };

  onBtNewRubber = () => {
    const transaction = {
      route: ["Rubber"],
      add: [createOneTrade()],
    };
    const res = this.gridApi.applyServerSideTransaction(transaction);
    console.log("New Rubber, result = " + (res && res.status));
  };

  onBtNewWoolAmber = () => {
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
  };

  onBtNewProduct = () => {
    const transaction = {
      route: [],
      add: [{ id: idSequence++, productName: "Rice", trades: [] }],
    };
    const res = this.gridApi.applyServerSideTransaction(transaction);
    console.log("New Product, result = " + (res && res.status));
  };

  onBtStoreState = () => {
    const storeState = this.gridApi.getServerSideStoreState();
    console.log("Store States:");
    storeState.forEach(function (state, index) {
      console.log(
        index +
          " - " +
          JSON.stringify(state).replace(/"/g, "").replace(/,/g, ", ")
      );
    });
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="example-wrapper">
          <div style={{ marginBottom: "5px" }}>
            <button onClick={() => this.onBtNewPalmOil()}>New Palm Oil</button>
            <button onClick={() => this.onBtNewRubber()}>New Rubber</button>
            <button onClick={() => this.onBtNewWoolAmber()}>
              New Wool &amp; Amber
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={() => this.onBtNewProduct()}>
              New Product (will fail)
            </button>
            <button onClick={() => this.onBtStoreState()}>Store State</button>
          </div>
          <div
            style={{
              height: "100%",
              width: "100%",
            }}
            className="ag-theme-alpine-dark"
          >
            <AgGridReact
              columnDefs={this.state.columnDefs}
              defaultColDef={this.state.defaultColDef}
              getRowId={this.state.getRowId}
              rowModelType={this.state.rowModelType}
              serverSideStoreType={this.state.serverSideStoreType}
              animateRows={true}
              purgeClosedRowNodes={true}
              getServerSideStoreParams={this.state.getServerSideStoreParams}
              onGridReady={this.onGridReady}
            />
          </div>
        </div>
      </div>
    );
  }
}

const productsNames = ["Palm Oil", "Rubber", "Wool", "Amber", "Copper"];
const products = [];
let idSequence = 0;
function createOneTrade() {
  return {
    id: idSequence++,
    tradeName: "TRD-" + Math.floor(Math.random() * 20000),
    value: Math.floor(Math.random() * 20000),
  };
}
function setupData() {
  productsNames.forEach(function (productName) {
    const product = { id: idSequence++, productName: productName, trades: [] };
    products.push(product);
    for (let i = 0; i < 2; i++) {
      product.trades.push(createOneTrade());
    }
  });
}

render(<GridExample></GridExample>, document.querySelector("#root"));
