"use strict";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import React, { Component } from "react";
import { render } from "react-dom";

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: "athlete", rowDrag: rowDrag },
        { field: "country", rowGroup: true },
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
      groupDefaultExpanded: 1,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.setRowData(getData());
  };

  onRowDragMove = (event) => {
    var movingNode = event.node;
    var overNode = event.overNode;
    // find out what country group we are hovering over
    var groupCountry;
    if (overNode.group) {
      // if over a group, we take the group key (which will be the
      // country as we are grouping by country)
      groupCountry = overNode.key;
    } else {
      // if over a non-group, we take the country directly
      groupCountry = overNode.data.country;
    }
    var needToChangeParent = movingNode.data.country !== groupCountry;
    if (needToChangeParent) {
      var movingData = movingNode.data;
      movingData.country = groupCountry;
      this.gridApi.applyTransaction({
        update: [movingData],
      });
      this.gridApi.clearFocusedCell();
    }
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
            groupDefaultExpanded={this.state.groupDefaultExpanded}
            onGridReady={this.onGridReady}
            onRowDragMove={this.onRowDragMove.bind(this)}
          />
        </div>
      </div>
    );
  }
}

var rowDrag = function (params) {
  // only rows that are NOT groups should be draggable
  return !params.node.group;
};

render(<GridExample></GridExample>, document.querySelector("#root"));
