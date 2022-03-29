import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css";
import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  IServerSideDatasource,
  ISetFilter,
  ServerSideStoreType,
  SetFilterValuesFuncParams,
} from "@ag-grid-community/core";
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

declare var FakeServer: any;
const columnDefs: ColDef[] = [
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
];

const gridOptions: GridOptions = {
  columnDefs: columnDefs,
  defaultColDef: {
    flex: 1,
    minWidth: 150,
    sortable: true,
    resizable: true,
  },
  // use the server-side row model
  rowModelType: "serverSide",
  serverSideStoreType: "partial",

  // fetch 100 rows at a time
  cacheBlockSize: 100,

  // only keep 10 blocks of rows
  maxBlocksInCache: 10,

  animateRows: true,
  // debug: true

  onFilterChanged: onFilterChanged,
};

var fakeServer: any;
var selectedCountries: string[] | null = null;

function onFilterChanged() {
  var countryFilterModel = gridOptions.api!.getFilterModel()["country"];
  var selected = countryFilterModel && countryFilterModel.values;

  if (!areEqual(selectedCountries, selected)) {
    selectedCountries = selected;

    console.log("Refreshing sports filter");
    var sportFilter = gridOptions.api!.getFilterInstance("sport") as ISetFilter;
    sportFilter!.refreshFilterValues();
  }
}

function areEqual(a: null | string[], b: null | string[]) {
  if (a == null && b == null) {
    return true;
  }
  if (a != null || b != null) {
    return false;
  }

  return (
    a!.length === b!.length &&
    a!.every(function (v, i) {
      return b![i] === v;
    })
  );
}

function getCountryValuesAsync(params: SetFilterValuesFuncParams) {
  var countries = fakeServer.getCountries();

  // simulating real server call with a 500ms delay
  setTimeout(function () {
    params.success(countries);
  }, 500);
}

function getSportValuesAsync(params: SetFilterValuesFuncParams) {
  var sports = fakeServer.getSports(selectedCountries);

  // simulating real server call with a 500ms delay
  setTimeout(function () {
    params.success(sports);
  }, 500);
}

function getServerSideDatasource(server: any): IServerSideDatasource {
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
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then(function (data) {
    // setup the fake server with entire dataset
    fakeServer = new FakeServer(data);

    // create datasource with a reference to the fake server
    var datasource = getServerSideDatasource(fakeServer);

    // register the datasource with the grid
    gridOptions.api!.setServerSideDatasource(datasource);
  });
