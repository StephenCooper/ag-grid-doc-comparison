"use strict";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "@ag-grid-community/react";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import React, { Component } from "react";
import { render } from "react-dom";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  SetFilterModule,
  FiltersToolPanelModule,
]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          groupId: "athleteGroupId",
          headerName: "Athlete",
          children: [
            {
              headerName: "Name",
              field: "athlete",
              minWidth: 200,
              filter: "agTextColumnFilter",
            },
            { field: "age" },
            {
              groupId: "competitionGroupId",
              headerName: "Competition",
              children: [
                { field: "year" },
                {
                  field: "date",
                  minWidth: 180,
                  suppressFiltersToolPanel: true,
                },
              ],
            },
            { field: "country", minWidth: 200 },
          ],
        },
        { colId: "sport", field: "sport", minWidth: 200 },
        {
          headerName: "Medals",
          children: [
            { field: "gold" },
            { field: "silver" },
            { field: "bronze" },
            { field: "total" },
          ],
        },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        filter: true,
        sortable: true,
        resizable: true,
      },
      sideBar: {
        toolPanels: [
          {
            id: "filters",
            labelDefault: "Filters",
            labelKey: "filters",
            iconKey: "filter",
            toolPanel: "agFiltersToolPanel",
            toolPanelParams: {
              suppressExpandAll: true,
              suppressFilterSearch: true,
            },
          },
        ],
        defaultToolPanel: "filters",
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
            sideBar={this.state.sideBar}
            onGridReady={this.onGridReady}
            rowData={this.state.rowData}
          />
        </div>
      </div>
    );
  }
}

render(<GridExample></GridExample>, document.querySelector("#root"));
