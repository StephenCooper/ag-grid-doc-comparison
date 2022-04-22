import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ColDef, ColGroupDef, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

@Component({
  selector: 'my-app',
  template: ` <ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [autoGroupColumnDef]="autoGroupColumnDef"
    [pivotMode]="true"
    [suppressAggFuncInHeader]="true"
    [processSecondaryColDef]="processSecondaryColDef"
    [processSecondaryColGroupDef]="processSecondaryColGroupDef"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: 'country', rowGroup: true, enableRowGroup: true },
    {
      field: 'year',
      pivot: true,
      enablePivot: true,
      pivotComparator: MyYearPivotComparator,
    },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold', aggFunc: 'sum' },
    { field: 'silver', aggFunc: 'sum' },
    { field: 'bronze', aggFunc: 'sum' },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    filter: true,
    resizable: true,
  };
  public autoGroupColumnDef: ColDef = {
    minWidth: 250,
  };
  public processSecondaryColDef: (colDef: ColDef) => void = function (
    colDef: ColDef
  ) {
    if (colDef.pivotValueColumn?.getId() === 'gold') {
      colDef.headerName = colDef.headerName?.toUpperCase();
    }
  };
  public processSecondaryColGroupDef: (
    colGroupDef: ColGroupDef
  ) => void = function (colGroupDef: ColGroupDef) {
    // for fun, add a css class for 2010
    if (colGroupDef.pivotKeys?.length && colGroupDef.pivotKeys[0] === '2010') {
      colGroupDef.headerClass = 'color-background';
    }
    // put 'year' in front of each group
    colGroupDef.headerName = 'Year ' + colGroupDef.headerName;
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => (this.rowData = data));
  }
}

function MyYearPivotComparator(a: string, b: string) {
  var requiredOrder = ['2012', '2010', '2008', '2006', '2004', '2002', '2000'];
  return requiredOrder.indexOf(a) - requiredOrder.indexOf(b);
}
