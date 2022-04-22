import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { NumberFloatingFilterComponent } from './number-floating-filter-component.component';

@Component({
  selector: 'my-app',
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular> `,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: 'athlete', filter: false },
    {
      field: 'gold',
      filter: 'agNumberColumnFilter',
      suppressMenu: true,
      floatingFilterComponent: NumberFloatingFilterComponent,
      floatingFilterComponentParams: {
        suppressFilterButton: true,
        color: 'red',
      },
    },
    {
      field: 'silver',
      filter: 'agNumberColumnFilter',
      suppressMenu: true,
      floatingFilterComponent: NumberFloatingFilterComponent,
      floatingFilterComponentParams: {
        suppressFilterButton: true,
        color: 'blue',
      },
    },
    {
      field: 'bronze',
      filter: 'agNumberColumnFilter',
      suppressMenu: true,
      floatingFilterComponent: NumberFloatingFilterComponent,
      floatingFilterComponentParams: {
        suppressFilterButton: true,
        color: 'green',
      },
    },
    {
      field: 'total',
      filter: 'agNumberColumnFilter',
      suppressMenu: true,
      floatingFilterComponent: NumberFloatingFilterComponent,
      floatingFilterComponentParams: {
        suppressFilterButton: true,
        color: 'orange',
      },
    },
  ];
  public defaultColDef: ColDef = {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    floatingFilter: true,
    resizable: true,
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => {
        this.rowData = data;
      });
  }
}
