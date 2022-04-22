import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ColDef, ColGroupDef, GridReadyEvent } from 'ag-grid-community';
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
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public columnDefs: (ColDef | ColGroupDef)[] = [
    {
      headerName: 'Athlete Details',
      marryChildren: true,
      children: [
        { field: 'athlete', colId: 'athlete' },
        { field: 'country', colId: 'country' },
      ],
    },
    { field: 'age', colId: 'age' },
    {
      headerName: 'Sports Results',
      marryChildren: true,
      children: [
        { field: 'sport', colId: 'sport' },
        { field: 'total', colId: 'total' },
        { field: 'gold', colId: 'gold' },
        { field: 'silver', colId: 'silver' },
        { field: 'bronze', colId: 'bronze' },
      ],
    },
  ];
  public defaultColDef: ColDef = {
    resizable: true,
    width: 160,
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => (this.rowData = data));
  }
}
