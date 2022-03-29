"use strict";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";

const rowGroupCallback = (params) => {
  return params.node.key;
};

const getIndentClass = (params) => {
  var indent = 0;
  var node = params.node;
  while (node && node.parent) {
    indent++;
    node = node.parent;
  }
  return "indent-" + indent;
};

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: "country", minWidth: 120, rowGroup: true },
    { field: "year", rowGroup: true },
    { headerName: "Name", field: "athlete", minWidth: 150 },
    {
      headerName: "Name Length",
      valueGetter: 'data ? data.athlete.length : ""',
    },
    { field: "sport", minWidth: 120, rowGroup: true },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      filter: true,
      resizable: true,
      minWidth: 100,
      flex: 1,
    };
  }, []);
  const autoGroupColumnDef = useMemo(() => {
    return {
      cellClass: getIndentClass,
      minWidth: 250,
      flex: 1,
    };
  }, []);
  const excelStyles = useMemo(() => {
    return [
      {
        id: "indent-1",
        alignment: {
          indent: 1,
        },
        // note, dataType: 'string' required to ensure that numeric values aren't right-aligned
        dataType: "String",
      },
      {
        id: "indent-2",
        alignment: {
          indent: 2,
        },
        dataType: "String",
      },
      {
        id: "indent-3",
        alignment: {
          indent: 3,
        },
        dataType: "String",
      },
    ];
  }, []);

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => {
        setRowData(data);
        params.api.forEachNode(function (node) {
          node.expanded = true;
        });
        params.api.onGroupExpandedOrCollapsed();
      });
  }, []);

  const onBtnExportDataAsExcel = useCallback(() => {
    gridRef.current.api.exportDataAsExcel({
      processRowGroupCallback: rowGroupCallback,
    });
  }, []);

  return (
    <div style={containerStyle}>
      <div className="page-wrapper">
        <div>
          <button
            onClick={onBtnExportDataAsExcel}
            style={{ marginBottom: "5px", fontWeight: "bold" }}
          >
            Export to Excel
          </button>
        </div>

        <div className="grid-wrapper">
          <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact
              ref={gridRef}
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              autoGroupColumnDef={autoGroupColumnDef}
              excelStyles={excelStyles}
              onGridReady={onGridReady}
            ></AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
