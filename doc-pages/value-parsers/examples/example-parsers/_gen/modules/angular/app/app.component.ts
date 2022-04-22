import {
  CellValueChangedEvent,
  ColDef,
  GridReadyEvent,
  ValueParserParams,
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
    { headerName: 'Name', field: 'simple' },
    { headerName: 'Bad Number', field: 'numberBad' },
    {
      headerName: 'Good Number',
      field: 'numberGood',
      valueParser: numberParser,
    },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    editable: true,
    resizable: true,
  };
  public rowData: any[] | null = getData();

  onCellValueChanged(event: CellValueChangedEvent) {
    console.log('data after changes is: ', event.data);
  }

  onGridReady(params: GridReadyEvent) {
    params.api.sizeColumnsToFit();
  }
}

function numberParser(params: ValueParserParams) {
  return Number(params.newValue);
}
