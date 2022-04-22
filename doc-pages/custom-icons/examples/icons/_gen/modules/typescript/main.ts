import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  ColDef,
  Grid,
  GridOptions,
  ModuleRegistry,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { SideBarModule } from '@ag-grid-enterprise/side-bar';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowGroupingModule,
  SideBarModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
]);

var myIcons = {
  sortAscending: function () {
    return 'ASC';
  },
  sortDescending: function () {
    return 'DESC';
  },
};

const columnDefs: ColDef[] = [
  {
    field: 'athlete',
    rowGroup: true,
    hide: true,
  },
  {
    field: 'age',
    width: 90,
    enableValue: true,
    icons: {
      // not very useful, but demonstrates you can just have strings
      sortAscending: 'U',
      sortDescending: 'D',
    },
  },
  {
    field: 'country',
    width: 150,
    rowGroupIndex: 0,
    icons: {
      sortAscending: '<i class="fa fa-sort-alpha-up"/>',
      sortDescending: '<i class="fa fa-sort-alpha-down"/>',
    },
  },
  { field: 'year', width: 90, enableRowGroup: true },
  { field: 'date' },
  {
    field: 'sport',
    width: 110,
    icons: myIcons,
  },
  { field: 'gold', width: 100 },
  { field: 'silver', width: 100 },
  { field: 'bronze', width: 100 },
  { field: 'total', width: 100 },
];

const gridOptions: GridOptions = {
  defaultColDef: {
    width: 150,
    sortable: true,
    resizable: true,
    filter: true,
    floatingFilter: true,
  },
  columnDefs: columnDefs,
  rowData: null,
  sideBar: true,
  autoGroupColumnDef: {
    headerName: 'Athlete',
    field: 'athlete',
    rowDrag: true,
    // use font awesome for first col, with numbers for sort
    icons: {
      menu: '<i class="fa fa-shower"/>',
      filter: '<i class="fa fa-long-arrow-alt-up"/>',
      columns: '<i class="fa fa-snowflake"/>',
      sortAscending: '<i class="fa fa-sort-alpha-up"/>',
      sortDescending: '<i class="fa fa-sort-alpha-down"/>',
    },
    headerCheckboxSelection: true,
    width: 300,
  },
  // override all the defaults with font awesome
  icons: {
    // use font awesome for menu icons
    menu: '<i class="fa fa-bath" style="width: 10px"/>',
    filter: '<i class="fa fa-long-arrow-alt-down"/>',
    columns: '<i class="fa fa-handshake"/>',
    sortAscending: '<i class="fa fa-long-arrow-alt-down"/>',
    sortDescending: '<i class="fa fa-long-arrow-alt-up"/>',
    // use some strings from group
    groupExpanded:
      '<img src="https://www.ag-grid.com/example-assets/group/contract.png" style="height: 12px; width: 12px;padding-right: 2px"/>',
    groupContracted:
      '<img src="https://www.ag-grid.com/example-assets/group/expand.png" style="height: 12px; width: 12px;padding-right: 2px"/>',
    columnMovePin: '<i class="far fa-hand-rock"/>',
    columnMoveAdd: '<i class="fa fa-plus-square"/>',
    columnMoveHide: '<i class="fa fa-times"/>',
    columnMoveMove: '<i class="fa fa-link"/>',
    columnMoveLeft: '<i class="fa fa-arrow-left"/>',
    columnMoveRight: '<i class="fa fa-arrow-right"/>',
    columnMoveGroup: '<i class="fa fa-users"/>',
    rowGroupPanel: '<i class="fa fa-university"/>',
    pivotPanel: '<i class="fa fa-magic"/>',
    valuePanel: '<i class="fa fa-magnet"/>',
    menuPin: 'P', // just showing letters, no graphic
    menuValue: 'V',
    menuAddRowGroup: 'A',
    menuRemoveRowGroup: 'R',
    clipboardCopy: '>>',
    clipboardPaste: '>>',
    rowDrag: '<i class="fa fa-circle"/>',
  },
  rowSelection: 'multiple',
};

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));
