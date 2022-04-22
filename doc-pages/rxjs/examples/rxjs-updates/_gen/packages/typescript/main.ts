import {
  ColDef,
  GetRowIdParams,
  Grid,
  GridOptions,
  ValueFormatterParams,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
declare function createMockServer(): any;

const columnDefs: ColDef[] = [
  { field: 'code', maxWidth: 90 },
  { field: 'name', minWidth: 200 },
  {
    field: 'bid',
    cellClass: 'cell-number',
    valueFormatter: numberFormatter,
    cellRenderer: 'agAnimateShowChangeCellRenderer',
  },
  {
    field: 'mid',
    cellClass: 'cell-number',
    valueFormatter: numberFormatter,
    cellRenderer: 'agAnimateShowChangeCellRenderer',
  },
  {
    field: 'ask',
    cellClass: 'cell-number',
    valueFormatter: numberFormatter,
    cellRenderer: 'agAnimateShowChangeCellRenderer',
  },
  {
    field: 'volume',
    cellClass: 'cell-number',
    cellRenderer: 'agAnimateSlideCellRenderer',
  },
];

function numberFormatter(params: ValueFormatterParams) {
  if (typeof params.value === 'number') {
    return params.value.toFixed(2);
  }

  return params.value;
}

const gridOptions: GridOptions = {
  defaultColDef: {
    flex: 1,
    minWidth: 100,
    resizable: true,
  },
  enableRangeSelection: true,
  columnDefs: columnDefs,
  getRowId: (params: GetRowIdParams) => {
    return params.data.code;
  },
  onGridReady: (params) => {
    var mockServer = createMockServer(),
      initialLoad$ = mockServer.initialLoad(),
      updates$ = mockServer.byRowupdates();

    initialLoad$.subscribe(function (rowData: any[]) {
      // the initial full set of data
      // note that we don't need to un-subscribe here as it's a one off data load
      params.api.setRowData(rowData);

      // now listen for updates
      // we process the updates with a transaction - this ensures that only the changes
      // rows will get re-rendered, improving performance
      updates$.subscribe(function (updates: any[]) {
        return params.api.applyTransaction({ update: updates });
      });
    });
  },
};

var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);
