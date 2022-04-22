import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  ColDef,
  GridReadyEvent,
  RowDragEndEvent,
  RowDragEnterEvent,
  RowDragLeaveEvent,
  RowDragMoveEvent,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

@Component({
  selector: 'my-app',
  template: `<div class="example-wrapper">
    <div class="example-header" style="background: #ffdddd;">
      Rows in this example do not move, only events are fired
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [animateRows]="true"
      [rowData]="rowData"
      (rowDragEnter)="onRowDragEnter($event)"
      (rowDragEnd)="onRowDragEnd($event)"
      (rowDragMove)="onRowDragMove($event)"
      (rowDragLeave)="onRowDragLeave($event)"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div> `,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: 'athlete', rowDrag: true },
    { field: 'country' },
    { field: 'year', width: 100 },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
  ];
  public defaultColDef: ColDef = {
    width: 170,
    sortable: true,
    filter: true,
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onRowDragEnter(e: RowDragEnterEvent) {
    console.log('onRowDragEnter', e);
  }

  onRowDragEnd(e: RowDragEndEvent) {
    console.log('onRowDragEnd', e);
  }

  onRowDragMove(e: RowDragMoveEvent) {
    console.log('onRowDragMove', e);
  }

  onRowDragLeave(e: RowDragLeaveEvent) {
    console.log('onRowDragLeave', e);
  }

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => (this.rowData = data));
  }
}
