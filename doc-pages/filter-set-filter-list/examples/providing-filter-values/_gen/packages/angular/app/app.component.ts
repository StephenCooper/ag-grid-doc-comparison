import { Component } from '@angular/core';
import {
  ColDef,
  FirstDataRenderedEvent,
  GridReadyEvent,
  IFiltersToolPanel,
  SideBarDef,
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
    [sideBar]="sideBar"
    [rowData]="rowData"
    (firstDataRendered)="onFirstDataRendered($event)"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular> `,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    {
      headerName: 'Days (Values Not Provided)',
      field: 'days',
      filter: 'agSetColumnFilter',
      filterParams: daysValuesNotProvidedFilterParams,
    },
    {
      headerName: 'Days (Values Provided)',
      field: 'days',
      filter: 'agSetColumnFilter',
      filterParams: daysValuesProvidedFilterParams,
    },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    filter: true,
    resizable: true,
  };
  public sideBar: SideBarDef | string | string[] | boolean | null = 'filters';
  public rowData: any[] | null = getRowData();

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    ((params.api.getToolPanelInstance(
      'filters'
    ) as any) as IFiltersToolPanel).expandFilters();
  }

  onGridReady(params: GridReadyEvent) {}
}

var listOfDays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
var daysValuesNotProvidedFilterParams = {
  comparator: function (a: string, b: string) {
    var aIndex = listOfDays.indexOf(a);
    var bIndex = listOfDays.indexOf(b);
    if (aIndex === bIndex) return 0;
    return aIndex > bIndex ? 1 : -1;
  },
};
var daysValuesProvidedFilterParams = {
  values: listOfDays,
  suppressSorting: true, // use provided order
};
function getRowData() {
  var weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  var rows = [];
  for (var i = 0; i < 200; i++) {
    var index = Math.floor(Math.random() * 5);
    rows.push({ days: weekdays[index] });
  }
  return rows;
}
