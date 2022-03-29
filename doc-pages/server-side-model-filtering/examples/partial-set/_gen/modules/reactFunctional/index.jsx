"use strict";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ServerSideRowModelModule } from "@ag-grid-enterprise/server-side-row-model";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import { MenuModule } from "@ag-grid-enterprise/menu";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ServerSideRowModelModule,
  SetFilterModule,
  MenuModule,
]);

var fakeServer;

var selectedCountries = null;

const areEqual = (a, b) => {
  if (a == null && b == null) {
    return true;
  }
  if (a != null || b != null) {
    return false;
  }
  return (
    a.length === b.length &&
    a.every(function (v, i) {
      return b[i] === v;
    })
  );
};

const getCountryValuesAsync = (params) => {
  var countries = fakeServer.getCountries();
  // simulating real server call with a 500ms delay
  setTimeout(function () {
    params.success(countries);
  }, 500);
};

const getSportValuesAsync = (params) => {
  var sports = fakeServer.getSports(selectedCountries);
  // simulating real server call with a 500ms delay
  setTimeout(function () {
    params.success(sports);
  }, 500);
};

const getServerSideDatasource = (server) => {
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
      }, 500);
    },
  };
};

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "country",
      filter: "agSetColumnFilter",
      filterParams: {
        values: getCountryValuesAsync,
      },
      menuTabs: ["filterMenuTab"],
    },
    {
      field: "sport",
      filter: "agSetColumnFilter",
      filterParams: {
        values: getSportValuesAsync,
      },
      menuTabs: ["filterMenuTab"],
    },
    { field: "athlete", menuTabs: undefined },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 150,
      sortable: true,
      resizable: true,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((resp) => resp.json())
      .then((data) => {
        // setup the fake server with entire dataset
        fakeServer = new FakeServer(data);
        // create datasource with a reference to the fake server
        var datasource = getServerSideDatasource(fakeServer);
        // register the datasource with the grid
        params.api.setServerSideDatasource(datasource);
      });
  }, []);

  const onFilterChanged = useCallback(() => {
    var countryFilterModel = gridRef.current.api.getFilterModel()["country"];
    var selected = countryFilterModel && countryFilterModel.values;
    if (!areEqual(selectedCountries, selected)) {
      selectedCountries = selected;
      console.log("Refreshing sports filter");
      var sportFilter = gridRef.current.api.getFilterInstance("sport");
      sportFilter.refreshFilterValues();
    }
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine-dark">
        <AgGridReact
          ref={gridRef}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowModelType={"serverSide"}
          serverSideStoreType={"partial"}
          cacheBlockSize={100}
          maxBlocksInCache={10}
          animateRows={true}
          onGridReady={onGridReady}
          onFilterChanged={onFilterChanged}
        ></AgGridReact>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
