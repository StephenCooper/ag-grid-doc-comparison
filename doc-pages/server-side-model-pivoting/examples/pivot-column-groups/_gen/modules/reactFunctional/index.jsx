"use strict";

import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css";
import { AgGridReact } from "@ag-grid-community/react";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { ServerSideRowModelModule } from "@ag-grid-enterprise/server-side-row-model";
import React, { useCallback, useMemo, useState } from "react";
import { render } from "react-dom";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ServerSideRowModelModule,
  RowGroupingModule,
  MenuModule,
  ColumnsToolPanelModule,
]);

const getServerSideDatasource = (server) => {
  return {
    getRows: function (params) {
      var request = params.request;
      console.log("[Datasource] - rows requested by grid: ", params.request);
      var response = server.getData(request);
      // add pivot colDefs in the grid based on the resulting data
      addPivotColDefs(request, response, params.columnApi);
      // simulating real server call with a 500ms delay
      setTimeout(function () {
        if (response.success) {
          // supply data to grid
          params.success({
            rowData: response.rows,
            rowCount: response.lastRow,
          });
        } else {
          params.fail();
        }
      }, 500);
    },
  };
};

const addPivotColDefs = (request, response, columnApi) => {
  // check if pivot colDefs already exist
  var existingPivotColDefs = columnApi.getSecondaryColumns();
  if (existingPivotColDefs && existingPivotColDefs.length > 0) {
    return;
  }
  // create pivot colDef's based of data returned from the server
  var pivotColDefs = createPivotColDefs(request, response.pivotFields);
  // supply secondary columns to the grid
  columnApi.setSecondaryColumns(pivotColDefs);
};

const createPivotColDefs = (request, pivotFields) => {
  function addColDef(colId, parts, res) {
    if (parts.length === 0) return [];
    var first = parts.shift();
    var existing = res.filter(function (r) {
      return "groupId" in r && r.groupId === first;
    })[0];
    if (existing) {
      existing["children"] = addColDef(colId, parts, existing.children);
    } else {
      var colDef = {};
      var isGroup = parts.length > 0;
      if (isGroup) {
        colDef["groupId"] = first;
        colDef["headerName"] = first;
      } else {
        var valueCol = request.valueCols.filter(function (r) {
          return r.field === first;
        })[0];
        colDef["colId"] = colId;
        colDef["headerName"] = valueCol.displayName;
        colDef["field"] = colId;
      }
      var children = addColDef(colId, parts, []);
      children.length > 0 ? (colDef["children"] = children) : null;
      res.push(colDef);
    }
    return res;
  }
  if (request.pivotMode && request.pivotCols.length > 0) {
    var secondaryCols = [];
    pivotFields.forEach(function (field) {
      addColDef(field, field.split("_"), secondaryCols);
    });
    return secondaryCols;
  }
  return [];
};

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const [columnDefs, setColumnDefs] = useState([
    { field: "country", rowGroup: true },
    { field: "sport", rowGroup: true },
    { field: "year", pivot: true },
    { field: "gold", aggFunc: "sum" },
    { field: "silver", aggFunc: "sum" },
    { field: "bronze", aggFunc: "sum" },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      width: 150,
      resizable: true,
      sortable: true,
    };
  }, []);
  const autoGroupColumnDef = useMemo(() => {
    return {
      minWidth: 200,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => {
        // setup the fake server with entire dataset
        var fakeServer = new FakeServer(data);
        // create datasource with a reference to the fake server
        var datasource = getServerSideDatasource(fakeServer);
        // register the datasource with the grid
        params.api.setServerSideDatasource(datasource);
      });
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine-dark">
        <AgGridReact
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          autoGroupColumnDef={autoGroupColumnDef}
          rowModelType={"serverSide"}
          serverSideStoreType={"partial"}
          pivotMode={true}
          animateRows={true}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
