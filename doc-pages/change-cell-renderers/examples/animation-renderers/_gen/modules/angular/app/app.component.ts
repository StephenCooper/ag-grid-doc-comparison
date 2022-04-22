import {
  ColDef,
  GridApi,
  GridReadyEvent,
  ValueParserParams,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { Component } from '@angular/core';
// Required feature modules are registered in app.module.ts

@Component({
  selector: 'my-app',
  template: `<div class="example-wrapper">
    <div style="margin-bottom: 5px;">
      <button (click)="onUpdateSomeValues()">
        Update Some D &amp; E Values
      </button>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    {
      headerName: 'Editable A',
      field: 'a',
      editable: true,
      valueParser: numberValueParser,
    },
    {
      headerName: 'Editable B',
      field: 'b',
      editable: true,
      valueParser: numberValueParser,
    },
    {
      headerName: 'Editable C',
      field: 'c',
      editable: true,
      valueParser: numberValueParser,
    },
    {
      headerName: 'API D',
      field: 'd',
      minWidth: 140,
      valueParser: numberValueParser,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
      headerName: 'API E',
      field: 'e',
      minWidth: 140,
      valueParser: numberValueParser,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
      headerName: 'Total',
      minWidth: 140,
      valueGetter: 'data.a + data.b + data.c + data.d + data.e',
      cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
      headerName: 'Average',
      minWidth: 140,
      valueGetter: '(data.a + data.b + data.c + data.d + data.e) / 5',
      cellRenderer: 'agAnimateSlideCellRenderer',
    },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 120,
    resizable: true,
    cellClass: 'align-right',
    valueFormatter: function (params) {
      return formatNumber(params.value);
    },
  };
  public rowData: any[] | null = createRowData();

  onUpdateSomeValues() {
    const rowCount = this.gridApi.getDisplayedRowCount();
    for (let i = 0; i < 10; i++) {
      const row = Math.floor(Math.random() * rowCount);
      const rowNode = this.gridApi.getDisplayedRowAtIndex(row)!;
      rowNode.setDataValue('d', Math.floor(Math.random() * 10000));
      rowNode.setDataValue('e', Math.floor(Math.random() * 10000));
    }
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
}

function numberValueParser(params: ValueParserParams) {
  return Number(params.newValue);
}
function formatNumber(number: number) {
  // this puts commas into the number eg 1000 goes to 1,000,
  // i pulled this from stack overflow, i have no idea how it works
  return Math.floor(number)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
function createRowData() {
  const rowData = [];
  for (let i = 0; i < 20; i++) {
    rowData.push({
      a: Math.floor(((i + 323) * 25435) % 10000),
      b: Math.floor(((i + 323) * 23221) % 10000),
      c: Math.floor(((i + 323) * 468276) % 10000),
      d: 0,
      e: 0,
    });
  }
  return rowData;
}
