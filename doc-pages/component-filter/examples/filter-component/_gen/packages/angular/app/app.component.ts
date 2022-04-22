import { Component } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { PartialMatchFilter } from './partial-match-filter.component';

@Component({
  selector: 'my-app',
  template: `<div class="example-wrapper">
    <button
      style="margin-bottom: 5px"
      (click)="onClicked()"
      class="btn btn-primary"
    >
      Invoke Filter Instance Method
    </button>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div> `,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: 'row' },
    {
      field: 'name',
      filter: PartialMatchFilter,
      menuTabs: ['filterMenuTab'],
    },
  ];
  public defaultColDef: ColDef = {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  };
  public rowData: any[] | null = getData();

  onClicked() {
    this.gridApi.getFilterInstance('name', function (instance) {
      (instance as PartialMatchFilter).componentMethod('Hello World!');
    });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    params.api.sizeColumnsToFit();
  }
}
