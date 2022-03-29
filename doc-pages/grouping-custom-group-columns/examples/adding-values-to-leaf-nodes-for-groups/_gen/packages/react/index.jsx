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
        {
          headerName: "Country",
          colId: "countryGroup",
          showRowGroup: "country",
          minWidth: 200,
          cellRenderer: "agGroupCellRenderer",
          filterValueGetter: function (params) {
            return params.data ? params.data.country : null;
          },
        },
        { field: "country", rowGroup: true, hide: true },
        {
          headerName: "Year / Athlete",
          colId: "yearAthleteGroup",
          minWidth: 220,
          showRowGroup: "year",
          cellRenderer: "agGroupCellRenderer",
          valueGetter: "data ? data.athlete : null",
        },
        { field: "year", rowGroup: true, hide: true },
        { field: "sport", minWidth: 200 },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
        { field: "total" },
        { field: "age" },
        { field: "date", minWidth: 140 },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        filter: true,
        sortable: true,
        resizable: true,
      },
      groupDisplayType: "custom",
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
            groupDisplayType={this.state.groupDisplayType}
            enableRangeSelection={true}
            animateRows={true}
            onGridReady={this.onGridReady}
            rowData={this.state.rowData}
          />
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector("#root"));
