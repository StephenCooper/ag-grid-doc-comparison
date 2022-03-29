"use strict";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "@ag-grid-community/react";
import React, { Component } from "react";
import { render } from "react-dom";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: "athlete" },
        { field: "age", width: 90 },
        { field: "country" },
        { field: "year", width: 90 },
        { field: "date" },
        { field: "sport" },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
        { field: "total" },
      ],
      defaultColDef: {
        sortable: true,
      },
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

  sortByAthleteAsc = () => {
    this.gridColumnApi.applyColumnState({
      state: [{ colId: "athlete", sort: "asc" }],
      defaultState: { sort: null },
    });
  };

  sortByAthleteDesc = () => {
    this.gridColumnApi.applyColumnState({
      state: [{ colId: "athlete", sort: "desc" }],
      defaultState: { sort: null },
    });
  };

  sortByCountryThenSport = () => {
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: "country", sort: "asc", sortIndex: 0 },
        { colId: "sport", sort: "asc", sortIndex: 1 },
      ],
      defaultState: { sort: null },
    });
  };

  sortBySportThenCountry = () => {
    this.gridColumnApi.applyColumnState({
      state: [
        { colId: "country", sort: "asc", sortIndex: 1 },
        { colId: "sport", sort: "asc", sortIndex: 0 },
      ],
      defaultState: { sort: null },
    });
  };

  clearSort = () => {
    this.gridColumnApi.applyColumnState({
      defaultState: { sort: null },
    });
  };

  saveSort = () => {
    var colState = this.gridColumnApi.getColumnState();
    var sortState = colState
      .filter(function (s) {
        return s.sort != null;
      })
      .map(function (s) {
        return { colId: s.colId, sort: s.sort, sortIndex: s.sortIndex };
      });
    savedSort = sortState;
    console.log("saved sort", sortState);
  };

  restoreFromSave = () => {
    this.gridColumnApi.applyColumnState({
      state: savedSort,
      defaultState: { sort: null },
    });
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <div className="example-wrapper">
          <div style={{ marginBottom: "1rem" }}>
            <div>
              <button onClick={() => this.sortByAthleteAsc()}>
                Athlete Ascending
              </button>
              <button onClick={() => this.sortByAthleteDesc()}>
                Athlete Descending
              </button>
              <button onClick={() => this.sortByCountryThenSport()}>
                Country, then Sport
              </button>
              <button onClick={() => this.sortBySportThenCountry()}>
                Sport, then Country
              </button>
            </div>
            <div style={{ marginTop: "0.25rem" }}>
              <button onClick={() => this.clearSort()}>Clear Sort</button>
              <button onClick={() => this.saveSort()}>Save Sort</button>
              <button onClick={() => this.restoreFromSave()}>
                Restore from Save
              </button>
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
              onGridReady={this.onGridReady}
              rowData={this.state.rowData}
            />
          </div>
        </div>
      </div>
    );
  }
}

var savedSort;

render(<GridExample></GridExample>, document.querySelector("#root"));
