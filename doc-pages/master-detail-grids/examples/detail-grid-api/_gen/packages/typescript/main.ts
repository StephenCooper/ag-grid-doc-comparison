import {
  FirstDataRenderedEvent,
  GetRowIdParams,
  Grid,
  GridOptions,
  IDetailCellRendererParams,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

const gridOptions: GridOptions = {
  columnDefs: [
    // group cell renderer needed for expand / collapse icons
    { field: 'name', cellRenderer: 'agGroupCellRenderer' },
    { field: 'account' },
    { field: 'calls' },
    { field: 'minutes', valueFormatter: "x.toLocaleString() + 'm'" },
  ],
  masterDetail: true,
  detailRowHeight: 200,
  detailCellRendererParams: {
    detailGridOptions: {
      columnDefs: [
        { field: 'callId' },
        { field: 'direction' },
        { field: 'number', minWidth: 150 },
        { field: 'duration', valueFormatter: "x.toLocaleString() + 's'" },
        { field: 'switchCode', minWidth: 150 },
      ],
      defaultColDef: {
        flex: 1,
        editable: true,
        resizable: true,
      },
    },
    getDetailRowData: (params) => {
      params.successCallback(params.data.callRecords);
    },
  } as IDetailCellRendererParams,
  getRowId: (params: GetRowIdParams) => {
    // use 'account' as the row ID
    return params.data.account;
  },
  defaultColDef: {
    flex: 1,
    editable: true,
    resizable: true,
  },
  onFirstDataRendered: onFirstDataRendered,
};

function onFirstDataRendered(params: FirstDataRenderedEvent) {
  // expand the first two rows
  setTimeout(function () {
    params.api.forEachNode(function (node) {
      node.setExpanded(true);
    });
  }, 0);
}

function flashMilaSmithOnly() {
  // flash Mila Smith - we know her account is 177001 and we use the account for the row ID
  var detailGrid = gridOptions.api!.getDetailGridInfo('detail_177001');
  if (detailGrid) {
    detailGrid.api!.flashCells();
  }
}

function flashAll() {
  gridOptions.api!.forEachDetailGridInfo(function (detailGridApi) {
    detailGridApi.api!.flashCells();
  });
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

fetch('https://www.ag-grid.com/example-assets/master-detail-data.json')
  .then((response) => response.json())
  .then(function (data) {
    gridOptions.api!.setRowData(data);
  });

if (typeof window !== 'undefined') {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).flashMilaSmithOnly = flashMilaSmithOnly;
  (<any>window).flashAll = flashAll;
}
