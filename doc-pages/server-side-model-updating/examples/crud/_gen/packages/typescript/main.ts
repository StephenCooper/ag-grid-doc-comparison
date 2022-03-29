import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import {
  ColDef,
  ColGroupDef,
  GetRowIdFunc,
  GetRowIdParams,
  Grid,
  GridOptions,
  IServerSideDatasource,
  IServerSideGetRowsParams,
  ServerSideStoreType,
} from "ag-grid-community";
declare var window: any;

const columnDefs: ColDef[] = [
  { field: "athlete", width: 150 },
  { field: "age" },
  { field: "country", width: 150 },
  { field: "year" },
  { field: "sport" },
  { field: "gold" },
  { field: "silver" },
  { field: "bronze" },
];

const gridOptions: GridOptions = {
  defaultColDef: {
    width: 100,
    resizable: true,
  },
  rowSelection: "single",
  columnDefs: columnDefs,
  rowModelType: "serverSide",
  serverSideStoreType: "partial",
  getRowId: getRowId,
};

function getRowId(params: GetRowIdParams) {
  return params.data.id;
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>("#myGrid")!;
new Grid(gridDiv, gridOptions);

fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
  .then((response) => response.json())
  .then(function (data) {
    // add id to data
    let idSequence = 0;
    data.forEach(function (item: any) {
      item.id = idSequence++;
    });
    var datasource = createMyDataSource(data);
    gridOptions.api!.setServerSideDatasource(datasource);
  });

var newItemCount = 0;

function onBtRemove() {
  var selectedRows = gridOptions.api!.getSelectedNodes();
  if (!selectedRows || selectedRows.length === 0) {
    return;
  }

  var selectedRow = selectedRows[0];

  var indexToRemove = window.rowDataServerSide.indexOf(selectedRow.data);
  // the record could be missing, if the user hit the 'remove' button a few times before refresh happens
  if (indexToRemove >= 0) {
    window.rowDataServerSide.splice(indexToRemove, 1);
  }

  gridOptions.api!.refreshServerSideStore();
}

function onBtAdd() {
  var selectedRows = gridOptions.api!.getSelectedNodes();
  if (!selectedRows || selectedRows.length === 0) {
    return;
  }

  var selectedRow = selectedRows[0];

  // insert new row in the source data, at the top of the page
  window.rowDataServerSide.splice(selectedRow.rowIndex, 0, {
    athlete: "New Item" + newItemCount,
    id: "" + Math.random(),
  });
  newItemCount++;

  gridOptions.api!.refreshServerSideStore();
}

function createMyDataSource(data: any[]) {
  window.rowDataServerSide = data;

  const dataSource: IServerSideDatasource = {
    getRows: function (params: IServerSideGetRowsParams) {
      setTimeout(function () {
        // take a slice of the total rows
        var rowsThisPage = data.slice(
          params.request.startRow,
          params.request.endRow
        );
        // call the success callback
        params.success({
          rowData: rowsThisPage,
          rowCount: window.rowDataServerSide.length,
        });
      }, 500);
    },
  };

  return dataSource;
}

if (typeof window !== "undefined") {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).onBtRemove = onBtRemove;
  (<any>window).onBtAdd = onBtAdd;
}
