"use strict";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import React, { useCallback, useMemo, useState } from "react";
import { render } from "react-dom";

const getServerSideDatasource = (server) => {
  return {
    getRows: function (params) {
      console.log("[Datasource] - rows requested by grid: ", params.request);
      var response = server.getData(params.request);
      // adding delay to simulate real server call
      setTimeout(function () {
        if (response.success) {
          // call the success callback
          params.success({
            rowData: response.rows,
            rowCount: response.lastRow,
          });
        } else {
          // inform the grid request failed
          params.fail();
        }
      }, 400);
    },
  };
};

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const [columnDefs, setColumnDefs] = useState([
    { field: "country", enableRowGroup: true, rowGroup: true },
    { field: "sport", enableRowGroup: true, rowGroup: true },
    { field: "year", minWidth: 100 },
    { field: "gold", aggFunc: "sum" },
    { field: "silver", aggFunc: "sum" },
    { field: "bronze", aggFunc: "sum" },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 120,
      resizable: true,
      sortable: true,
    };
  }, []);
  const autoGroupColumnDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 280,
    };
  }, []);
  const getServerSideStoreParams = useCallback(function (params) {
    var noGroupingActive = params.rowGroupColumns.length == 0;
    var res;
    if (noGroupingActive) {
      res = {
        // infinite scrolling
        storeType: "partial",
        // 100 rows per block
        cacheBlockSize: 100,
        // purge blocks that are not needed
        maxBlocksInCache: 2,
      };
    } else {
      var topLevelRows = params.level == 0;
      res = {
        storeType: topLevelRows ? "full" : "partial",
        cacheBlockSize: params.level == 1 ? 5 : 2,
        maxBlocksInCache: -1, // never purge blocks
      };
    }
    console.log("############## NEW STORE ##############");
    console.log(
      "getServerSideStoreParams, level = " +
        params.level +
        ", result = " +
        JSON.stringify(res)
    );
    return res;
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
          rowGroupPanelShow={"always"}
          autoGroupColumnDef={autoGroupColumnDef}
          cacheBlockSize={4}
          rowModelType={"serverSide"}
          serverSideStoreType={"partial"}
          getServerSideStoreParams={getServerSideStoreParams}
          suppressAggFuncInHeader={true}
          animateRows={true}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
