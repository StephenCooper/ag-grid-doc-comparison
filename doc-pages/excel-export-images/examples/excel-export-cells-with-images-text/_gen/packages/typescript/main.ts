import { ColDef, Grid, GridOptions } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { CountryCellRenderer } from './countryCellRenderer';

declare function createBase64FlagsFromResponse(
  response: any,
  countryCodes: any,
  base64flags: any
): any;

const countryCodes: any = {};
const base64flags: any = {};

const columnDefs: ColDef[] = [
  { field: 'athlete', width: 200 },
  {
    field: 'country',
    cellClass: 'countryCell',
    cellRenderer: CountryCellRenderer,
  },
  { field: 'age' },
  { field: 'year' },
  { field: 'date' },
  { field: 'sport' },
  { field: 'gold' },
  { field: 'silver' },
  { field: 'bronze' },
  { field: 'total' },
];

const gridOptions: GridOptions = {
  columnDefs: columnDefs,
  defaultColDef: {
    width: 150,
    resizable: true,
  },
  excelStyles: [
    {
      id: 'countryCell',
      alignment: {
        vertical: 'Center',
        indent: 4,
      },
    },
  ],
  defaultExcelExportParams: {
    addImageToCell: (rowIndex, col, value) => {
      if (col.getColId() !== 'country') {
        return;
      }

      const countryCode = countryCodes[value];
      return {
        image: {
          id: countryCode,
          base64: base64flags[countryCode],
          imageType: 'png',
          width: 20,
          height: 11,
          position: {
            offsetX: 10,
            offsetY: 5.5,
          },
        },
        value,
      };
    },
  },
  context: {
    base64flags: base64flags,
    countryCodes: countryCodes,
  },
  onGridReady: (params) => {
    fetch('https://www.ag-grid.com/example-assets/small-olympic-winners.json')
      .then((data) =>
        createBase64FlagsFromResponse(data, countryCodes, base64flags)
      )
      .then((data) => params.api.setRowData(data));
  },
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
