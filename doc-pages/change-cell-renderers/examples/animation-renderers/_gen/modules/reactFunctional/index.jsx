"use strict";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "@ag-grid-community/react";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const numberValueParser = (params) => {
  return Number(params.newValue);
};

const formatNumber = (number) => {
  // this puts commas into the number eg 1000 goes to 1,000,
  // i pulled this from stack overflow, i have no idea how it works
  return Math.floor(number)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

const createRowData = () => {
  const rowData = [];
  for (let i = 0; i < 20; i++) {
    rowData.push({
      a: Math.floor(((i + 323) * 25435) % 10000),
      b: Math.floor(((i + 323) * 23221) % 10000),
      c: Math.floor(((i + 323) * 468276) % 10000),
      d: 0,
      e: 0,
    });
  }
  return rowData;
};

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState(createRowData());
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Editable A",
      field: "a",
      editable: true,
      valueParser: numberValueParser,
    },
    {
      headerName: "Editable B",
      field: "b",
      editable: true,
      valueParser: numberValueParser,
    },
    {
      headerName: "Editable C",
      field: "c",
      editable: true,
      valueParser: numberValueParser,
    },
    {
      headerName: "API D",
      field: "d",
      minWidth: 140,
      valueParser: numberValueParser,
      cellRenderer: "agAnimateShowChangeCellRenderer",
    },
    {
      headerName: "API E",
      field: "e",
      minWidth: 140,
      valueParser: numberValueParser,
      cellRenderer: "agAnimateShowChangeCellRenderer",
    },
    {
      headerName: "Total",
      minWidth: 140,
      valueGetter: "data.a + data.b + data.c + data.d + data.e",
      cellRenderer: "agAnimateShowChangeCellRenderer",
    },
    {
      headerName: "Average",
      minWidth: 140,
      valueGetter: "(data.a + data.b + data.c + data.d + data.e) / 5",
      cellRenderer: "agAnimateSlideCellRenderer",
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 120,
      resizable: true,
      cellClass: "align-right",
      valueFormatter: function (params) {
        return formatNumber(params.value);
      },
    };
  }, []);

  const onUpdateSomeValues = useCallback(() => {
    const rowCount = gridRef.current.api.getDisplayedRowCount();
    for (let i = 0; i < 10; i++) {
      const row = Math.floor(Math.random() * rowCount);
      const rowNode = gridRef.current.api.getDisplayedRowAtIndex(row);
      rowNode.setDataValue("d", Math.floor(Math.random() * 10000));
      rowNode.setDataValue("e", Math.floor(Math.random() * 10000));
    }
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div style={{ marginBottom: "5px" }}>
          <button onClick={onUpdateSomeValues}>
            Update Some D &amp; E Values
          </button>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
