import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  ColDef,
  ExcelCell,
  ExcelExportParams,
  GridApi,
  GridReadyEvent,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

@Component({
  selector: 'my-app',
  template: `<div class="container">
    <div class="columns">
      <label class="option" for="prependContent"
        ><input type="checkbox" id="prependContent" />Prepend Content</label
      >
      <label class="option" for="appendContent"
        ><input type="checkbox" id="appendContent" /> Append Content</label
      >
    </div>
    <div>
      <button
        (click)="onBtExport()"
        style="margin: 5px 0px; font-weight: bold;"
      >
        Export to Excel
      </button>
    </div>
    <div class="grid-wrapper">
      <ag-grid-angular
        style="width: 100%; height: 100%;"
        class="ag-theme-alpine"
        [columnDefs]="columnDefs"
        [defaultColDef]="defaultColDef"
        [popupParent]="popupParent"
        [rowData]="rowData"
        (gridReady)="onGridReady($event)"
      ></ag-grid-angular>
    </div>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: 'athlete', minWidth: 200 },
    { field: 'country', minWidth: 200 },
    { field: 'sport', minWidth: 150 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ];
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 100,
    flex: 1,
  };
  public popupParent: HTMLElement = document.body;
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onBtExport() {
    this.gridApi.exportDataAsExcel(getParams());
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>(
        'https://www.ag-grid.com/example-assets/small-olympic-winners.json'
      )
      .subscribe((data) =>
        params.api!.setRowData(data.filter((rec: any) => rec.country != null))
      );
  }
}

const getRows: () => ExcelCell[][] = () => [
  [],
  [
    {
      data: { value: 'Here is a comma, and a some "quotes".', type: 'String' },
    },
  ],
  [
    {
      data: {
        value:
          'They are visible when the downloaded file is opened in Excel because custom content is properly escaped.',
        type: 'String',
      },
    },
  ],
  [
    { data: { value: 'this cell:', type: 'String' }, mergeAcross: 1 },
    {
      data: {
        value: 'is empty because the first cell has mergeAcross=1',
        type: 'String',
      },
    },
  ],
  [],
];
const getBoolean = (inputSelector: string) =>
  !!(document.querySelector(inputSelector) as HTMLInputElement).checked;
const getParams: () => ExcelExportParams = () => ({
  prependContent: getBoolean('#prependContent') ? getRows() : undefined,
  appendContent: getBoolean('#appendContent') ? getRows() : undefined,
});
