import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  ColumnApi,
  GetLocaleTextParams,
  Grid,
  GridApi,
  GridOptions,
  GridReadyEvent,
  IFilterOptionDef,
} from "@ag-grid-community/core";
// Required feature modules are registered in app.module.ts
declare var window: any;

@Component({
  selector: "my-app",
  template: `<div class="example-wrapper">
    <div style="margin-bottom: 5px;">
      <button (click)="printState()">Print State</button>
      <button (click)="saveState()">Save State</button>
      <button (click)="restoreState()">Restore State</button>
      <button (click)="resetState()">Reset State</button>
    </div>

    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [getLocaleText]="getLocaleText"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    {
      field: "athlete",
      filterParams: containsFilterParams,
    },
    {
      field: "age",
      minWidth: 120,
      filter: "agNumberColumnFilter",
      filterParams: filterParams,
    },
    {
      field: "date",
      filter: "agDateColumnFilter",
      filterParams: equalsFilterParams,
    },
    {
      field: "country",
      filterParams: notEqualsFilterParams,
    },
    { field: "gold", filter: "agNumberColumnFilter" },
    { field: "silver", filter: "agNumberColumnFilter" },
    { field: "bronze", filter: "agNumberColumnFilter" },
    { field: "total", filter: false },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    sortable: true,
    filter: true,
  };
  public getLocaleText: (params: GetLocaleTextParams) => string = (
    params: GetLocaleTextParams
  ) => {
    if (params.key === "notEqualNoNulls") {
      return "* Not Equals (No Nulls) *";
    }
    return params.defaultValue;
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  printState() {
    var filterState = this.gridApi.getFilterModel();
    console.log("filterState: ", filterState);
  }

  saveState() {
    window.filterState = this.gridApi.getFilterModel();
    console.log("filter state saved");
  }

  restoreState() {
    this.gridApi.setFilterModel(window.filterState);
    console.log("filter state restored");
  }

  resetState() {
    this.gridApi.setFilterModel(null);
    console.log("column state reset");
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>(
        "https://www.ag-grid.com/example-assets/small-olympic-winners.json"
      )
      .subscribe((data) => {
        this.rowData = data;
      });
  }
}

var filterParams = {
  filterOptions: [
    "empty",
    {
      displayKey: "evenNumbers",
      displayName: "Even Numbers",
      predicate: (_, cellValue) => cellValue != null && cellValue % 2 === 0,
      numberOfInputs: 0,
    },
    {
      displayKey: "oddNumbers",
      displayName: "Odd Numbers",
      predicate: (_, cellValue) => cellValue != null && cellValue % 2 !== 0,
      numberOfInputs: 0,
    },
    {
      displayKey: "blanks",
      displayName: "Blanks",
      predicate: (_, cellValue) => cellValue == null,
      numberOfInputs: 0,
    },
    {
      displayKey: "age5YearsAgo",
      displayName: "Age 5 Years Ago",
      predicate: ([fv1]: any[], cellValue) =>
        cellValue == null || cellValue - 5 === fv1,
      numberOfInputs: 1,
    },
    {
      displayKey: "betweenExclusive",
      displayName: "Between (Exclusive)",
      predicate: ([fv1, fv2], cellValue) =>
        cellValue == null || (fv1 < cellValue && fv2 > cellValue),
      numberOfInputs: 2,
    },
  ] as IFilterOptionDef[],
  suppressAndOrCondition: true,
};
var containsFilterParams = {
  filterOptions: [
    "contains",
    {
      displayKey: "startsA",
      displayName: 'Starts With "A"',
      predicate: (_, cellValue) =>
        cellValue != null && cellValue.indexOf("A") === 0,
      numberOfInputs: 0,
    },
    {
      displayKey: "startsN",
      displayName: 'Starts With "N"',
      predicate: (_, cellValue) =>
        cellValue != null && cellValue.indexOf("N") === 0,
      numberOfInputs: 0,
    },
    {
      displayKey: "regexp",
      displayName: "Regular Expression",
      predicate: ([fv1]: any[], cellValue) =>
        cellValue == null || new RegExp(fv1, "gi").test(cellValue),
      numberOfInputs: 1,
    },
    {
      displayKey: "betweenExclusive",
      displayName: "Between (Exclusive)",
      predicate: ([fv1, fv2]: any[], cellValue) =>
        cellValue == null || (fv1 < cellValue && fv2 > cellValue),
      numberOfInputs: 2,
    },
  ] as IFilterOptionDef[],
};
var equalsFilterParams = {
  filterOptions: [
    "equals",
    {
      displayKey: "equalsWithNulls",
      displayName: "Equals (with Nulls)",
      predicate: ([filterValue]: any[], cellValue) => {
        if (cellValue == null) return true;
        var parts = cellValue.split("/");
        var cellDate = new Date(
          Number(parts[2]),
          Number(parts[1] - 1),
          Number(parts[0])
        );
        return cellDate.getTime() === filterValue.getTime();
      },
    },
    {
      displayKey: "leapYear",
      displayName: "Leap Year",
      predicate: (_, cellValue) => {
        if (cellValue == null) return true;
        const year = Number(cellValue.split("/")[2]);
        return year % 4 === 0 && year % 200 !== 0;
      },
      numberOfInputs: 0,
    },
    {
      displayKey: "betweenExclusive",
      displayName: "Between (Exclusive)",
      predicate: ([fv1, fv2]: any[], cellValue) => {
        if (cellValue == null) return true;
        var parts = cellValue.split("/");
        var cellDate = new Date(
          Number(parts[2]),
          Number(parts[1] - 1),
          Number(parts[0])
        );
        return (
          cellDate.getTime() > fv1.getTime() &&
          cellDate.getTime() < fv2.getTime()
        );
      },
      numberOfInputs: 2,
    },
  ] as IFilterOptionDef[],
  comparator: function (filterLocalDateAtMidnight: Date, cellValue: string) {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split("/");
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
  browserDatePicker: true,
};
var notEqualsFilterParams = {
  filterOptions: [
    "notEqual",
    {
      displayKey: "notEqualNoNulls",
      displayName: "Not Equals without Nulls",
      predicate: ([filterValue], cellValue) => {
        if (cellValue == null) return false;
        return cellValue.toLowerCase() !== filterValue.toLowerCase();
      },
    },
  ] as IFilterOptionDef[],
};
