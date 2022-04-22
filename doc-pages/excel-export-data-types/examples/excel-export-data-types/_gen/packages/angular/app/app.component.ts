import { Component } from '@angular/core';
import { ColDef, ExcelStyle, GridApi, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

@Component({
  selector: 'my-app',
  template: `<div class="example-wrapper">
    <div class="example-header">
      <button (click)="onBtExport()" style="font-weight: bold;">
        Export to Excel
      </button>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [rowData]="rowData"
      [excelStyles]="excelStyles"
      [popupParent]="popupParent"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
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
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };
  public rowData: any[] | null = [
    {
      rawValue: 1,
      negativeValue: -10,
      dateValue: '2009-04-20T00:00:00.000',
    },
  ];
  public excelStyles: ExcelStyle[] = [
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
  ];
  public popupParent: HTMLElement = document.body;

  onBtExport() {
    this.gridApi.exportDataAsExcel();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
}
