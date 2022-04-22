import {
  ColDef,
  GridApi,
  GridReadyEvent,
  IFiltersToolPanel,
  SideBarDef,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
// Required feature modules are registered in app.module.ts

@Component({
  selector: 'my-app',
  template: `<div class="example-wrapper">
    <div>
      <div class="button-group">
        <button (click)="saveFilterModel()">Save Filter Model</button>
        <button (click)="restoreFilterModel()">
          Restore Saved Filter Model
        </button>
        <button
          (click)="restoreFromHardCoded()"
          title="Name = 'Mich%', Country = ['Ireland', 'United States'], Age < 30, Date < 01/01/2010"
        >
          Set Custom Filter Model
        </button>
        <button (click)="clearFilters()">Reset Filters</button>
        <button (click)="destroyFilter()">Destroy Filter</button>
      </div>
    </div>
    <div>
      <div class="button-group">
        Saved Filters: <span id="savedFilters">(none)</span>
      </div>
    </div>

    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [sideBar]="sideBar"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: 'athlete', filter: 'agTextColumnFilter' },
    { field: 'age', filter: 'agNumberColumnFilter', maxWidth: 100 },
    { field: 'country' },
    { field: 'year', maxWidth: 100 },
    {
      field: 'date',
      filter: 'agDateColumnFilter',
      filterParams: filterParams,
    },
    { field: 'sport' },
    { field: 'gold', filter: 'agNumberColumnFilter' },
    { field: 'silver', filter: 'agNumberColumnFilter' },
    { field: 'bronze', filter: 'agNumberColumnFilter' },
    { field: 'total', filter: 'agNumberColumnFilter' },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    filter: true,
    sortable: true,
  };
  public sideBar: SideBarDef | string | string[] | boolean | null = 'filters';
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  clearFilters() {
    this.gridApi.setFilterModel(null);
  }

  saveFilterModel() {
    savedFilterModel = this.gridApi.getFilterModel();
    var keys = Object.keys(savedFilterModel);
    var savedFilters: string = keys.length > 0 ? keys.join(', ') : '(none)';
    (document.querySelector('#savedFilters') as any).innerHTML = savedFilters;
  }

  restoreFilterModel() {
    this.gridApi.setFilterModel(savedFilterModel);
  }

  restoreFromHardCoded() {
    var hardcodedFilter = {
      country: {
        type: 'set',
        values: ['Ireland', 'United States'],
      },
      age: { type: 'lessThan', filter: '30' },
      athlete: { type: 'startsWith', filter: 'Mich' },
      date: { type: 'lessThan', dateFrom: '2010-01-01' },
    };
    this.gridApi.setFilterModel(hardcodedFilter);
  }

  destroyFilter() {
    this.gridApi.destroyFilter('athlete');
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    ((params.api.getToolPanelInstance(
      'filters'
    ) as any) as IFiltersToolPanel).expandFilters();

    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => (this.rowData = data));
  }
}

var filterParams = {
  comparator: function (filterLocalDateAtMidnight: Date, cellValue: string) {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split('/');
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
  },
  // browserDatePicker: true,
};
var savedFilterModel: any = null;
