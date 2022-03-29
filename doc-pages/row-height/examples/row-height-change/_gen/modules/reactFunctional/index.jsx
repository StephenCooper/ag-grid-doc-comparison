"use strict";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowGroupingModule,
  MenuModule,
  ColumnsToolPanelModule,
]);

var swimmingHeight;

var groupHeight;

var russiaHeight;

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState(getData());
  const [columnDefs, setColumnDefs] = useState([
    { field: "country", rowGroup: true },
    { field: "athlete" },
    { field: "date" },
    { field: "sport" },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ]);

  const setSwimmingHeight = useCallback((height) => {
    swimmingHeight = height;
    gridRef.current.api.resetRowHeights();
  }, []);

  const setGroupHeight = useCallback((height) => {
    groupHeight = height;
    gridRef.current.api.resetRowHeights();
  }, []);

  const setRussiaHeight = useCallback((height) => {
    // this is used next time resetRowHeights is called
    russiaHeight = height;
    gridRef.current.api.forEachNode(function (rowNode) {
      if (rowNode.data && rowNode.data.country === "Russia") {
        rowNode.setRowHeight(height);
      }
    });
    gridRef.current.api.onRowHeightChanged();
  }, []);

  const getRowHeight = useCallback(
    (params) => {
      if (params.node.group && groupHeight != null) {
        return groupHeight;
      } else if (
        params.data &&
        params.data.country === "Russia" &&
        russiaHeight != null
      ) {
        return russiaHeight;
      } else if (
        params.data &&
        params.data.sport === "Swimming" &&
        swimmingHeight != null
      ) {
        return swimmingHeight;
      }
    },
    [groupHeight, russiaHeight, swimmingHeight]
  );

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div
          style={{
            marginBottom: "5px",
            fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
            fontSize: "13px",
          }}
        >
          <div>
            Top Level Groups:
            <button onClick={() => setGroupHeight(42)}>42px</button>
            <button onClick={() => setGroupHeight(75)}>75px</button>
            <button onClick={() => setGroupHeight(125)}>125px</button>
          </div>
          <div style={{ marginTop: "5px" }}>
            Swimming Leaf Rows:
            <button onClick={() => setSwimmingHeight(42)}>42px</button>
            <button onClick={() => setSwimmingHeight(75)}>75px</button>
            <button onClick={() => setSwimmingHeight(125)}>125px</button>
          </div>
          <div style={{ marginTop: "5px" }}>
            Russia Leaf Rows:
            <button onClick={() => setRussiaHeight(42)}>42px</button>
            <button onClick={() => setRussiaHeight(75)}>75px</button>
            <button onClick={() => setRussiaHeight(125)}>125px</button>
          </div>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            animateRows={true}
            groupDefaultExpanded={1}
            getRowHeight={getRowHeight}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
