import {
  ColDef,
  GridApi,
  GridReadyEvent,
  RowClassRules,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { Component } from '@angular/core';
// Required feature modules are registered in app.module.ts

@Component({
  selector: 'my-app',
  template: `<div class="example-wrapper">
    <div style="margin-bottom: 5px;">
      <button (click)="setDataValue()">rowNode.setDataValue</button>
      <button (click)="setData()">rowNode.setData</button>
      <button (click)="applyTransaction()">api.applyTransaction</button>
    </div>

    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [rowData]="rowData"
      [columnDefs]="columnDefs"
      [rowClassRules]="rowClassRules"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public rowData: any[] | null = getData();
  public columnDefs: ColDef[] = [
    { headerName: 'Employee', field: 'employee' },
    { headerName: 'Number Sick Days', field: 'sickDays', editable: true },
  ];
  public rowClassRules: RowClassRules = {
    // row style function
    'sick-days-warning': (params) => {
      var numSickDays = params.data.sickDays;
      return numSickDays > 5 && numSickDays <= 7;
    },
    // row style expression
    'sick-days-breach': 'data.sickDays >= 8',
  };

  setDataValue() {
    this.gridApi.forEachNode(function (rowNode) {
      rowNode.setDataValue('sickDays', randomInt());
    });
  }

  setData() {
    this.gridApi.forEachNode(function (rowNode) {
      var newData = {
        employee: rowNode.data.employee,
        sickDays: randomInt(),
      };
      rowNode.setData(newData);
    });
  }

  applyTransaction() {
    var itemsToUpdate: any[] = [];
    this.gridApi.forEachNode(function (rowNode) {
      var data = rowNode.data;
      data.sickDays = randomInt();
      itemsToUpdate.push(data);
    });
    this.gridApi.applyTransaction({ update: itemsToUpdate });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
}

function randomInt() {
  return Math.floor(Math.random() * 10);
}
