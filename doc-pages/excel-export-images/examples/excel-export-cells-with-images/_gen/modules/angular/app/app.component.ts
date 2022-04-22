import {
  ColDef,
  ExcelExportParams,
  GridApi,
  GridReadyEvent,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { Component } from '@angular/core';
import { CountryCellRenderer } from './country-cell-renderer.component';
// Required feature modules are registered in app.module.ts
declare function createBase64FlagsFromResponse(
  response: any,
  countryCodes: any,
  base64flags: any
): any;

@Component({
  selector: 'my-app',
  template: `<div class="container">
    <div>
      <button class="export" (click)="onBtExport()">Export to Excel</button>
    </div>
    <div class="grid-wrapper">
      <ag-grid-angular
        style="width: 100%; height: 100%;"
        class="ag-theme-alpine"
        [columnDefs]="columnDefs"
        [defaultColDef]="defaultColDef"
        [defaultExcelExportParams]="defaultExcelExportParams"
        [context]="context"
        [rowData]="rowData"
        (gridReady)="onGridReady($event)"
      ></ag-grid-angular>
    </div>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    {
      field: 'country',
      headerName: ' ',
      minWidth: 70,
      width: 70,
      maxWidth: 70,
      cellRenderer: CountryCellRenderer,
      cellRendererParams: {
        base64flags: base64flags,
        countryCodes: countryCodes,
      },
    },
    { field: 'athlete' },
    { field: 'age' },
    { field: 'year' },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ];
  public defaultColDef: ColDef = {
    width: 150,
    resizable: true,
  };
  public defaultExcelExportParams: ExcelExportParams = {
    addImageToCell: function (rowIndex, col, value) {
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
            offsetX: 30,
            offsetY: 5.5,
          },
        },
      };
    },
  };
  public context: any = {
    base64flags: base64flags,
    countryCodes: countryCodes,
  };
  public rowData!: any[];

  onBtExport() {
    this.gridApi.exportDataAsExcel();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    fetch('https://www.ag-grid.com/example-assets/small-olympic-winners.json')
      .then((data) =>
        createBase64FlagsFromResponse(data, countryCodes, base64flags)
      )
      .then((data) => params.api.setRowData(data));
  }
}

const countryCodes: any = {};
const base64flags: any = {};
