"use strict";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "@ag-grid-community/react";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
import { MasterDetailModule } from "@ag-grid-enterprise/master-detail";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import React, { Component } from "react";
import { render } from "react-dom";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MasterDetailModule,
  MenuModule,
  SetFilterModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        // group cell renderer needed for expand / collapse icons
        { field: "name", cellRenderer: "agGroupCellRenderer" },
        { field: "account" },
        { field: "calls" },
        { field: "minutes", valueFormatter: "x.toLocaleString() + 'm'" },
      ],
      defaultColDef: {
        flex: 1,
        sortable: true,
        filter: true,
      },
      detailCellRendererParams: {
        detailGridOptions: {
          columnDefs: [
            { field: "callId" },
            { field: "direction" },
            { field: "number", minWidth: 150 },
            { field: "duration", valueFormatter: "x.toLocaleString() + 's'" },
            { field: "switchCode", minWidth: 150 },
          ],
          defaultColDef: {
            flex: 1,
            filter: true,
            sortable: true,
          },
        },
        getDetailRowData: function (params) {
          params.successCallback(params.data.callRecords);
        },
      },
      rowData: null,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const updateData = (data) => {
      this.setState({ rowData: data });
    };

    fetch("https://www.ag-grid.com/example-assets/master-detail-data.json")
      .then((resp) => resp.json())
      .then((data) => updateData(data));
  };

  onFirstDataRendered = (params) => {
    // arbitrarily expand a row for presentational purposes
    setTimeout(function () {
      params.api.getDisplayedRowAtIndex(1).setExpanded(true);
    }, 0);
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
            masterDetail={true}
            detailCellRendererParams={this.state.detailCellRendererParams}
            onGridReady={this.onGridReady}
            onFirstDataRendered={this.onFirstDataRendered.bind(this)}
            rowData={this.state.rowData}
          />
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector("#root"));
