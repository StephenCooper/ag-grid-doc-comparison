import {
  ColDef,
  FirstDataRenderedEvent,
  GridApi,
  GridReadyEvent,
  IFiltersToolPanel,
  SideBarDef,
  ValueFormatterParams,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
// Required feature modules are registered in app.module.ts

@Component({
  selector: 'my-app',
  template: `<div style="display: flex; flex-direction: column; height: 100%;">
    <div style="padding-bottom: 5px;">
      <button (click)="printFilterModel()">Print Filter Model</button>
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
      headerName: 'No Value Formatter',
      field: 'country',
      valueFormatter: countryValueFormatter,
      filter: 'agSetColumnFilter',
      filterParams: {
        // no value formatter!
      },
    },
    {
      headerName: 'With Value Formatter',
      field: 'country',
      valueFormatter: countryValueFormatter,
      filter: 'agSetColumnFilter',
      filterParams: {
        valueFormatter: countryValueFormatter,
      },
    },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 225,
    resizable: true,
    floatingFilter: true,
  };
  public sideBar: SideBarDef | string | string[] | boolean | null = 'filters';
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    ((params.api.getToolPanelInstance(
      'filters'
    ) as any) as IFiltersToolPanel).expandFilters();
  }

  printFilterModel() {
    var filterModel = this.gridApi.getFilterModel();
    console.log(filterModel);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => {
        // only return data that has corresponding country codes
        var dataWithFlags = data.filter(function (d: any) {
          return COUNTRY_CODES[d.country];
        });
        params.api!.setRowData(dataWithFlags);
      });
  }
}

function countryValueFormatter(params: ValueFormatterParams) {
  var value = params.value;
  return value + ' (' + COUNTRY_CODES[value].toUpperCase() + ')';
}
var COUNTRY_CODES: Record<string, string> = {
  Ireland: 'ie',
  Luxembourg: 'lu',
  Belgium: 'be',
  Spain: 'es',
  France: 'fr',
  Germany: 'de',
  Sweden: 'se',
  Italy: 'it',
  Greece: 'gr',
  Iceland: 'is',
  Portugal: 'pt',
  Malta: 'mt',
  Norway: 'no',
  Brazil: 'br',
  Argentina: 'ar',
  Colombia: 'co',
  Peru: 'pe',
  Venezuela: 've',
  Uruguay: 'uy',
};
