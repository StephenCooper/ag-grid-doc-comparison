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
      columnDefs: [
        { field: "athlete", width: 150 },
        { field: "age" },
        { field: "country", width: 150 },
        { field: "year" },
        { field: "sport" },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
      ],
      defaultColDef: {
        width: 100,
        resizable: true,
      },
      rowSelection: "single",
      rowModelType: "serverSide",
      serverSideStoreType: "partial",
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => {
      // add id to data
      let idSequence = 0;
      data.forEach(function (item) {
        item.id = idSequence++;
      });
      var datasource = createMyDataSource(data);
      params.api.setServerSideDatasource(datasource);
    };

    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  onBtRemove = () => {
    var selectedRows = this.gridApi.getSelectedNodes();
    if (!selectedRows || selectedRows.length === 0) {
      return;
    }
    var selectedRow = selectedRows[0];
    var indexToRemove = window.rowDataServerSide.indexOf(selectedRow.data);
    // the record could be missing, if the user hit the 'remove' button a few times before refresh happens
    if (indexToRemove >= 0) {
      window.rowDataServerSide.splice(indexToRemove, 1);
    }
    this.gridApi.refreshServerSideStore();
  };

  onBtAdd = () => {
    var selectedRows = this.gridApi.getSelectedNodes();
    if (!selectedRows || selectedRows.length === 0) {
      return;
    }
    var selectedRow = selectedRows[0];
    // insert new row in the source data, at the top of the page
    window.rowDataServerSide.splice(selectedRow.rowIndex, 0, {
      athlete: "New Item" + newItemCount,
      id: "" + Math.random(),
    });
    newItemCount++;
    this.gridApi.refreshServerSideStore();
  };

  getRowId = (params) => {
    return params.data.id;
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="example-wrapper">
          <div style={{ marginBottom: "5px" }}>
            <button onClick={() => this.onBtAdd()}>
              Add Before Selected Row
            </button>
            <button onClick={() => this.onBtRemove()}>
              Remove Selected Row
            </button>
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
              rowModelType={this.state.rowModelType}
              serverSideStoreType={this.state.serverSideStoreType}
              getRowId={this.getRowId}
              onGridReady={this.onGridReady}
            />
          </div>
        </div>
      </div>
    );
  }
}

var newItemCount = 0;
function createMyDataSource(data) {
  window.rowDataServerSide = data;
  const dataSource = {
    getRows: function (params) {
      setTimeout(function () {
        // take a slice of the total rows
        var rowsThisPage = data.slice(
          params.request.startRow,
          params.request.endRow
        );
        // call the success callback
        params.success({
          rowData: rowsThisPage,
          rowCount: window.rowDataServerSide.length,
        });
      }, 500);
    },
  };
  return dataSource;
}

render(<GridExample></GridExample>, document.querySelector("#root"));
