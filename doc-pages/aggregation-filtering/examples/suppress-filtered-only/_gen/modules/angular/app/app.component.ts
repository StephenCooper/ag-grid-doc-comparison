import { ColDef, GridReadyEvent } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
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
    [groupDefaultExpanded]="groupDefaultExpanded"
    [suppressAggFilteredOnly]="true"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: 'country', rowGroup: true, hide: true },
    { field: 'sport', rowGroup: true, hide: true },
    { field: 'athlete', hide: true },
    { field: 'year' },
    { field: 'total', aggFunc: 'sum', filter: 'agNumberColumnFilter' },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    filter: true,
    floatingFilter: true,
    resizable: true,
  };
  public autoGroupColumnDef: ColDef = {
    field: 'athlete',
  };
  public groupDefaultExpanded = -1;
  public rowData: any[] | null = getData();

  onGridReady(params: GridReadyEvent) {}
}
