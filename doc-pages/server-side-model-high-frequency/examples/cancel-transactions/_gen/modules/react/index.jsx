"use strict";

import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css";
import { AgGridReact } from "@ag-grid-community/react";
import { ServerSideRowModelModule } from "@ag-grid-enterprise/server-side-row-model";
import React, { Component } from "react";
import { render } from "react-dom";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ServerSideRowModelModule]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [{ field: "product" }, { field: "value" }],
      defaultColDef: {
        width: 250,
        resizable: true,
      },
      isApplyServerSideTransaction: function (params) {
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
      },
      getRowId: function (params) {
        return params.data.product;
      },
      rowModelType: "serverSide",
      serverSideStoreType: "full",
    };
  }

  onGridReady = (params) => {
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
  };

  onBtAdd = () => {
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
  };

  onBtRefresh = () => {
    this.gridApi.refreshServerSideStore({ purge: true });
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="example-wrapper">
          <div style={{ marginBottom: "5px" }}>
            <button onClick={() => this.onBtAdd()}>Add</button>
            <button onClick={() => this.onBtRefresh()}>Refresh</button>
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
              isApplyServerSideTransaction={
                this.state.isApplyServerSideTransaction
              }
              getRowId={this.state.getRowId}
              rowModelType={this.state.rowModelType}
              serverSideStoreType={this.state.serverSideStoreType}
              onGridReady={this.onGridReady}
            />
          </div>
        </div>
      </div>
    );
  }
}

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
function setupData() {
  products.forEach(function (product, index) {
    allServerSideData.push({
      product: product,
      value: Math.floor(Math.random() * 10000),
    });
  });
}
var serverVersion = 0;

render(<GridExample></GridExample>, document.querySelector("#root"));
