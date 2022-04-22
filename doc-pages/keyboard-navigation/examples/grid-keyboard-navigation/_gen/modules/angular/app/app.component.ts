import {
  ColDef,
  ColGroupDef,
  GridReadyEvent,
  SideBarDef,
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
    [rowData]="rowData"
    [rowSelection]="rowSelection"
    [suppressRowClickSelection]="true"
    [defaultColDef]="defaultColDef"
    [sideBar]="sideBar"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public columnDefs: (ColDef | ColGroupDef)[] = [
    {
      headerName: ' ',
      headerCheckboxSelection: true,
      checkboxSelection: true,
      floatingFilter: false,
      suppressMenu: true,
      minWidth: 55,
      maxWidth: 55,
      width: 55,
      flex: 0,
      resizable: false,
      sortable: false,
      editable: false,
      filter: false,
      suppressColumnsToolPanel: true,
    },
    {
      headerName: 'Participant',
      children: [
        { field: 'athlete', minWidth: 170 },
        { field: 'country', minWidth: 150 },
      ],
    },
    { field: 'sport' },
    {
      headerName: 'Medals',
      children: [
        {
          field: 'total',
          columnGroupShow: 'closed',
          filter: 'agNumberColumnFilter',
          width: 120,
          flex: 0,
        },
        {
          field: 'gold',
          columnGroupShow: 'open',
          filter: 'agNumberColumnFilter',
          width: 100,
          flex: 0,
        },
        {
          field: 'silver',
          columnGroupShow: 'open',
          filter: 'agNumberColumnFilter',
          width: 100,
          flex: 0,
        },
        {
          field: 'bronze',
          columnGroupShow: 'open',
          filter: 'agNumberColumnFilter',
          width: 100,
          flex: 0,
        },
      ],
    },
    { field: 'year', filter: 'agNumberColumnFilter' },
  ];
  public rowSelection = 'multiple';
  public defaultColDef: ColDef = {
    editable: true,
    sortable: true,
    minWidth: 100,
    filter: true,
    resizable: true,
    floatingFilter: true,
    flex: 1,
  };
  public sideBar: SideBarDef | string | string[] | boolean | null = {
    toolPanels: ['columns', 'filters'],
    defaultToolPanel: '',
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => (this.rowData = data));
  }
}
