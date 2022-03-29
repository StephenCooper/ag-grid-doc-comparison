"use strict";

import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: "athlete", rowDrag: true },
        { field: "country" },
        { field: "year", width: 100 },
        { field: "date" },
        { field: "sport" },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
      ],
      defaultColDef: {
        width: 170,
        sortable: true,
        filter: true,
      },
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    // add id to each item, needed for immutable store to work
    immutableStore.forEach(function (data, index) {
      data.id = index;
    });
    params.api.setRowData(immutableStore);
  };

  // listen for change on sort changed
  onSortChanged = () => {
    var colState = this.gridColumnApi.getColumnState() || [];
    sortActive = colState.some((c) => c.sort);
    // suppress row drag if either sort or filter is active
    var suppressRowDrag = sortActive || filterActive;
    console.log(
      "sortActive = " +
        sortActive +
        ", filterActive = " +
        filterActive +
        ", allowRowDrag = " +
        suppressRowDrag
    );
    this.gridApi.setSuppressRowDrag(suppressRowDrag);
  };

  // listen for changes on filter changed
  onFilterChanged = () => {
    filterActive = this.gridApi.isAnyFilterPresent();
    // suppress row drag if either sort or filter is active
    var suppressRowDrag = sortActive || filterActive;
    console.log(
      "sortActive = " +
        sortActive +
        ", filterActive = " +
        filterActive +
        ", allowRowDrag = " +
        suppressRowDrag
    );
    this.gridApi.setSuppressRowDrag(suppressRowDrag);
  };

  onRowDragMove = (event) => {
    var movingNode = event.node;
    var overNode = event.overNode;
    var rowNeedsToMove = movingNode !== overNode;
    if (rowNeedsToMove) {
      // the list of rows we have is data, not row nodes, so extract the data
      var movingData = movingNode.data;
      var overData = overNode.data;
      var fromIndex = immutableStore.indexOf(movingData);
      var toIndex = immutableStore.indexOf(overData);
      var newStore = immutableStore.slice();
      moveInArray(newStore, fromIndex, toIndex);
      immutableStore = newStore;
      this.gridApi.setRowData(newStore);
      this.gridApi.clearFocusedCell();
    }
    function moveInArray(arr, fromIndex, toIndex) {
      var element = arr[fromIndex];
      arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, element);
    }
  };

  getRowId = (params) => {
    return params.data.id;
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div
          style={{
            height: "100%",
            width: "100%",
          }}
          className="ag-theme-alpine"
        >
          <AgGridReact
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            animateRows={true}
            getRowId={this.getRowId}
            onGridReady={this.onGridReady}
            onSortChanged={this.onSortChanged.bind(this)}
            onFilterChanged={this.onFilterChanged.bind(this)}
            onRowDragMove={this.onRowDragMove.bind(this)}
          />
        </div>
      </div>
    );
  }
}

var immutableStore = getData();
var sortActive = false;
var filterActive = false;

render(<GridExample></GridExample>, document.querySelector("#root"));
