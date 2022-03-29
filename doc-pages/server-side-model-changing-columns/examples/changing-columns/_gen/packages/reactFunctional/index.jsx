"use strict";

import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";

var colDefCountry = { field: "country", rowGroup: true };

var colDefYear = { field: "year", rowGroup: true };

var colDefAthlete = {
  field: "athlete",
  filter: "agSetColumnFilter",
  filterParams: {
    values: getAthletesAsync,
  },
  menuTabs: ["filterMenuTab"],
};

var colDefAge = { field: "age" };

var colDefSport = { field: "sport" };

var colDefGold = { field: "gold", aggFunc: "sum" };

var colDefSilver = { field: "silver", aggFunc: "sum" };

var colDefBronze = { field: "bronze", aggFunc: "sum" };

const getAthletesAsync = (params) => {
  var countries = fakeServer.getAthletes();
  // simulating real server call with a 500ms delay
  setTimeout(function () {
    params.success(countries);
  }, 500);
};

const getBooleanValue = (cssSelector) => {
  return document.querySelector(cssSelector).checked === true;
};

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
      }, 200);
    },
  };
};

var fakeServer = undefined;

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const [columnDefs, setColumnDefs] = useState([
    colDefAthlete,
    colDefAge,
    colDefCountry,
    colDefYear,
    colDefSport,
    colDefGold,
    colDefSilver,
    colDefBronze,
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
      minWidth: 200,
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

    document.getElementById("athlete").checked = true;
    document.getElementById("age").checked = true;
    document.getElementById("country").checked = true;
    document.getElementById("year").checked = true;
    document.getElementById("sport").checked = true;
    document.getElementById("gold").checked = true;
    document.getElementById("silver").checked = true;
    document.getElementById("bronze").checked = true;
  }, []);

  const onBtApply = useCallback(() => {
    var cols = [];
    if (getBooleanValue("#athlete")) {
      cols.push(colDefAthlete);
    }
    if (getBooleanValue("#age")) {
      cols.push(colDefAge);
    }
    if (getBooleanValue("#country")) {
      cols.push(colDefCountry);
    }
    if (getBooleanValue("#year")) {
      cols.push(colDefYear);
    }
    if (getBooleanValue("#sport")) {
      cols.push(colDefSport);
    }
    if (getBooleanValue("#gold")) {
      cols.push(colDefGold);
    }
    if (getBooleanValue("#silver")) {
      cols.push(colDefSilver);
    }
    if (getBooleanValue("#bronze")) {
      cols.push(colDefBronze);
    }
    gridRef.current.api.setColumnDefs(cols);
  }, []);

  return (
    <div style={containerStyle}>
      <div className="test-container">
        <div className="test-header">
          Select columns to show then hit 'Apply'
        </div>

        <div className="test-header">
          <label>
            <input type="checkbox" id="athlete" />
            Athlete
          </label>
          <label>
            <input type="checkbox" id="age" />
            Age
          </label>
          <label>
            <input type="checkbox" id="country" />
            Country
          </label>
          <label>
            <input type="checkbox" id="year" />
            Year
          </label>
          <label>
            <input type="checkbox" id="sport" />
            Sport
          </label>

          <label>
            <input type="checkbox" id="gold" />
            Gold
          </label>
          <label>
            <input type="checkbox" id="silver" />
            Silver
          </label>
          <label>
            <input type="checkbox" id="bronze" />
            Bronze
          </label>

          <button onClick={onBtApply}>Apply</button>
        </div>

        <div style={gridStyle} className="ag-theme-alpine-dark">
          <AgGridReact
            ref={gridRef}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            autoGroupColumnDef={autoGroupColumnDef}
            rowModelType={"serverSide"}
            serverSideStoreType={"partial"}
            animateRows={true}
            suppressAggFuncInHeader={true}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

render(<GridExample></GridExample>, document.querySelector("#root"));
