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
        // using default ColDef
        { field: "athlete" },
        { field: "sport" },
        // using number column type
        { field: "age", type: "numberColumn" },
        { field: "year", type: "numberColumn" },
        // using date and non-editable column types
        {
          field: "date",
          type: ["dateColumn", "nonEditableColumn"],
          width: 220,
        },
        {
          headerName: "Medals",
          groupId: "medalsGroup",
          children: [
            // using medal column type
            { headerName: "Gold", field: "gold", type: "medalColumn" },
            { headerName: "Silver", field: "silver", type: "medalColumn" },
            { headerName: "Bronze", field: "bronze", type: "medalColumn" },
            {
              headerName: "Total",
              field: "total",
              type: "medalColumn",
              columnGroupShow: "closed",
            },
          ],
        },
      ],
      defaultColDef: {
        // set the default column width
        width: 150,
        // make every column editable
        editable: true,
        // make every column use 'text' filter by default
        filter: "agTextColumnFilter",
        // enable floating filters by default
        floatingFilter: true,
        // make columns resizable
        resizable: true,
      },
      defaultColGroupDef: {
        marryChildren: true,
      },
      columnTypes: {
        numberColumn: { width: 130, filter: "agNumberColumnFilter" },
        medalColumn: { width: 100, columnGroupShow: "open", filter: false },
        nonEditableColumn: { editable: false },
        dateColumn: {
          // specify we want to use the date filter
          filter: "agDateColumnFilter",
          // add extra parameters for the date filter
          filterParams: {
            // provide comparator function
            comparator: (filterLocalDateAtMidnight, cellValue) => {
              // In the example application, dates are stored as dd/mm/yyyy
              // We create a Date object for comparison against the filter date
              const dateParts = cellValue.split("/");
              const day = Number(dateParts[0]);
              const month = Number(dateParts[1]) - 1;
              const year = Number(dateParts[2]);
              const cellDate = new Date(year, month, day);
              // Now that both parameters are Date objects, we can compare
              if (cellDate < filterLocalDateAtMidnight) {
                return -1;
              } else if (cellDate > filterLocalDateAtMidnight) {
                return 1;
              } else {
                return 0;
              }
            },
          },
        },
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
        <div style={{ height: "100%", boxSizing: "border-box" }}>
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
              defaultColGroupDef={this.state.defaultColGroupDef}
              columnTypes={this.state.columnTypes}
              rowData={this.state.rowData}
              onGridReady={this.onGridReady}
            />
          </div>
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector("#root"));
