import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  RowGroupingDisplayType,
  RowGroupOpenedEvent,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

@Component({
  selector: 'my-app',
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [rowData]="rowData"
    [animateRows]="false"
    [groupDisplayType]="groupDisplayType"
    [defaultColDef]="defaultColDef"
    (rowGroupOpened)="onRowGroupOpened($event)"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular> `,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: 'athlete', width: 150, rowGroupIndex: 0 },
    { field: 'age', width: 90, rowGroupIndex: 1 },
    { field: 'country', width: 120, rowGroupIndex: 2 },
    { field: 'year', width: 90 },
    { field: 'date', width: 110, rowGroupIndex: 2 },
  ];
  public groupDisplayType: RowGroupingDisplayType = 'groupRows';
  public defaultColDef: ColDef = {
    editable: true,
    sortable: true,
    resizable: true,
    filter: true,
    flex: 1,
    minWidth: 100,
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onRowGroupOpened(event: RowGroupOpenedEvent) {
    var rowNodeIndex = event.node.rowIndex!;
    // factor in child nodes so we can scroll to correct position
    var childCount = event.node.childrenAfterSort
      ? event.node.childrenAfterSort.length
      : 0;
    var newIndex = rowNodeIndex + childCount;
    this.gridApi.ensureIndexVisible(newIndex);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => (this.rowData = data));
  }
}
