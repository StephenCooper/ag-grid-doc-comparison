"use strict";

import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        // group cell renderer needed for expand / collapse icons
        {
          field: "accountId",
          maxWidth: 200,
          cellRenderer: "agGroupCellRenderer",
        },
        { field: "name" },
        { field: "country" },
        { field: "calls" },
        { field: "totalDuration" },
      ],
      defaultColDef: {
        flex: 1,
      },
      rowModelType: "serverSide",
      serverSideStoreType: "partial",
      detailCellRendererParams: {
        detailGridOptions: {
          columnDefs: [
            { field: "callId" },
            { field: "direction" },
            { field: "duration", valueFormatter: "x.toLocaleString() + 's'" },
            { field: "switchCode" },
            { field: "number" },
          ],
          domLayout: "autoHeight",
          defaultColDef: {
            flex: 1,
          },
        },
        getDetailRowData: function (params) {
          // supply details records to detail cell renderer (i.e. detail grid)
          params.successCallback(params.data.callRecords);
        },
      },
      getRowHeight: function (params) {
        if (params.node && params.node.detail) {
          var offset = 60;
          var sizes = params.api.getSizesForCurrentTheme() || {};
          var allDetailRowHeight =
            params.data.callRecords.length * sizes.rowHeight;
          return allDetailRowHeight + (sizes.headerHeight || 0) + offset;
        }
      },
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => {
      // setup the fake server with entire dataset
      var fakeServer = new FakeServer(data);
      // create datasource with a reference to the fake server
      var datasource = getServerSideDatasource(fakeServer);
      // register the datasource with the grid
      params.api.setServerSideDatasource(datasource);
    };

    fetch("https://www.ag-grid.com/example-assets/call-data.json")
      .then((resp) => resp.json())
      .then((data) => updateData(data));

    setTimeout(function () {
      // expand some master row
      var someRow = params.api.getRowNode("1");
      if (someRow) {
        someRow.setExpanded(true);
      }
    }, 1000);
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div style={{ height: "100%", boxSizing: "border-box" }}>
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
              animateRows={true}
              rowModelType={this.state.rowModelType}
              serverSideStoreType={this.state.serverSideStoreType}
              masterDetail={true}
              detailCellRendererParams={this.state.detailCellRendererParams}
              getRowHeight={this.state.getRowHeight}
              onGridReady={this.onGridReady}
            />
          </div>
        </div>
      </div>
    );
  }
}

function getServerSideDatasource(server) {
  return {
    getRows: function (params) {
      console.log("[Datasource] - rows requested by grid: ", params.request);
      var response = server.getData(params.request);
      // adding delay to simulate real server call
      setTimeout(function () {
        if (response.success) {
          // call the success callback
          params.success({
            rowData: response.rows,
            rowCount: response.lastRow,
          });
        } else {
          // inform the grid request failed
          params.fail();
        }
      }, 200);
    },
  };
}

render(<GridExample></GridExample>, document.querySelector("#root"));
