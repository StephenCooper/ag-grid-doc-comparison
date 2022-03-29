import {
  FirstDataRenderedEvent,
  Grid,
  GridOptions,
  IFiltersToolPanel,
  KeyCreatorParams,
  ValueFormatterParams,
} from "ag-grid-community";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";

const gridOptions: GridOptions = {
  columnDefs: [
    {
      headerName: "Country (Complex Object)",
      field: "country",
      keyCreator: countryKeyCreator,
      valueFormatter: countryValueFormatter,
      filter: "agSetColumnFilter",
    },
  ],
  defaultColDef: {
    flex: 1,
    floatingFilter: true,
  },
  sideBar: "filters",
  onFirstDataRendered: onFirstDataRendered,
};

function countryKeyCreator(params: KeyCreatorParams) {
  var countryObject = params.value;
  return countryObject.name;
}

function countryValueFormatter(params: ValueFormatterParams) {
  return params.value.name;
}

function printFilterModel() {
  var filterModel = gridOptions.api!.getFilterModel();
  console.log(filterModel);
}

function onFirstDataRendered(params: FirstDataRenderedEvent) {
  (
    params.api.getToolPanelInstance("filters") as any as IFiltersToolPanel
  ).expandFilters();
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then(function (data) {
    // hack the data, replace each country with an object of country name and code
    data.forEach(function (row: any) {
      var countryName = row.country;
      var countryCode = countryName.substring(0, 2).toUpperCase();
      row.country = {
        name: countryName,
        code: countryCode,
      };
    });

    gridOptions.api!.setRowData(data);
  });

if (typeof window !== "undefined") {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).printFilterModel = printFilterModel;
}
