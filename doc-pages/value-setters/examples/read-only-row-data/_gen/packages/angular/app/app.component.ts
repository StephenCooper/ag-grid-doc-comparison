import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  CellEditRequestEvent,
  ColDef,
  GetRowIdFunc,
  GetRowIdParams,
  GridApi,
  GridReadyEvent,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

@Component({
  selector: 'my-app',
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [getRowId]="getRowId"
    [readOnlyEdit]="true"
    [rowData]="rowData"
    (cellEditRequest)="onCellEditRequest($event)"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular> `,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: 'athlete', minWidth: 160 },
    { field: 'age' },
    { field: 'country', minWidth: 140 },
    { field: 'year' },
    { field: 'date', minWidth: 140 },
    { field: 'sport', minWidth: 160 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    editable: true,
  };
  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => params.data.id;
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onCellEditRequest(event: CellEditRequestEvent) {
    const data = event.data;
    const field = event.colDef.field;
    const newValue = event.newValue;
    const newItem = { ...data };
    newItem[field!] = event.newValue;
    console.log('onCellEditRequest, updating ' + field + ' to ' + newValue);
    rowImmutableStore = rowImmutableStore.map((oldItem) =>
      oldItem.id == newItem.id ? newItem : oldItem
    );
    this.gridApi.setRowData(rowImmutableStore);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => {
        data.forEach((item, index) => (item.id = index));
        rowImmutableStore = data;
        params.api!.setRowData(rowImmutableStore);
      });
  }
}

let rowImmutableStore: any[];
