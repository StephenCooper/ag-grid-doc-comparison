import {
  ColDef,
  GridReadyEvent,
  RowDragEndEvent,
  RowDragEnterEvent,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CustomCellRenderer } from './custom-cell-renderer.component';
// Required feature modules are registered in app.module.ts

@Component({
  selector: 'my-app',
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowDragManaged]="true"
    [animateRows]="true"
    [rowData]="rowData"
    (rowDragEnter)="onRowDragEnter($event)"
    (rowDragEnd)="onRowDragEnd($event)"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular> `,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    {
      field: 'athlete',
      cellClass: 'custom-athlete-cell',
      cellRenderer: CustomCellRenderer,
    },
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

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => (this.rowData = data));
  }
}
