import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, Grid, GridOptions, GridReadyEvent } from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ExcelExportModule } from '@ag-grid-enterprise/excel-export';
import { CsvExportModule } from '@ag-grid-community/csv-export';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, MenuModule, ExcelExportModule, CsvExportModule])

const columnDefs: ColDef[] = [
  { checkboxSelection: true, field: 'athlete', minWidth: 200 },
  { field: 'country', minWidth: 200 },
  { headerName: 'Group', valueGetter: 'data.country.charAt(0)' },
  { field: 'sport', minWidth: 150 },
  { field: 'gold', hide: true },
  { field: 'silver', hide: true },
  { field: 'bronze', hide: true },
  { field: 'total', hide: true },
]

const gridOptions: GridOptions = {
  defaultColDef: {
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 100,
    flex: 1,
  },
  suppressRowClickSelection: true,
  columnDefs: columnDefs,
  rowSelection: 'multiple',
  onGridReady: function (params: GridReadyEvent) {
    (document.getElementById('selectedOnly') as HTMLInputElement).checked = true
  },
}

function onBtExport() {
  gridOptions.api!.exportDataAsExcel({
    onlySelected: (document.querySelector('#selectedOnly') as HTMLInputElement).checked,
  })
}

// setup the grid after the page has finished loading
  const gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions)
  fetch('https://www.ag-grid.com/example-assets/small-olympic-winners.json')
    .then(response => response.json())
    .then(data =>
      gridOptions.api!.setRowData(data.filter((rec: any) => rec.country != null))
    )
 

if (typeof window !== 'undefined') {
// Attach external event handlers to window so they can be called from index.html
 (<any>window).onBtExport = onBtExport;
}