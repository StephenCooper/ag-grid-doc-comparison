import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { Grid, GridOptions, ModuleRegistry } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { CsvExportModule } from '@ag-grid-community/csv-export';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';
import { MenuModule } from '@ag-grid-enterprise/menu';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  CsvExportModule,
  ExcelExportModule,
  MenuModule,
]);

const gridOptions: GridOptions = {
  columnDefs: [
    { headerName: 'provided', field: 'rawValue' },
    { headerName: 'number', field: 'rawValue', cellClass: 'numberType' },
    { headerName: 'currency', field: 'rawValue', cellClass: 'currencyFormat' },
    { headerName: 'boolean', field: 'rawValue', cellClass: 'booleanType' },
    {
      headerName: 'Negative',
      field: 'negativeValue',
      cellClass: 'negativeInBrackets',
    },
    { headerName: 'string', field: 'rawValue', cellClass: 'stringType' },
    {
      headerName: 'Date',
      field: 'dateValue',
      cellClass: 'dateType',
      minWidth: 220,
    },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 100,
    resizable: true,
  },
  rowData: [
    {
      rawValue: 1,
      negativeValue: -10,
      dateValue: '2009-04-20T00:00:00.000',
    },
  ],
  excelStyles: [
    {
      id: 'numberType',
      numberFormat: {
        format: '0',
      },
    },
    {
      id: 'currencyFormat',
      numberFormat: {
        format: '#,##0.00 €',
      },
    },
    {
      id: 'negativeInBrackets',
      numberFormat: {
        format: '$[blue] #,##0;$ [red](#,##0)',
      },
    },
    {
      id: 'booleanType',
      dataType: 'Boolean',
    },
    {
      id: 'stringType',
      dataType: 'String',
    },
    {
      id: 'dateType',
      dataType: 'DateTime',
    },
  ],
  popupParent: document.body,
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
