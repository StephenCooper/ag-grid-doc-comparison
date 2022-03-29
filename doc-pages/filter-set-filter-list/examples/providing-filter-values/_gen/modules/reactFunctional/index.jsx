"use strict";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "@ag-grid-community/react";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  SetFilterModule,
  MenuModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
]);

var listOfDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

var daysValuesNotProvidedFilterParams = {
  comparator: function (a, b) {
    var aIndex = listOfDays.indexOf(a);
    var bIndex = listOfDays.indexOf(b);
    if (aIndex === bIndex) return 0;
    return aIndex > bIndex ? 1 : -1;
  },
};

var daysValuesProvidedFilterParams = {
  values: listOfDays,
  suppressSorting: true, // use provided order
};

const getRowData = () => {
  var weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  var rows = [];
  for (var i = 0; i < 200; i++) {
    var index = Math.floor(Math.random() * 5);
    rows.push({ days: weekdays[index] });
  }
  return rows;
};

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState(getRowData());
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Days (Values Not Provided)",
      field: "days",
      filter: "agSetColumnFilter",
      filterParams: daysValuesNotProvidedFilterParams,
    },
    {
      headerName: "Days (Values Provided)",
      field: "days",
      filter: "agSetColumnFilter",
      filterParams: daysValuesProvidedFilterParams,
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      filter: true,
      resizable: true,
    };
  }, []);

  const onFirstDataRendered = useCallback((params) => {
    gridRef.current.api.getToolPanelInstance("filters").expandFilters();
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          sideBar={"filters"}
          onFirstDataRendered={onFirstDataRendered}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
