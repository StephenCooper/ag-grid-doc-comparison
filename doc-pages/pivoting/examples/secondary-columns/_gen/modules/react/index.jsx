"use strict";

import React, { Component } from "react";
import { render } from "react-dom";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowGroupingModule,
  MenuModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
]);

class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { field: "country", rowGroup: true, enableRowGroup: true },
        {
          field: "year",
          pivot: true,
          enablePivot: true,
          pivotComparator: MyYearPivotComparator,
        },
        { field: "date" },
        { field: "sport" },
        { field: "gold", aggFunc: "sum" },
        { field: "silver", aggFunc: "sum" },
        { field: "bronze", aggFunc: "sum" },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        filter: true,
        resizable: true,
      },
      autoGroupColumnDef: {
        minWidth: 250,
      },
      postProcessSecondaryColDef: function (params) {
        const colDef = params.colDef;
        // make all the columns upper case
        colDef.headerName = colDef.headerName.toUpperCase();
        // the pivot keys are the keys use for the pivot
        // don't change these, but you can use them for your information
        // console.log('Pivot Keys:');
        // console.log(colDef.pivotKeys);
        // // the value column is the value we are aggregating on
        // console.log('Pivot Value Keys:');
        // console.log(colDef.pivotValueColumn);
      },
      postProcessSecondaryColGroupDef: function (params) {
        const colGroupDef = params.colGroupDef;
        // for fun, add a css class for 2002
        if (colGroupDef.pivotKeys[0] === "2002") {
          colGroupDef.headerClass = "color-background";
        }
        // put 'year' in front of each group
        colGroupDef.headerName = "Year " + colGroupDef.headerName;
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
            sideBar={true}
            pivotMode={true}
            suppressAggFuncInHeader={true}
            postProcessSecondaryColDef={this.state.postProcessSecondaryColDef}
            postProcessSecondaryColGroupDef={
              this.state.postProcessSecondaryColGroupDef
            }
            onGridReady={this.onGridReady}
            rowData={this.state.rowData}
          />
        </div>
      </div>
    );
  }
}

function MyYearPivotComparator(a, b) {
  var requiredOrder = ["2012", "2010", "2008", "2006", "2004", "2002", "2000"];
  return requiredOrder.indexOf(a) - requiredOrder.indexOf(b);
}

render(<GridExample></GridExample>, document.querySelector("#root"));
