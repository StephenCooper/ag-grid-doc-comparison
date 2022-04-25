import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  RowClassParams,
  RowStyle,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { CustomPinnedRowRenderer } from './custom-pinned-row-renderer.component';

@Component({
  selector: 'my-app',
  template: `<div class="example-wrapper">
    <div class="example-header">
      <span> Rows to Pin on Top: </span>
      <select
        (change)="onPinnedRowTopCount()"
        id="top-row-count"
        style="margin-left: 10px; margin-right: 20px;"
      >
        <option value="0">0</option>
        <option value="1" selected="">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <span> Rows to Pin on Bottom: </span>
      <select
        (change)="onPinnedRowBottomCount()"
        id="bottom-row-count"
        style="margin-left: 10px;"
      >
        <option value="0">0</option>
        <option value="1" selected="">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [rowData]="rowData"
      [getRowStyle]="getRowStyle"
      [pinnedTopRowData]="pinnedTopRowData"
      [pinnedBottomRowData]="pinnedBottomRowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div> `,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    {
      field: 'athlete',
      cellRendererSelector: (params) => {
        if (params.node.rowPinned) {
          return {
            component: CustomPinnedRowRenderer,
            params: {
              style: { color: 'blue' },
            },
          };
        } else {
          // rows that are not pinned don't use any cell renderer
          return undefined;
        }
      },
    },
    {
      field: 'age',
      cellRendererSelector: (params) => {
        if (params.node.rowPinned) {
          return {
            component: CustomPinnedRowRenderer,
            params: {
              style: { 'font-style': 'italic' },
            },
          };
        } else {
          // rows that are not pinned don't use any cell renderer
          return undefined;
        }
      },
    },
    { field: 'country' },
    { field: 'year' },
    { field: 'date' },
    { field: 'sport' },
  ];
  public defaultColDef: ColDef = {
    width: 200,
    sortable: true,
    filter: true,
    resizable: true,
  };
  public getRowStyle: (params: RowClassParams) => RowStyle | undefined = (
    params: RowClassParams
  ): RowStyle | undefined => {
    if (params.node.rowPinned) {
      return { 'font-weight': 'bold' };
    }
  };
  public pinnedTopRowData: any[] = createData(1, 'Top');
  public pinnedBottomRowData: any[] = createData(1, 'Bottom');
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onPinnedRowTopCount() {
    var headerRowsToFloat = (document.getElementById('top-row-count') as any)
      .value;
    var count = Number(headerRowsToFloat);
    var rows = createData(count, 'Top');
    this.gridApi.setPinnedTopRowData(rows);
  }

  onPinnedRowBottomCount() {
    var footerRowsToFloat = (document.getElementById('bottom-row-count') as any)
      .value;
    var count = Number(footerRowsToFloat);
    var rows = createData(count, 'Bottom');
    this.gridApi.setPinnedBottomRowData(rows);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => (this.rowData = data));
  }
}

function createData(count: number, prefix: string) {
  var result = [];
  for (var i = 0; i < count; i++) {
    result.push({
      athlete: prefix + ' Athlete ' + i,
      age: prefix + ' Age ' + i,
      country: prefix + ' Country ' + i,
      year: prefix + ' Year ' + i,
      date: prefix + ' Date ' + i,
      sport: prefix + ' Sport ' + i,
    });
  }
  return result;
}
