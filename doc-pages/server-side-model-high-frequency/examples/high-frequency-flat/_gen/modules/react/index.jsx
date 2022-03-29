"use strict";

import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ServerSideRowModelModule } from "@ag-grid-enterprise/server-side-row-model";

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
      rowSelection: "multiple",
      serverSideStoreType: "full",
      rowModelType: "serverSide",
      asyncTransactionWaitMillis: 4000,
      getRowId: function (params) {
        return params.data.product;
      },
    };
  }

  onGridReady = (params) => {
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
  };

  onBtAdd = () => {
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
    this.gridApi.applyServerSideTransactionAsync(tx, function (res) {
      console.log(
        'Transaction "' + newProductName + '": status = ' + res.status
      );
    });
  };

  onBtFlush = () => {
    this.gridApi.flushServerSideAsyncTransactions();
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="example-wrapper">
          <div style={{ marginBottom: "5px" }}>
            <button onClick={() => this.onBtAdd()}>Add</button>
            <button onClick={() => this.onBtFlush()}>Flush</button>
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
              rowSelection={this.state.rowSelection}
              serverSideStoreType={this.state.serverSideStoreType}
              rowModelType={this.state.rowModelType}
              animateRows={true}
              asyncTransactionWaitMillis={this.state.asyncTransactionWaitMillis}
              getRowId={this.state.getRowId}
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

render(<GridExample></GridExample>, document.querySelector("#root"));
