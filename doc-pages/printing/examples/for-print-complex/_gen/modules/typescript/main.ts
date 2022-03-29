import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import {
  ColDef,
  FirstDataRenderedEvent,
  Grid,
  GridApi,
  GridOptions,
  ModuleRegistry,
} from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule]);

const columnDefs: ColDef[] = [
  { field: "group", rowGroup: true, hide: true },
  { field: "id", pinned: "left", width: 70 },
  { field: "model", width: 180 },
  { field: "color", width: 100 },
  {
    field: "price",
    valueFormatter: "'$' + value.toLocaleString()",
    width: 100,
  },
  { field: "year", width: 100 },
  { field: "country", width: 120 },
];

const gridOptions: GridOptions = {
  defaultColDef: {
    sortable: true,
  },
  columnDefs: columnDefs,
  rowData: getData(),
  animateRows: true,
  groupDisplayType: "groupRows",
  onFirstDataRendered: onFirstDataRendered,
};

function onFirstDataRendered(params: FirstDataRenderedEvent) {
  params.api.expandAll();
}

function onBtPrint() {
  const api = gridOptions.api!;

  setPrinterFriendly(api);

  setTimeout(function () {
    print();
    setNormal(api);
  }, 2000);
}

function setPrinterFriendly(api: GridApi) {
  const eGridDiv = document.querySelector<HTMLElement>("#myGrid")! as any;
  eGridDiv.style.height = "";
  api.setDomLayout("print");
}

function setNormal(api: GridApi) {
  const eGridDiv = document.querySelector<HTMLElement>("#myGrid")! as any;
  eGridDiv.style.width = "700px";
  eGridDiv.style.height = "200px";

  api.setDomLayout();
}

// setup the grid after the page has finished loading
const gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

if (typeof window !== "undefined") {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).onBtPrint = onBtPrint;
}
