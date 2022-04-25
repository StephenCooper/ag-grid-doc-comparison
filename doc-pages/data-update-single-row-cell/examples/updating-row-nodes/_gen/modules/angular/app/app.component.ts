import {
  ColDef,
  GetRowIdFunc,
  GetRowIdParams,
  GridApi,
  GridReadyEvent,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { Component } from '@angular/core';
// Required feature modules are registered in app.module.ts

@Component({
  selector: 'my-app',
  template: `<div class="example-wrapper">
    <div style="margin-bottom: 1rem;">
      <button (click)="setPriceOnToyota()">Set Price on Toyota</button>
      <button (click)="setDataOnFord()">Set Data on Ford</button>
      <button (click)="updateSort()" style="margin-left: 15px">Sort</button>
      <button (click)="updateFilter()">Filter</button>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [rowData]="rowData"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [animateRows]="true"
      [getRowId]="getRowId"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div> `,
})
export class AppComponent {
  private gridApi!: GridApi;

  public rowData: any[] | null = [
    { id: 'aa', make: 'Toyota', model: 'Celica', price: 35000 },
    { id: 'bb', make: 'Ford', model: 'Mondeo', price: 32000 },
    { id: 'cc', make: 'Porsche', model: 'Boxster', price: 72000 },
    { id: 'dd', make: 'BMW', model: '5 Series', price: 59000 },
    { id: 'ee', make: 'Dodge', model: 'Challanger', price: 35000 },
    { id: 'ff', make: 'Mazda', model: 'MX5', price: 28000 },
    { id: 'gg', make: 'Horse', model: 'Outside', price: 99000 },
  ];
  public columnDefs: ColDef[] = [
    { field: 'make' },
    { field: 'model' },
    { field: 'price', filter: 'agNumberColumnFilter' },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    editable: true,
    sortable: true,
    filter: true,
  };
  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => {
    return params.data.id;
  };

  updateSort() {
    this.gridApi.refreshClientSideRowModel('sort');
  }

  updateFilter() {
    this.gridApi.refreshClientSideRowModel('filter');
  }

  setPriceOnToyota() {
    var rowNode = this.gridApi.getRowNode('aa')!;
    var newPrice = Math.floor(Math.random() * 100000);
    rowNode.setDataValue('price', newPrice);
  }

  setDataOnFord() {
    var rowNode = this.gridApi.getRowNode('bb')!;
    var newPrice = Math.floor(Math.random() * 100000);
    var newModel = 'T-' + Math.floor(Math.random() * 1000);
    var newData = {
      id: 'bb',
      make: 'Ford',
      model: newModel,
      price: newPrice,
    };
    rowNode.setData(newData);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
}
