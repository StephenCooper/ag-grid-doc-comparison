import {
  ColDef,
  ColGroupDef,
  GridApi,
  GridReadyEvent,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
// Required feature modules are registered in app.module.ts

@Component({
  selector: 'my-app',
  template: `<div class="test-container">
    <div class="test-header">
      <button (click)="onBtSetA()">First Column Set</button>
      <button (click)="onBtSetB()">Second Column Set</button>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [defaultColDef]="defaultColDef"
      [columnDefs]="columnDefs"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public defaultColDef: ColDef = {
    initialWidth: 100,
    sortable: true,
    resizable: true,
  };
  public columnDefs: (ColDef | ColGroupDef)[] = [
    {
      headerName: 'Group A',
      groupId: 'groupA',
      children: [
        { field: 'athlete' },
        { field: 'age' },
        { field: 'country', columnGroupShow: 'open' },
      ],
    },
    {
      headerName: 'Group B',
      children: [
        { field: 'sport' },
        { field: 'year' },
        { field: 'date', columnGroupShow: 'open' },
      ],
    },
    {
      headerName: 'Group C',
      groupId: 'groupC',
      children: [
        { field: 'total' },
        { field: 'gold', columnGroupShow: 'open' },
        { field: 'silver', columnGroupShow: 'open' },
        { field: 'bronze', columnGroupShow: 'open' },
      ],
    },
  ];
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onBtSetA() {
    this.gridApi.setColumnDefs(createColSetA());
  }

  onBtSetB() {
    this.gridApi.setColumnDefs(createColSetB());
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => {
        this.rowData = data;
      });
  }
}

function createColSetA(): ColGroupDef[] {
  return [
    {
      headerName: 'Group A',
      groupId: 'groupA',
      children: [
        { field: 'athlete' },
        { field: 'age' },
        { field: 'country', columnGroupShow: 'open' },
      ],
    },
    {
      headerName: 'Group B',
      children: [
        { field: 'sport' },
        { field: 'year' },
        { field: 'date', columnGroupShow: 'open' },
      ],
    },
    {
      headerName: 'Group C',
      groupId: 'groupC',
      children: [
        { field: 'total' },
        { field: 'gold', columnGroupShow: 'open' },
        { field: 'silver', columnGroupShow: 'open' },
        { field: 'bronze', columnGroupShow: 'open' },
      ],
    },
  ];
}
function createColSetB(): ColGroupDef[] {
  return [
    {
      headerName: 'GROUP A',
      groupId: 'groupA',
      children: [
        { field: 'athlete' },
        { field: 'age' },
        { field: 'country', columnGroupShow: 'open' },
      ],
    },
    {
      headerName: 'Group B',
      children: [
        { field: 'sport' },
        { field: 'year' },
        { field: 'date', columnGroupShow: 'open' },
      ],
    },
    {
      headerName: 'Group C',
      groupId: 'groupC',
      children: [
        { field: 'total' },
        { field: 'gold', columnGroupShow: 'open' },
        { field: 'silver', columnGroupShow: 'open' },
        { field: 'bronze', columnGroupShow: 'open' },
        { field: 'extraA' },
        { field: 'extraB', columnGroupShow: 'open' },
      ],
    },
  ];
}
