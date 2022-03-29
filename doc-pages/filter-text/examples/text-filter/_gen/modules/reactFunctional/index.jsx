"use strict";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const contains = (target, lookingFor) => {
  return target && target.indexOf(lookingFor) >= 0;
};

var athleteFilterParams = {
  filterOptions: ["contains", "notContains"],
  textFormatter: function (r) {
    if (r == null) return null;
    return r
      .toLowerCase()
      .replace(/[àáâãäå]/g, "a")
      .replace(/æ/g, "ae")
      .replace(/ç/g, "c")
      .replace(/[èéêë]/g, "e")
      .replace(/[ìíîï]/g, "i")
      .replace(/ñ/g, "n")
      .replace(/[òóôõö]/g, "o")
      .replace(/œ/g, "oe")
      .replace(/[ùúûü]/g, "u")
      .replace(/[ýÿ]/g, "y");
  },
  debounceMs: 200,
  suppressAndOrCondition: true,
};

var countryFilterParams = {
  filterOptions: ["contains"],
  textMatcher: function ({ value, filterText }) {
    var filterTextLowerCase = filterText ? filterText.toLowerCase() : "";
    var valueLowerCase = value.toString().toLowerCase();
    var aliases = {
      usa: "united states",
      holland: "netherlands",
      vodka: "russia",
      niall: "ireland",
      sean: "south africa",
      alberto: "mexico",
      john: "australia",
      xi: "china",
    };
    var literalMatch = contains(valueLowerCase, filterTextLowerCase);
    return (
      !!literalMatch || !!contains(valueLowerCase, aliases[filterTextLowerCase])
    );
  },
  trimInput: true,
  debounceMs: 1000,
};

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "athlete",
      filterParams: athleteFilterParams,
    },
    {
      field: "country",
      filter: "agTextColumnFilter",
      filterParams: countryFilterParams,
    },
    {
      field: "sport",
      filter: "agTextColumnFilter",
      filterParams: {
        caseSensitive: true,
        defaultOption: "startsWith",
      },
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      sortable: true,
      filter: true,
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
