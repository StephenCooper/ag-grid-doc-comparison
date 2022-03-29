"use strict";

import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "@ag-grid-community/react";
import { MasterDetailModule } from "@ag-grid-enterprise/master-detail";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import DetailCellRenderer from "./detailCellRenderer.jsx";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, MasterDetailModule]);

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const detailCellRenderer = useMemo(() => {
    return DetailCellRenderer;
  }, []);
  const [columnDefs, setColumnDefs] = useState([
    // group cell renderer needed for expand / collapse icons
    { field: "name", cellRenderer: "agGroupCellRenderer", pinned: "left" },
    { field: "account" },
    { field: "calls" },
    { field: "minutes", valueFormatter: "x.toLocaleString() + 'm'" },
    { headerName: "Extra Col 1", valueGetter: '"AAA"' },
    { headerName: "Extra Col 2", valueGetter: '"BBB"' },
    { headerName: "Extra Col 3", valueGetter: '"CCC"' },
    { headerName: "Pinned Right", pinned: "right" },
  ]);
  const defaultColDef = useMemo(() => {
    return {};
  }, []);

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/master-detail-data.json")
      .then((resp) => resp.json())
      .then((data) => {
        setRowData(data);
      });
  }, []);

  const onFirstDataRendered = useCallback((params) => {
    setTimeout(function () {
      gridRef.current.api.forEachNode(function (node) {
        node.setExpanded(node.id === "1");
      });
    }, 1000);
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          masterDetail={true}
          detailCellRenderer={detailCellRenderer}
          detailRowHeight={150}
          animateRows={true}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          embedFullWidthRows={true}
          onGridReady={onGridReady}
          onFirstDataRendered={onFirstDataRendered}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
