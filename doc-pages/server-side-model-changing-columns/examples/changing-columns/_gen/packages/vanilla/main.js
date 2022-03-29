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

const columnDefs = [
  colDefAthlete,
  colDefAge,
  colDefCountry,
  colDefYear,
  colDefSport,
  colDefGold,
  colDefSilver,
  colDefBronze,
];

const gridOptions = {
  columnDefs: columnDefs,
  defaultColDef: {
    flex: 1,
    minWidth: 120,
    resizable: true,
    sortable: true,
  },
  autoGroupColumnDef: {
    minWidth: 200,
  },
  // use the server-side row model
  rowModelType: "serverSide",
  serverSideStoreType: "partial",

  onGridReady: function () {
    document.getElementById("athlete").checked = true;
    document.getElementById("age").checked = true;
    document.getElementById("country").checked = true;
    document.getElementById("year").checked = true;
    document.getElementById("sport").checked = true;
    document.getElementById("gold").checked = true;
    document.getElementById("silver").checked = true;
    document.getElementById("bronze").checked = true;
  },

  animateRows: true,
  suppressAggFuncInHeader: true,
  // debug: true,
};

function getAthletesAsync(params) {
  var countries = fakeServer.getAthletes();

  // simulating real server call with a 500ms delay
  setTimeout(function () {
    params.success(countries);
  }, 500);
}

function onBtApply() {
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

  gridOptions.api.setColumnDefs(cols);
}

function getBooleanValue(cssSelector) {
  return document.querySelector(cssSelector).checked === true;
}

function getServerSideDatasource(server) {
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
}

var fakeServer = undefined;

// setup the grid after the page has finished loading
document.addEventListener("DOMContentLoaded", function () {
  var gridDiv = document.querySelector("#myGrid");
  new agGrid.Grid(gridDiv, gridOptions);

  fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
    .then((response) => response.json())
    .then(function (data) {
      // setup the fake server with entire dataset
      fakeServer = new FakeServer(data);

      // create datasource with a reference to the fake server
      var datasource = getServerSideDatasource(fakeServer);

      // register the datasource with the grid
      gridOptions.api.setServerSideDatasource(datasource);
    });
});
