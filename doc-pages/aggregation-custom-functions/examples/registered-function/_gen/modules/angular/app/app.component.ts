import {
  ColDef,
  GridReadyEvent,
  IAggFunc,
  IAggFuncParams,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
// Required feature modules are registered in app.module.ts

@Component({
  selector: 'my-app',
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [autoGroupColumnDef]="autoGroupColumnDef"
    [aggFuncs]="aggFuncs"
    [sideBar]="true"
    [animateRows]="true"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: 'country', rowGroup: true, hide: true },
    { field: 'year', rowGroup: true, hide: true },
    { field: 'total', aggFunc: 'mySum' },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    sortable: true,
    resizable: true,
  };
  public autoGroupColumnDef: ColDef = {
    minWidth: 200,
  };
  public aggFuncs: {
    [key: string]: IAggFunc;
  } = {
    mySum: (params: IAggFuncParams) => {
      let sum = 0;
      params.values.forEach((value: number) => (sum += value));
      return sum;
    },
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => (this.rowData = data));
  }
}
