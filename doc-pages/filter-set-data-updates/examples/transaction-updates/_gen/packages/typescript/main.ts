import {
  FirstDataRenderedEvent,
  Grid,
  GridOptions,
  IFiltersToolPanel,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

const gridOptions: GridOptions = {
  rowData: getRowData(),
  columnDefs: [
    {
      headerName: 'Set Filter Column',
      field: 'col1',
      filter: 'agSetColumnFilter',
      editable: true,
      flex: 1,
    },
  ],
  sideBar: 'filters',
  onFirstDataRendered: onFirstDataRendered,
};

function getRowData() {
  return [
    { col1: 'A' },
    { col1: 'A' },
    { col1: 'B' },
    { col1: 'B' },
    { col1: 'C' },
    { col1: 'C' },
  ];
}

function updateFirstRow() {
  var firstRow = gridOptions.api!.getDisplayedRowAtIndex(0);
  if (firstRow) {
    var firstRowData = firstRow.data;
    firstRowData['col1'] += 'X';
    gridOptions.api!.applyTransaction({ update: [firstRowData] });
  }
}

function addDRow() {
  gridOptions.api!.applyTransaction({ add: [{ col1: 'D' }] });
}

function reset() {
  gridOptions.api!.setFilterModel(null);
  gridOptions.api!.setRowData(getRowData());
}

function onFirstDataRendered(params: FirstDataRenderedEvent) {
  ((params.api.getToolPanelInstance(
    'filters'
  ) as any) as IFiltersToolPanel).expandFilters();
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

if (typeof window !== 'undefined') {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).updateFirstRow = updateFirstRow;
  (<any>window).addDRow = addDRow;
  (<any>window).reset = reset;
}
