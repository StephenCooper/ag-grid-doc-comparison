"use strict";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "@ag-grid-community/react";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import React, { Component } from "react";
import { render } from "react-dom";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowGroupingModule,
  MenuModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
  SetFilterModule,
]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          field: "country",
          rowGroup: true,
          hide: true,
          suppressColumnsToolPanel: true,
        },
        {
          field: "sport",
          rowGroup: true,
          hide: true,
          suppressColumnsToolPanel: true,
        },
        {
          field: "year",
          pivot: true,
          hide: true,
          suppressColumnsToolPanel: true,
        },
        { field: "gold", aggFunc: "sum", valueFormatter: numberFormatter },
        { field: "silver", aggFunc: "sum", valueFormatter: numberFormatter },
        {
          headerName: "Ratio",
          colId: "goldSilverRatio",
          aggFunc: ratioAggFunc,
          valueGetter: ratioValueGetter,
          valueFormatter: ratioFormatter,
        },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        sortable: true,
        filter: true,
      },
      autoGroupColumnDef: {
        minWidth: 220,
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
            suppressAggFuncInHeader={true}
            onGridReady={this.onGridReady}
            rowData={this.state.rowData}
          />
        </div>
      </div>
    );
  }
}

function numberFormatter(params) {
  if (!params.value || params.value === 0) return "0";
  return "" + Math.round(params.value * 100) / 100;
}
function ratioValueGetter(params) {
  if (!(params.node && params.node.group)) {
    // no need to handle group levels - calculated in the 'ratioAggFunc'
    return createValueObject(params.data.gold, params.data.silver);
  }
}
function ratioAggFunc(params) {
  let goldSum = 0;
  let silverSum = 0;
  params.values.forEach((value) => {
    if (value && value.gold) {
      goldSum += value.gold;
    }
    if (value && value.silver) {
      silverSum += value.silver;
    }
  });
  return createValueObject(goldSum, silverSum);
}
function createValueObject(gold, silver) {
  return {
    gold: gold,
    silver: silver,
    toString: () => `${gold && silver ? gold / silver : 0}`,
  };
}
function ratioFormatter(params) {
  if (!params.value || params.value === 0) return "";
  return "" + Math.round(params.value * 100) / 100;
}

render(<GridExample></GridExample>, document.querySelector("#root"));
