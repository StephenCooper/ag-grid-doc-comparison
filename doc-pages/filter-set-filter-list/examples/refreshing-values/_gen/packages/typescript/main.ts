import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  FirstDataRenderedEvent,
  Grid,
  GridOptions,
  IFiltersToolPanel,
  ISetFilter,
  ISetFilterParams,
  SetFilterValuesFuncParams,
  SideBarDef,
} from "ag-grid-community";

var list1 = ["Elephant", "Lion", "Monkey"];
var list2 = ["Elephant", "Giraffe", "Tiger"];

var valuesArray = list1.slice();
var valuesCallbackList = list1;

function valuesCallback(params: SetFilterValuesFuncParams) {
  setTimeout(function () {
    params.success(valuesCallbackList);
  }, 1000);
}

var arrayFilterParams = {
  values: valuesArray,
};

var callbackFilterParams: Partial<ISetFilterParams> = {
  values: valuesCallback,
  refreshValuesOnOpen: true,
};

const gridOptions: GridOptions = {
  columnDefs: [
    {
      colId: "array",
      headerName: "Values Array",
      field: "animal",
      filter: "agSetColumnFilter",
      filterParams: arrayFilterParams,
    },
    {
      colId: "callback",
      headerName: "Values Callback",
      field: "animal",
      filter: "agSetColumnFilter",
      filterParams: callbackFilterParams,
    },
  ],
  defaultColDef: {
    flex: 1,
    filter: true,
    resizable: true,
  },
  sideBar: "filters",
  rowData: getData(),
  onFirstDataRendered: onFirstDataRendered,
};

function onFirstDataRendered(params: FirstDataRenderedEvent) {
  (
    params.api.getToolPanelInstance("filters") as any as IFiltersToolPanel
  ).expandFilters();
}

function useList1() {
  console.log("Updating values to " + list1);
  valuesArray.length = 0;
  list1.forEach(function (value) {
    valuesArray.push(value);
  });

  var filter = gridOptions.api!.getFilterInstance("array") as ISetFilter;
  filter.refreshFilterValues();

  valuesCallbackList = list1;
}

function useList2() {
  console.log("Updating values to " + list2);
  valuesArray.length = 0;
  list2.forEach(function (value) {
    valuesArray.push(value);
  });

  var filter = gridOptions.api!.getFilterInstance("array") as ISetFilter;
  filter.refreshFilterValues();

  valuesCallbackList = list2;
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

if (typeof window !== "undefined") {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).useList1 = useList1;
  (<any>window).useList2 = useList2;
}
