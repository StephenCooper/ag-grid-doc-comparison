"use strict";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import React, { Component } from "react";
import { render } from "react-dom";
import SimpleCellRenderer from "./simpleCellRenderer.jsx";

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        // this column shows just the country group values, but has not group renderer, so there is no expand / collapse functionality
        {
          headerName: "Country Group - No Renderer",
          showRowGroup: "country",
          minWidth: 250,
        },
        // same as before, but we show all group values, again with no cell renderer
        {
          headerName: "All Groups - No Renderer",
          showRowGroup: true,
          minWidth: 240,
        },
        // add in a cell renderer
        {
          headerName: "Group Renderer A",
          showRowGroup: true,
          cellRenderer: "agGroupCellRenderer",
          minWidth: 220,
        },
        // add in a field
        {
          headerName: "Group Renderer B",
          field: "city",
          showRowGroup: true,
          cellRenderer: "agGroupCellRenderer",
          minWidth: 220,
        },
        // add in a cell renderer params
        {
          headerName: "Group Renderer C",
          field: "city",
          minWidth: 240,
          showRowGroup: true,
          cellRenderer: "agGroupCellRenderer",
          cellRendererParams: {
            suppressCount: true,
            checkbox: true,
            innerRenderer: SimpleCellRenderer,
            suppressDoubleClickExpand: true,
            suppressEnterExpand: true,
          },
        },
        { headerName: "Type", field: "type", rowGroup: true },
        { headerName: "Country", field: "country", rowGroup: true },
        { headerName: "City", field: "city" },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 120,
        resizable: true,
      },
      rowData: getData(),
      groupDisplayType: "custom",
      groupDefaultExpanded: 1,
      rowSelection: "multiple",
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
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
            rowData={this.state.rowData}
            groupDisplayType={this.state.groupDisplayType}
            suppressRowClickSelection={true}
            groupDefaultExpanded={this.state.groupDefaultExpanded}
            rowSelection={this.state.rowSelection}
            groupSelectsChildren={true}
            animateRows={true}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector("#root"));
