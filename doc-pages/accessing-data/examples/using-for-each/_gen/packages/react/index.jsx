"use strict";

import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: "country", rowGroup: true, hide: true },
        { field: "athlete", minWidth: 180 },
        { field: "age" },
        { field: "year" },
        { field: "date", minWidth: 150 },
        { field: "sport", minWidth: 150 },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
        { field: "total" },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        sortable: true,
        filter: true,
      },
      autoGroupColumnDef: {
        minWidth: 200,
      },
      groupDefaultExpanded: 1,
      rowData: null,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => params.api.setRowData(data.slice(0, 50));

    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  onBtForEachNode = () => {
    console.log("### api.forEachNode() ###");
    this.gridApi.forEachNode(printNode);
  };

  onBtForEachNodeAfterFilter = () => {
    console.log("### api.forEachNodeAfterFilter() ###");
    this.gridApi.forEachNodeAfterFilter(printNode);
  };

  onBtForEachNodeAfterFilterAndSort = () => {
    console.log("### api.forEachNodeAfterFilterAndSort() ###");
    this.gridApi.forEachNodeAfterFilterAndSort(printNode);
  };

  onBtForEachLeafNode = () => {
    console.log("### api.forEachLeafNode() ###");
    this.gridApi.forEachLeafNode(printNode);
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="example-wrapper">
          <div style={{ marginBottom: "1rem" }}>
            <button onClick={() => this.onBtForEachNode()}>
              For-Each Node
            </button>
            <button onClick={() => this.onBtForEachNodeAfterFilter()}>
              For-Each Node After Filter
            </button>
            <button onClick={() => this.onBtForEachNodeAfterFilterAndSort()}>
              For-Each Node After Filter and Sort
            </button>
            <button onClick={() => this.onBtForEachLeafNode()}>
              For-Each Leaf Node
            </button>
          </div>

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
              autoGroupColumnDef={this.state.autoGroupColumnDef}
              groupDefaultExpanded={this.state.groupDefaultExpanded}
              onGridReady={this.onGridReady}
              rowData={this.state.rowData}
            />
          </div>
        </div>
      </div>
    );
  }
}

const printNode = (node, index) => {
  if (node.group) {
    console.log(index + " -> group: " + node.key);
  } else {
    console.log(
      index + " -> data: " + node.data.country + ", " + node.data.athlete
    );
  }
};

render(<GridExample></GridExample>, document.querySelector("#root"));
