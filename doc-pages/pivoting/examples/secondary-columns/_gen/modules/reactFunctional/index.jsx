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
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowGroupingModule,
  MenuModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
]);

const MyYearPivotComparator = (a, b) => {
  var requiredOrder = ["2012", "2010", "2008", "2006", "2004", "2002", "2000"];
  return requiredOrder.indexOf(a) - requiredOrder.indexOf(b);
};

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: "country", rowGroup: true, enableRowGroup: true },
    {
      field: "year",
      pivot: true,
      enablePivot: true,
      pivotComparator: MyYearPivotComparator,
    },
    { field: "date" },
    { field: "sport" },
    { field: "gold", aggFunc: "sum" },
    { field: "silver", aggFunc: "sum" },
    { field: "bronze", aggFunc: "sum" },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 150,
      filter: true,
      resizable: true,
    };
  }, []);
  const autoGroupColumnDef = useMemo(() => {
    return {
      minWidth: 250,
    };
  }, []);
  const postProcessSecondaryColDef = useCallback(function (params) {
    const colDef = params.colDef;
    // make all the columns upper case
    colDef.headerName = colDef.headerName.toUpperCase();
    // the pivot keys are the keys use for the pivot
    // don't change these, but you can use them for your information
    // console.log('Pivot Keys:');
    // console.log(colDef.pivotKeys);
    // // the value column is the value we are aggregating on
    // console.log('Pivot Value Keys:');
    // console.log(colDef.pivotValueColumn);
  }, []);
  const postProcessSecondaryColGroupDef = useCallback(function (params) {
    const colGroupDef = params.colGroupDef;
    // for fun, add a css class for 2002
    if (colGroupDef.pivotKeys[0] === "2002") {
      colGroupDef.headerClass = "color-background";
    }
    // put 'year' in front of each group
    colGroupDef.headerName = "Year " + colGroupDef.headerName;
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
          autoGroupColumnDef={autoGroupColumnDef}
          sideBar={true}
          pivotMode={true}
          suppressAggFuncInHeader={true}
          postProcessSecondaryColDef={postProcessSecondaryColDef}
          postProcessSecondaryColGroupDef={postProcessSecondaryColGroupDef}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
