import {
  ColDef,
  FirstDataRenderedEvent,
  GridApi,
  GridReadyEvent,
  IFiltersToolPanel,
  ISetFilter,
  ISetFilterParams,
  SetFilterValuesFuncParams,
  SideBarDef,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { Component } from '@angular/core';
// Required feature modules are registered in app.module.ts

@Component({
  selector: 'my-app',
  template: `<div id="container">
    <div id="header">
      <button (click)="useList1()">
        Use <code>['Elephant', 'Lion', 'Monkey']</code>
      </button>
      <button (click)="useList2()">
        Use <code>['Elephant', 'Giraffe', 'Tiger']</code>
      </button>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [sideBar]="sideBar"
      [rowData]="rowData"
      (firstDataRendered)="onFirstDataRendered($event)"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    {
      colId: 'array',
      headerName: 'Values Array',
      field: 'animal',
      filter: 'agSetColumnFilter',
      filterParams: arrayFilterParams,
    },
    {
      colId: 'callback',
      headerName: 'Values Callback',
      field: 'animal',
      filter: 'agSetColumnFilter',
      filterParams: callbackFilterParams,
    },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    filter: true,
    resizable: true,
  };
  public sideBar: SideBarDef | string | string[] | boolean | null = 'filters';
  public rowData: any[] | null = getData();

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    ((params.api.getToolPanelInstance(
      'filters'
    ) as any) as IFiltersToolPanel).expandFilters();
  }

  useList1() {
    console.log('Updating values to ' + list1);
    valuesArray.length = 0;
    list1.forEach(function (value) {
      valuesArray.push(value);
    });
    var filter = this.gridApi.getFilterInstance('array') as ISetFilter;
    filter.refreshFilterValues();
    valuesCallbackList = list1;
  }

  useList2() {
    console.log('Updating values to ' + list2);
    valuesArray.length = 0;
    list2.forEach(function (value) {
      valuesArray.push(value);
    });
    var filter = this.gridApi.getFilterInstance('array') as ISetFilter;
    filter.refreshFilterValues();
    valuesCallbackList = list2;
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
}

var list1 = ['Elephant', 'Lion', 'Monkey'];
var list2 = ['Elephant', 'Giraffe', 'Tiger'];
var valuesArray = list1.slice();
var valuesCallbackList = list1;
function valuesCallback(params: SetFilterValuesFuncParams) {
  setTimeout(function () {
    params.success(valuesCallbackList);
  }, 1000);
}
var arrayFilterParams = {
  values: valuesArray,
};
var callbackFilterParams: Partial<ISetFilterParams> = {
  values: valuesCallback,
  refreshValuesOnOpen: true,
};
