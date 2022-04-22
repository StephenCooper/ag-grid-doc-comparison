import { ColDef, GridReadyEvent } from '@ag-grid-community/core';
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
    [ensureDomOrder]="true"
    [suppressColumnVirtualisation]="true"
    [suppressRowVirtualisation]="true"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: 'athlete', minWidth: 150 },
    { field: 'age', minWidth: 50, filter: 'agNumberColumnFilter' },
    { field: 'country', width: 120 },
    { field: 'year', width: 90 },
    { field: 'date', width: 110 },
    { field: 'sport', width: 110 },
    { field: 'gold', width: 110 },
    { field: 'silver', width: 110 },
    { field: 'bronze', width: 110 },
  ];
  public defaultColDef: ColDef = {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => params.api!.setRowData(data.slice(0, 600)));
  }
}
