import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  ColDef,
  FirstDataRenderedEvent,
  GridApi,
  GridReadyEvent,
  IFiltersToolPanel,
  SideBarDef,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { CountryCellRenderer } from './country-cell-renderer.component';

@Component({
  selector: 'my-app',
  template: `<div class="example-wrapper">
    <div style="margin-bottom: 5px;">
      <button (click)="printFilterModel()">Print Filter Model</button>
    </div>

    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [context]="context"
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
      headerName: 'No Cell Renderer',
      field: 'country',
      cellRenderer: CountryCellRenderer,
      filter: 'agSetColumnFilter',
      filterParams: {
        // no cell renderer!
      },
    },
    {
      headerName: 'With Cell Renderers',
      field: 'country',
      cellRenderer: CountryCellRenderer,
      filter: 'agSetColumnFilter',
      filterParams: {
        cellRenderer: CountryCellRenderer,
      },
    },
  ];
  public context: any = {
    COUNTRY_CODES: COUNTRY_CODES,
  };
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
    const filterModel = this.gridApi.getFilterModel();
    console.log(filterModel);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => {
        // only return data that has corresponding country codes
        const dataWithFlags = data.filter(function (d: any) {
          return COUNTRY_CODES[d.country];
        });
        params.api!.setRowData(dataWithFlags);
      });
  }
}

const COUNTRY_CODES: Record<string, string> = {
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
