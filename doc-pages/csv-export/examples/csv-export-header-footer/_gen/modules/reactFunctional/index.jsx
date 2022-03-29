"use strict";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { CsvExportModule } from "@ag-grid-community/csv-export";
import { AgGridReact } from "@ag-grid-community/react";
import { MenuModule } from "@ag-grid-enterprise/menu";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  CsvExportModule,
  MenuModule,
]);

const getValue = (inputSelector) => {
  var text = document.querySelector(inputSelector).value;
  switch (text) {
    case "string":
      return (
        'Here is a comma, and a some "quotes". You can see them using the\n' +
        "api.getDataAsCsv() button but they will not be visible when the downloaded\n" +
        "CSV file is opened in Excel because string content passed to\n" +
        "prependContent and appendContent is not escaped."
      );
    case "array":
      return [
        [],
        [
          {
            data: {
              value: 'Here is a comma, and a some "quotes".',
              type: "String",
            },
          },
        ],
        [
          {
            data: {
              value:
                "They are visible when the downloaded CSV file is opened in Excel because custom content is properly escaped (provided that suppressQuotes is not set to true)",
              type: "String",
            },
          },
        ],
        [
          { data: { value: "this cell:", type: "String" }, mergeAcross: 1 },
          {
            data: {
              value: "is empty because the first cell has mergeAcross=1",
              type: "String",
            },
          },
        ],
        [],
      ];
    case "none":
      return;
    default:
      return text;
  }
};

const getParams = () => {
  return {
    prependContent: getValue("#prependContent"),
    appendContent: getValue("#appendContent"),
    suppressQuotes: undefined,
    columnSeparator: undefined,
  };
};

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState([
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      resizable: true,
      minWidth: 100,
      flex: 1,
    };
  }, []);
  const popupParent = useMemo(() => {
    return document.body;
  }, []);
  const [columnDefs, setColumnDefs] = useState([
    { field: "make" },
    { field: "model" },
    { field: "price" },
  ]);

  const onBtnExport = useCallback(() => {
    var params = getParams();
    if (params.suppressQuotes || params.columnSeparator) {
      alert(
        "NOTE: you are downloading a file with non-standard quotes or separators - it may not render correctly in Excel."
      );
    }
    gridRef.current.api.exportDataAsCsv(params);
  }, [alert]);

  const onBtnUpdate = useCallback(() => {
    document.querySelector("#csvResult").value =
      gridRef.current.api.getDataAsCsv(getParams());
  }, []);

  return (
    <div style={containerStyle}>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <div style={{ display: "flex" }}>
          <div style={{ marginLeft: "10px" }}>
            <div className="row">
              <label>prependContent = </label>
              <select id="prependContent">
                <option>none</option>
                <option value="array">CSVCell[][] (recommended format)</option>
                <option value="string">string (legacy format)</option>
              </select>
            </div>
            <div className="row">
              <label>appendContent = </label>
              <select id="appendContent">
                <option>none</option>
                <option value="array">CSVCell[][] (recommended format)</option>
                <option value="string">string (legacy format)</option>
              </select>
            </div>
          </div>
        </div>

        <div style={{ margin: "10px 0" }}>
          <button onClick={onBtnUpdate}>Show CSV export content text</button>
          <button onClick={onBtnExport}>Download CSV export file</button>
        </div>

        <div style={{ flex: "1 1 0px", position: "relative" }}>
          <div id="gridContainer">
            <div style={gridStyle} className="ag-theme-alpine">
              <AgGridReact
                ref={gridRef}
                rowData={rowData}
                defaultColDef={defaultColDef}
                suppressExcelExport={true}
                popupParent={popupParent}
                columnDefs={columnDefs}
              ></AgGridReact>
            </div>
          </div>
          <textarea id="csvResult">
            Click the Show CSV export content button to view exported CSV here
          </textarea>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
