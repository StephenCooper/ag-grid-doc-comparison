import {
  CellValueChangedEvent,
  ColDef,
  GridReadyEvent,
  ValueGetterParams,
  ValueSetterParams,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css';
import { Component } from '@angular/core';
// Required feature modules are registered in app.module.ts

@Component({
  selector: 'my-app',
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine-dark"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    (cellValueChanged)="onCellValueChanged($event)"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    {
      headerName: 'Name',
      valueGetter: (params: ValueGetterParams) => {
        return params.data.firstName + ' ' + params.data.lastName;
      },
      valueSetter: (params: ValueSetterParams) => {
        var fullName = params.newValue;
        var nameSplit = fullName.split(' ');
        var newFirstName = nameSplit[0];
        var newLastName = nameSplit[1];
        var data = params.data;
        if (data.firstName !== newFirstName || data.lastName !== newLastName) {
          data.firstName = newFirstName;
          data.lastName = newLastName;
          // return true to tell grid that the value has changed, so it knows
          // to update the cell
          return true;
        } else {
          // return false, the grid doesn't need to update
          return false;
        }
      },
    },
    {
      headerName: 'A',
      field: 'a',
    },
    {
      headerName: 'B',
      valueGetter: (params: ValueGetterParams) => {
        return params.data.b;
      },
      valueSetter: (params: ValueSetterParams) => {
        var newValInt = parseInt(params.newValue);
        var valueChanged = params.data.b !== newValInt;
        if (valueChanged) {
          params.data.b = newValInt;
        }
        return valueChanged;
      },
    },
    {
      headerName: 'C.X',
      valueGetter: (params: ValueGetterParams) => {
        if (params.data.c) {
          return params.data.c.x;
        } else {
          return undefined;
        }
      },
      valueSetter: (params: ValueSetterParams) => {
        if (!params.data.c) {
          params.data.c = {};
        }
        params.data.c.x = params.newValue;
        return true;
      },
    },
    {
      headerName: 'C.Y',
      valueGetter: (params: ValueGetterParams) => {
        if (params.data.c) {
          return params.data.c.y;
        } else {
          return undefined;
        }
      },
      valueSetter: (params: ValueSetterParams) => {
        if (!params.data.c) {
          params.data.c = {};
        }
        params.data.c.y = params.newValue;
        return true;
      },
    },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    resizable: true,
    editable: true,
  };
  public rowData: any[] | null = getData();

  onCellValueChanged(event: CellValueChangedEvent) {
    console.log('Data after change is', event.data);
  }

  onGridReady(params: GridReadyEvent) {}
}
