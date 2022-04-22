import { ColDef, GridReadyEvent, SideBarDef } from '@ag-grid-community/core';
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
    [pivotMode]="true"
    [sideBar]="sideBar"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular> `,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: 'country', rowGroup: true, filter: true },
    { field: 'year', pivot: true, filter: true },
    { field: 'sport', filter: true },
    { field: 'gold', aggFunc: 'sum' },
    { field: 'silver', aggFunc: 'sum' },
    { field: 'bronze', aggFunc: 'sum' },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    floatingFilter: true,
    sortable: true,
    resizable: true,
  };
  public sideBar: SideBarDef | string | string[] | boolean | null = 'filters';
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>(
        'https://www.ag-grid.com/example-assets/small-olympic-winners.json'
      )
      .subscribe((data) => (this.rowData = data));
  }
}
