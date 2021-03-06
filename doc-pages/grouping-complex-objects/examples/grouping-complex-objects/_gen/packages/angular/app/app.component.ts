import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  ColDef,
  GridReadyEvent,
  KeyCreatorParams,
  ValueGetterParams,
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
    [defaultColDef]="defaultColDef"
    [autoGroupColumnDef]="autoGroupColumnDef"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: 'athlete', minWidth: 200 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
    { field: 'age' },
    {
      field: 'country',
      rowGroup: true,
      hide: true,
      valueGetter: countryValueGetter,
      keyCreator: countryKeyCreator,
    },
    { field: 'year' },
    { field: 'date' },
    { field: 'sport', minWidth: 200 },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    resizable: true,
  };
  public autoGroupColumnDef: ColDef = {
    minWidth: 200,
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => (this.rowData = data));
  }
}

function countryKeyCreator(params: KeyCreatorParams) {
  var countryObject = params.value;
  return countryObject.name;
}
function countryValueGetter(params: ValueGetterParams) {
  // hack the data  - replace the country with an object of country name and code
  var countryName = params.data.country;
  var countryCode = countryName.substring(0, 2).toUpperCase();
  return {
    name: countryName,
    code: countryCode,
  };
}
