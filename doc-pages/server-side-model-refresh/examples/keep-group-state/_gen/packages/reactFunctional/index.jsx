"use strict";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";

var versionCounter = 1;

const getServerSideDatasource = (server) => {
  return {
    getRows: function (params) {
      console.log("[Datasource] - rows requested by grid: ", params.request);
      var response = server.getData(params.request);
      response.rows = response.rows.map(function (item) {
        var res = {};
        Object.assign(res, item);
        res.version =
          versionCounter + " - " + versionCounter + " - " + versionCounter;
        // for unique-id purposes in the client, we also want to attached
        // the parent group keys
        params.request.groupKeys.forEach(function (groupKey, index) {
          var col = params.request.rowGroupCols[index];
          var field = col.id;
          res[field] = groupKey;
        });
        return res;
      });
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
      }, 1000);
    },
  };
};

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const [columnDefs, setColumnDefs] = useState([
    { field: "country", rowGroup: true, hide: true },
    { field: "year", rowGroup: true, hide: true },
    { field: "version" },
    { field: "gold", aggFunc: "sum" },
    { field: "silver", aggFunc: "sum" },
    { field: "bronze", aggFunc: "sum" },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 150,
      resizable: true,
      sortable: true,
    };
  }, []);
  const autoGroupColumnDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 280,
      field: "athlete",
    };
  }, []);
  const getRowId = useCallback(function (params) {
    var data = params.data;
    var parts = [];
    if (data.country != null) {
      parts.push(data.country);
    }
    if (data.year != null) {
      parts.push(data.year);
    }
    if (data.id != null) {
      parts.push(data.id);
    }
    return parts.join("-");
  }, []);

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => {
        // give each data item an ID
        data.forEach(function (dataItem, index) {
          dataItem.id = index;
        });
        // setup the fake server with entire dataset
        var fakeServer = new FakeServer(data);
        // create datasource with a reference to the fake server
        var datasource = getServerSideDatasource(fakeServer);
        // register the datasource with the grid
        params.api.setServerSideDatasource(datasource);
      });
  }, []);

  const refreshCache = useCallback(
    (route) => {
      versionCounter++;
      var purge = document.querySelector("#purge").checked === true;
      gridRef.current.api.refreshServerSideStore({
        route: route,
        purge: purge,
      });
    },
    [versionCounter]
  );

  return (
    <div style={containerStyle}>
      <div className="example-wrapper">
        <div style={{ marginBottom: "5px" }}>
          <button onClick={() => refreshCache(undefined)}>
            Refresh Top Level
          </button>
          <button onClick={() => refreshCache(["Canada"])}>
            Refresh [Canada]
          </button>
          <button onClick={() => refreshCache(["Canada", 2002])}>
            Refresh [Canada,2002]
          </button>

          <label>
            <input type="checkbox" id="purge" /> Purge
          </label>
        </div>

        <div style={gridStyle} className="ag-theme-alpine-dark">
          <AgGridReact
            ref={gridRef}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            autoGroupColumnDef={autoGroupColumnDef}
            getRowId={getRowId}
            rowModelType={"serverSide"}
            serverSideStoreType={"full"}
            enableCellChangeFlash={true}
            suppressAggFuncInHeader={true}
            animateRows={true}
            debug={true}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
