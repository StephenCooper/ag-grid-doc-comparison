import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  ModuleRegistry,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
  SetFilterModule,
]);

const columnDefs: (ColDef | ColGroupDef)[] = [
  {
    headerName: ' ',
    headerCheckboxSelection: true,
    checkboxSelection: true,
    floatingFilter: false,
    suppressMenu: true,
    minWidth: 55,
    maxWidth: 55,
    width: 55,
    flex: 0,
    resizable: false,
    sortable: false,
    editable: false,
    filter: false,
    suppressColumnsToolPanel: true,
  },
  {
    headerName: 'Participant',
    children: [
      { field: 'athlete', minWidth: 170 },
      { field: 'country', minWidth: 150 },
    ],
  },
  { field: 'sport' },
  {
    headerName: 'Medals',
    children: [
      {
        field: 'total',
        columnGroupShow: 'closed',
        filter: 'agNumberColumnFilter',
        width: 120,
        flex: 0,
      },
      {
        field: 'gold',
        columnGroupShow: 'open',
        filter: 'agNumberColumnFilter',
        width: 100,
        flex: 0,
      },
      {
        field: 'silver',
        columnGroupShow: 'open',
        filter: 'agNumberColumnFilter',
        width: 100,
        flex: 0,
      },
      {
        field: 'bronze',
        columnGroupShow: 'open',
        filter: 'agNumberColumnFilter',
        width: 100,
        flex: 0,
      },
    ],
  },
  { field: 'year', filter: 'agNumberColumnFilter' },
];

const gridOptions: GridOptions = {
  rowData: null,
  columnDefs: columnDefs,
  rowSelection: 'multiple',
  suppressRowClickSelection: true,
  defaultColDef: {
    editable: true,
    sortable: true,
    minWidth: 100,
    filter: true,
    resizable: true,
    floatingFilter: true,
    flex: 1,
  },
  sideBar: {
    toolPanels: ['columns', 'filters'],
    defaultToolPanel: '',
  },
};

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));
