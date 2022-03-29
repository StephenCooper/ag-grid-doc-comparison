"use strict";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { CsvExportModule } from "@ag-grid-community/csv-export";
import { AgGridReact } from "@ag-grid-community/react";
import { GridChartsModule } from "@ag-grid-enterprise/charts";
import { ClipboardModule } from "@ag-grid-enterprise/clipboard";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { ExcelExportModule } from "@ag-grid-enterprise/excel-export";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { MultiFilterModule } from "@ag-grid-enterprise/multi-filter";
import { RangeSelectionModule } from "@ag-grid-enterprise/range-selection";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import { SideBarModule } from "@ag-grid-enterprise/side-bar";
import { StatusBarModule } from "@ag-grid-enterprise/status-bar";
import React, { useCallback, useMemo, useState } from "react";
import { render } from "react-dom";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
  SetFilterModule,
  CsvExportModule,
  ExcelExportModule,
  GridChartsModule,
  ClipboardModule,
  RangeSelectionModule,
  RowGroupingModule,
  MultiFilterModule,
  SideBarModule,
  StatusBarModule,
]);

class NodeIdRenderer {
  init(params) {
    this.eGui = document.createElement("div");
    this.eGui.innerHTML = params.node.id + 1;
  }

  getGui() {
    return this.eGui;
  }
  refresh() {
    return false;
  }
}

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    // this row just shows the row index, doesn't use any data from the row
    {
      headerName: "#",
      cellRenderer: NodeIdRenderer,
    },
    {
      field: "athlete",
      filterParams: { buttons: ["clear", "reset", "apply"] },
    },
    {
      field: "age",
      filterParams: { buttons: ["apply", "cancel"] },
      enablePivot: true,
    },
    { field: "country", enableRowGroup: true },
    { field: "year", filter: "agNumberColumnFilter" },
    { field: "date" },
    {
      field: "sport",
      filter: "agMultiColumnFilter",
      filterParams: {
        filters: [
          {
            filter: "agTextColumnFilter",
            display: "accordion",
          },
          {
            filter: "agSetColumnFilter",
            display: "accordion",
          },
        ],
      },
    },
    { field: "gold", enableValue: true },
    { field: "silver", enableValue: true },
    { field: "bronze", enableValue: true },
    { field: "total", enableValue: true },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      sortable: true,
      flex: 1,
      minWidth: 100,
      filter: true,
      resizable: true,
    };
  }, []);
  const statusBar = useMemo(() => {
    return {
      statusPanels: [
        { statusPanel: "agTotalAndFilteredRowCountComponent", align: "left" },
        { statusPanel: "agAggregationComponent" },
      ],
    };
  }, []);
  const getLocaleText = useCallback(function (params) {
    switch (params.key) {
      case "thousandSeparator":
        return ".";
      case "decimalSeparator":
        return ",";
      default:
        return params.defaultValue ? params.defaultValue.toUpperCase() : "";
    }
  }, []);

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => setRowData(data));
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          sideBar={true}
          statusBar={statusBar}
          rowGroupPanelShow={"always"}
          pagination={true}
          paginationPageSize={500}
          enableRangeSelection={true}
          enableCharts={true}
          getLocaleText={getLocaleText}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
