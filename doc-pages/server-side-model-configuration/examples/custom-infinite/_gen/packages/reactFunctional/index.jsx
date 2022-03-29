"use strict";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import React, { useCallback, useMemo, useState } from "react";
import { render } from "react-dom";

const createServerSideDatasource = (server) => {
  return {
    getRows: function (params) {
      console.log("[Datasource] - rows requested by grid: ", params.request);
      // get data for request from our fake server
      var response = server.getData(params.request);
      // simulating real server call with a 500ms delay
      setTimeout(function () {
        if (response.success) {
          // supply rows for requested block to grid
          params.success({
            rowData: response.rows,
            rowCount: response.lastRow,
          });
        } else {
          params.fail();
        }
      }, 1000);
    },
  };
};

const createFakeServer = (allData) => {
  return {
    getData: function (request) {
      // take a slice of the total rows for requested block
      var rowsForBlock = allData.slice(request.startRow, request.endRow);
      // here we are pretending we don't know the last row until we reach it!
      var lastRow = getLastRowIndex(request, rowsForBlock);
      return {
        success: true,
        rows: rowsForBlock,
        lastRow: lastRow,
      };
    },
  };
};

const getLastRowIndex = (request, results) => {
  if (!results) return undefined;
  var currentLastRow = (request.startRow || 0) + results.length;
  // if on or after the last block, work out the last row, otherwise return 'undefined'
  return currentLastRow < (request.endRow || 0) ? currentLastRow : undefined;
};

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const [columnDefs, setColumnDefs] = useState([
    { field: "id", maxWidth: 80 },
    { field: "athlete", minWidth: 220 },
    { field: "country", minWidth: 200 },
    { field: "year" },
    { field: "sport", minWidth: 200 },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      resizable: true,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => {
        // adding row id to data
        var idSequence = 0;
        data.forEach(function (item) {
          item.id = idSequence++;
        });
        // setup the fake server with entire dataset
        var fakeServer = createFakeServer(data);
        // create datasource with a reference to the fake server
        var datasource = createServerSideDatasource(fakeServer);
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
          rowBuffer={0}
          rowModelType={"serverSide"}
          serverSideStoreType={"partial"}
          cacheBlockSize={50}
          maxBlocksInCache={2}
          debug={true}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
