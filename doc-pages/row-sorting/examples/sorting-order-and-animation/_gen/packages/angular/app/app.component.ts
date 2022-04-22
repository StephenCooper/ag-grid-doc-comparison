import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
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
    [animateRows]="true"
    [sortingOrder]="sortingOrder"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: 'athlete', sortingOrder: ['asc', 'desc'] },
    { field: 'age', width: 90, sortingOrder: ['desc', 'asc'] },
    { field: 'country', sortingOrder: ['desc', null] },
    { field: 'year', width: 90, sortingOrder: ['asc'] },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ];
  public defaultColDef: ColDef = {
    width: 170,
    sortable: true,
  };
  public sortingOrder: ('asc' | 'desc' | null)[] = ['desc', 'asc', null];
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => (this.rowData = data));
  }
}
