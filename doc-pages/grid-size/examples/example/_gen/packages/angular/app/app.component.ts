import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  ColDef,
  FirstDataRenderedEvent,
  GridReadyEvent,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

@Component({
  selector: 'my-app',
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    (firstDataRendered)="onFirstDataRendered($event)"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular> `,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: 'athlete', minWidth: 150 },
    { field: 'age', minWidth: 70, maxWidth: 90 },
    { field: 'country', minWidth: 130 },
    { field: 'year', minWidth: 70, maxWidth: 90 },
    { field: 'date', minWidth: 120 },
    { field: 'sport', minWidth: 120 },
    { field: 'gold', minWidth: 80 },
    { field: 'silver', minWidth: 80 },
    { field: 'bronze', minWidth: 80 },
    { field: 'total', minWidth: 80 },
  ];
  public defaultColDef: ColDef = {
    resizable: true,
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
  }

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => (this.rowData = data));
  }
}
