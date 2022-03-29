"use strict";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "@ag-grid-community/react";
import React, { useCallback, useMemo, useState } from "react";
import { render } from "react-dom";
import NumberFilterComponent from "./numberFilterComponent.jsx";
import NumberFloatingFilterComponent from "./numberFloatingFilterComponent.jsx";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: "athlete", filter: "agTextColumnFilter" },
    {
      field: "gold",
      floatingFilterComponent: NumberFloatingFilterComponent,
      floatingFilterComponentParams: {
        suppressFilterButton: true,
      },
      filter: NumberFilterComponent,
    },
    {
      field: "silver",
      floatingFilterComponent: NumberFloatingFilterComponent,
      floatingFilterComponentParams: {
        suppressFilterButton: true,
      },
      filter: NumberFilterComponent,
    },
    {
      field: "bronze",
      floatingFilterComponent: NumberFloatingFilterComponent,
      floatingFilterComponentParams: {
        suppressFilterButton: true,
      },
      filter: NumberFilterComponent,
    },
    {
      field: "total",
      floatingFilterComponent: NumberFloatingFilterComponent,
      floatingFilterComponentParams: {
        suppressFilterButton: true,
      },
      filter: NumberFilterComponent,
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      sortable: true,
      flex: 1,
      minWidth: 100,
      filter: true,
      floatingFilter: true,
      resizable: true,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => {
        setRowData(data);
      });
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
