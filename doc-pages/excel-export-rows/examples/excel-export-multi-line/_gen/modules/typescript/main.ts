import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  ColDef,
  Grid,
  GridOptions,
  ModuleRegistry,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { CsvExportModule } from '@ag-grid-community/csv-export';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { MultilineCellRenderer } from './multilineCellRenderer';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  ExcelExportModule,
  CsvExportModule,
]);

const columnDefs: ColDef[] = [
  { field: 'address' },
  {
    headerName: 'Custom column',
    autoHeight: true,
    valueGetter: (param) => {
      return param.data.col1 + '\n' + param.data.col2;
    },
    cellRenderer: MultilineCellRenderer,
  },
];

const gridOptions: GridOptions = {
  defaultColDef: {
    sortable: true,
    cellClass: 'multiline',
    filter: true,
    resizable: true,
    minWidth: 100,
    flex: 1,
  },

  columnDefs: columnDefs,

  rowData: [
    {
      address:
        '1197 Thunder Wagon Common,\nCataract, RI, \n02987-1016, US, \n(401) 747-0763',
      col1: 'abc',
      col2: 'xyz',
    },
    {
      address:
        '3685 Rocky Glade, Showtucket, NU, \nX1E-9I0, CA, \n(867) 371-4215',
      col1: 'abc',
      col2: 'xyz',
    },
    {
      address:
        '3235 High Forest, Glen Campbell, MS, \n39035-6845, US, \n(601) 638-8186',
      col1: 'abc',
      col2: 'xyz',
    },
    {
      address:
        '2234 Sleepy Pony Mall , Drain, DC, \n20078-4243, US, \n(202) 948-3634',
      col1: 'abc',
      col2: 'xyz',
    },
  ],

  excelStyles: [
    {
      id: 'multiline',
      alignment: {
        wrapText: true,
      },
    },
  ],
};

function onBtExport() {
  gridOptions.api!.exportDataAsExcel();
}

// setup the grid after the page has finished loading
const gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

if (typeof window !== 'undefined') {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).onBtExport = onBtExport;
}
