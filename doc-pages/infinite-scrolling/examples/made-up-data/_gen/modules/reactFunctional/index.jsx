"use strict";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { InfiniteRowModelModule } from "@ag-grid-community/infinite-row-model";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([InfiniteRowModelModule]);

var ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");

const getColumnDefs = () => {
  const columnDefs = [
    { checkboxSelection: true, headerName: "", width: 60 },
    { headerName: "#", width: 80, valueGetter: "node.rowIndex" },
  ];
  ALPHABET.forEach(function (letter) {
    columnDefs.push({
      headerName: letter.toUpperCase(),
      field: letter,
      width: 150,
    });
  });
  return columnDefs;
};

const getDataSource = (count) => {
  const dataSource = {
    rowCount: count,
    getRows: function (params) {
      var rowsThisPage = [];
      for (
        var rowIndex = params.startRow;
        rowIndex < params.endRow;
        rowIndex++
      ) {
        var record = {};
        ALPHABET.forEach(function (letter, colIndex) {
          var randomNumber = 17 + rowIndex + colIndex;
          var cellKey = letter.toUpperCase() + (rowIndex + 1);
          record[letter] = cellKey + " = " + randomNumber;
        });
        rowsThisPage.push(record);
      }
      // to mimic server call, we reply after a short delay
      setTimeout(function () {
        // no need to pass the second 'rowCount' parameter as we have already provided it
        params.successCallback(rowsThisPage);
      }, 100);
    },
  };
  return dataSource;
};

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const [columnDefs, setColumnDefs] = useState(getColumnDefs());
  const defaultColDef = useMemo(() => {
    return {
      resizable: true,
    };
  }, []);
  const getRowId = useCallback(function (params) {
    return params.data.a;
  }, []);
  const datasource = useMemo(() => {
    return getDataSource(100);
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowModelType={"infinite"}
          rowSelection={"multiple"}
          maxBlocksInCache={2}
          suppressRowClickSelection={true}
          getRowId={getRowId}
          datasource={datasource}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
