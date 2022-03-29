"use strict";

import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: "athlete", minWidth: 200 },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
        { field: "total" },
        { field: "age" },
        {
          field: "country",
          rowGroup: true,
          hide: true,
          valueGetter: countryValueGetter,
          keyCreator: countryKeyCreator,
        },
        { field: "year" },
        { field: "date" },
        { field: "sport", minWidth: 200 },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        resizable: true,
      },
      autoGroupColumnDef: {
        minWidth: 200,
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
            autoGroupColumnDef={this.state.autoGroupColumnDef}
            onGridReady={this.onGridReady}
            rowData={this.state.rowData}
          />
        </div>
      </div>
    );
  }
}

function countryKeyCreator(params) {
  var countryObject = params.value;
  return countryObject.name;
}
function countryValueGetter(params) {
  // hack the data  - replace the country with an object of country name and code
  var countryName = params.data.country;
  var countryCode = countryName.substring(0, 2).toUpperCase();
  return {
    name: countryName,
    code: countryCode,
  };
}

render(<GridExample></GridExample>, document.querySelector("#root"));
