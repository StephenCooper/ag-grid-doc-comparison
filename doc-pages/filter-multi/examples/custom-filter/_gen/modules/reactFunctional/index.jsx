"use strict";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "@ag-grid-community/react";
import { ClipboardModule } from "@ag-grid-enterprise/clipboard";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { MultiFilterModule } from "@ag-grid-enterprise/multi-filter";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import React, { useCallback, useMemo, useState } from "react";
import { render } from "react-dom";
import YearFilter from "./YearFilter.jsx";
import YearFloatingFilter from "./YearFloatingFilter.jsx";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MultiFilterModule,
  SetFilterModule,
  MenuModule,
  ClipboardModule,
  FiltersToolPanelModule,
]);

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: "athlete", filter: "agMultiColumnFilter" },
    { field: "sport", filter: "agMultiColumnFilter" },
    {
      field: "year",
      filter: "agMultiColumnFilter",
      filterParams: {
        filters: [
          {
            filter: YearFilter,
            floatingFilterComponent: YearFloatingFilter,
          },
          {
            filter: "agNumberColumnFilter",
          },
        ],
      },
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 200,
      resizable: true,
      floatingFilter: true,
      menuTabs: ["filterMenuTab"],
    };
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
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
