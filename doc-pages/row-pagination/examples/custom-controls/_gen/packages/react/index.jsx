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
        // this row just shows the row index, doesn't use any data from the row
        {
          headerName: "#",
          width: 50,
          valueFormatter: function (params) {
            return `${parseInt(params.node.id) + 1}`;
          },
        },
        { headerName: "Athlete", field: "athlete", width: 150 },
        { headerName: "Age", field: "age", width: 90 },
        { headerName: "Country", field: "country", width: 120 },
        { headerName: "Year", field: "year", width: 90 },
        { headerName: "Date", field: "date", width: 110 },
        { headerName: "Sport", field: "sport", width: 110 },
        { headerName: "Gold", field: "gold", width: 100 },
        { headerName: "Silver", field: "silver", width: 100 },
        { headerName: "Bronze", field: "bronze", width: 100 },
        { headerName: "Total", field: "total", width: 100 },
      ],
      defaultColDef: {
        resizable: true,
        filter: true,
      },
      rowSelection: "multiple",
      paginationPageSize: 500,
      rowData: null,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => params.api.setRowData(data);

    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  onPaginationChanged = () => {
    console.log("onPaginationPageLoaded");
    // Workaround for bug in events order
    if (this.gridApi) {
      setText("#lbLastPageFound", this.gridApi.paginationIsLastPageFound());
      setText("#lbPageSize", this.gridApi.paginationGetPageSize());
      // we +1 to current page, as pages are zero based
      setText("#lbCurrentPage", this.gridApi.paginationGetCurrentPage() + 1);
      setText("#lbTotalPages", this.gridApi.paginationGetTotalPages());
      setLastButtonDisabled(!this.gridApi.paginationIsLastPageFound());
    }
  };

  onBtFirst = () => {
    this.gridApi.paginationGoToFirstPage();
  };

  onBtLast = () => {
    this.gridApi.paginationGoToLastPage();
  };

  onBtNext = () => {
    this.gridApi.paginationGoToNextPage();
  };

  onBtPrevious = () => {
    this.gridApi.paginationGoToPreviousPage();
  };

  onBtPageFive = () => {
    // we say page 4, as the first page is zero
    this.gridApi.paginationGoToPage(4);
  };

  onBtPageFifty = () => {
    // we say page 49, as the first page is zero
    this.gridApi.paginationGoToPage(49);
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="example-wrapper">
          <div className="example-header">
            <div>
              <button onClick={() => this.onBtFirst()}>To First</button>
              <button onClick={() => this.onBtLast()} id="btLast">
                To Last
              </button>
              <button onClick={() => this.onBtPrevious()}>To Previous</button>
              <button onClick={() => this.onBtNext()}>To Next</button>
              <button onClick={() => this.onBtPageFive()}>To Page 5</button>
              <button onClick={() => this.onBtPageFifty()}>To Page 50</button>
            </div>

            <div style={{ marginTop: "6px" }}>
              <span className="label">Last Page Found:</span>
              <span className="value" id="lbLastPageFound">
                -
              </span>
              <span className="label">Page Size:</span>
              <span className="value" id="lbPageSize">
                -
              </span>
              <span className="label">Total Pages:</span>
              <span className="value" id="lbTotalPages">
                -
              </span>
              <span className="label">Current Page:</span>
              <span className="value" id="lbCurrentPage">
                -
              </span>
            </div>
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
              rowSelection={this.state.rowSelection}
              paginationPageSize={this.state.paginationPageSize}
              pagination={true}
              suppressPaginationPanel={true}
              suppressScrollOnNewData={true}
              onGridReady={this.onGridReady}
              onPaginationChanged={this.onPaginationChanged.bind(this)}
              rowData={this.state.rowData}
            />
          </div>
        </div>
      </div>
    );
  }
}

function setText(selector, text) {
  document.querySelector(selector).innerHTML = text;
}
function setLastButtonDisabled(disabled) {
  document.querySelector("#btLast").disabled = disabled;
}

render(<GridExample></GridExample>, document.querySelector("#root"));
