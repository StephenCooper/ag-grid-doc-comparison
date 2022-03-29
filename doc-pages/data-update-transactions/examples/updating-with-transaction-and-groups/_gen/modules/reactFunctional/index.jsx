"use strict";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule]);

const poundFormatter = (params) => {
  return (
    "£" +
    Math.floor(params.value)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  );
};

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState(getData());
  const [columnDefs, setColumnDefs] = useState([
    { field: "category", rowGroupIndex: 1, hide: true },
    { field: "price", aggFunc: "sum", valueFormatter: poundFormatter },
    { field: "zombies" },
    { field: "style" },
    { field: "clothes" },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      width: 100,
      sortable: true,
    };
  }, []);
  const autoGroupColumnDef = useMemo(() => {
    return {
      headerName: "Group",
      minWidth: 250,
      field: "model",
      rowGroupIndex: 1,
      cellRenderer: "agGroupCellRenderer",
      cellRendererParams: {
        checkbox: true,
      },
    };
  }, []);
  const getRowClass = useCallback(function (params) {
    var rowNode = params.node;
    if (rowNode.group) {
      switch (rowNode.key) {
        case "In Workshop":
          return "category-in-workshop";
        case "Sold":
          return "category-sold";
        case "For Sale":
          return "category-for-sale";
        default:
          return undefined;
      }
    } else {
      // no extra classes for leaf rows
      return undefined;
    }
  }, []);

  const getRowData = useCallback(() => {
    var rowData = [];
    gridRef.current.api.forEachNode(function (node) {
      rowData.push(node.data);
    });
    console.log("Row Data:");
    console.log(rowData);
  }, []);

  const onAddRow = useCallback(
    (category) => {
      var rowDataItem = createNewRowData(category);
      gridRef.current.api.applyTransaction({ add: [rowDataItem] });
    },
    [createNewRowData]
  );

  const onMoveToGroup = useCallback((category) => {
    var selectedRowData = gridRef.current.api.getSelectedRows();
    selectedRowData.forEach(function (dataItem) {
      dataItem.category = category;
    });
    gridRef.current.api.applyTransaction({ update: selectedRowData });
  }, []);

  const onRemoveSelected = useCallback(() => {
    var selectedRowData = gridRef.current.api.getSelectedRows();
    gridRef.current.api.applyTransaction({ remove: selectedRowData });
  }, []);

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div style={{ marginBottom: "5px" }}>
          <div>
            <button className="bt-action" onClick={() => onAddRow("For Sale")}>
              Add For Sale
            </button>
            <button
              className="bt-action"
              onClick={() => onAddRow("In Workshop")}
            >
              Add In Workshop
            </button>
            <button className="bt-action" onClick={onRemoveSelected}>
              Remove Selected
            </button>
            <button className="bt-action" onClick={getRowData}>
              Get Row Data
            </button>
          </div>
          <div style={{ marginTop: "5px" }}>
            <button
              className="bt-action"
              onClick={() => onMoveToGroup("For Sale")}
            >
              Move to For Sale
            </button>
            <button
              className="bt-action"
              onClick={() => onMoveToGroup("In Workshop")}
            >
              Move to In Workshop
            </button>
            <button className="bt-action" onClick={() => onMoveToGroup("Sold")}>
              Move to Sold
            </button>
          </div>
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            autoGroupColumnDef={autoGroupColumnDef}
            groupDefaultExpanded={1}
            suppressRowClickSelection={true}
            rowSelection={"multiple"}
            animateRows={true}
            groupSelectsChildren={true}
            suppressAggFuncInHeader={true}
            getRowClass={getRowClass}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
