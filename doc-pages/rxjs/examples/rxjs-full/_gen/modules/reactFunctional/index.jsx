"use strict";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "@ag-grid-community/react";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import React, { useCallback, useMemo, useState } from "react";
import { render } from "react-dom";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule]);

const numberFormatter = (params) => {
  if (typeof params.value === "number") {
    return params.value.toFixed(2);
  }
  return params.value;
};

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: "code", maxWidth: 90 },
    { field: "name", minWidth: 200 },
    {
      field: "bid",
      cellClass: "cell-number",
      valueFormatter: numberFormatter,
      cellRenderer: "agAnimateShowChangeCellRenderer",
    },
    {
      field: "mid",
      cellClass: "cell-number",
      valueFormatter: numberFormatter,
      cellRenderer: "agAnimateShowChangeCellRenderer",
    },
    {
      field: "ask",
      cellClass: "cell-number",
      valueFormatter: numberFormatter,
      cellRenderer: "agAnimateShowChangeCellRenderer",
    },
    {
      field: "volume",
      cellClass: "cell-number",
      cellRenderer: "agAnimateSlideCellRenderer",
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      resizable: true,
    };
  }, []);
  const getRowId = useCallback(function (params) {
    return params.data.code;
  }, []);

  const onGridReady = useCallback((params) => {
    const mockServer = createMockServer(),
      initialLoad$ = mockServer.initialLoad(),
      updates$ = mockServer.allDataUpdates();
    initialLoad$.subscribe(function (rowData) {
      // the initial full set of data
      // note that we don't need to un-subscribe here as it's a one off data load
      setRowData(rowData);
      // now listen for updates
      // we're using immutableData this time, so although we're setting the entire
      // data set here, the grid will only re-render changed rows, improving performance
      updates$.subscribe(function (newRowData) {
        return params.api.setRowData(newRowData);
      });
    });
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          enableRangeSelection={true}
          getRowId={getRowId}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
