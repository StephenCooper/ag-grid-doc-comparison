import {
  ColDef,
  GridApi,
  GridReadyEvent,
  RowNode,
} from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
// Required feature modules are registered in app.module.ts

@Component({
  selector: "my-app",
  template: `<div class="test-container">
    <div class="test-header">
      <label>
        <input
          type="radio"
          name="filter"
          id="everyone"
          (change)="externalFilterChanged('everyone')"
        />
        Everyone
      </label>
      <label>
        <input
          type="radio"
          name="filter"
          id="below25"
          (change)="externalFilterChanged('below25')"
        />
        Below 25
      </label>
      <label>
        <input
          type="radio"
          name="filter"
          id="between25and50"
          (change)="externalFilterChanged('between25and50')"
        />
        Between 25 and 50
      </label>
      <label>
        <input
          type="radio"
          name="filter"
          id="above50"
          (change)="externalFilterChanged('above50')"
        />
        Above 50
      </label>
      <label>
        <input
          type="radio"
          name="filter"
          id="dateAfter2008"
          (change)="externalFilterChanged('dateAfter2008')"
        />
        After 01/01/2008
      </label>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [animateRows]="true"
      [isExternalFilterPresent]="isExternalFilterPresent"
      [doesExternalFilterPass]="doesExternalFilterPass"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div> `,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: ColDef[] = [
    { field: "athlete", minWidth: 180 },
    { field: "age", filter: "agNumberColumnFilter", maxWidth: 80 },
    { field: "country" },
    { field: "year", maxWidth: 90 },
    {
      field: "date",
      filter: "agDateColumnFilter",
      filterParams: dateFilterParams,
    },
    { field: "gold", filter: "agNumberColumnFilter" },
    { field: "silver", filter: "agNumberColumnFilter" },
    { field: "bronze", filter: "agNumberColumnFilter" },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 120,
    filter: true,
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  externalFilterChanged(newValue: string) {
    ageType = newValue;
    this.gridApi.onFilterChanged();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => {
        (document.querySelector("#everyone") as HTMLInputElement).checked =
          true;
        this.rowData = data;
      });
  }

  isExternalFilterPresent() {
    // if ageType is not everyone, then we are filtering
    return ageType !== "everyone";
  }

  doesExternalFilterPass(node: RowNode) {
    switch (ageType) {
      case "below25":
        return node.data.age < 25;
      case "between25and50":
        return node.data.age >= 25 && node.data.age <= 50;
      case "above50":
        return node.data.age > 50;
      case "dateAfter2008":
        return asDate(node.data.date) > new Date(2008, 1, 1);
      default:
        return true;
    }
  }
}

var dateFilterParams = {
  comparator: function (filterLocalDateAtMidnight: Date, cellValue: string) {
    var cellDate = asDate(cellValue);
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
};
var ageType = "everyone";
function asDate(dateAsString: string) {
  var splitFields = dateAsString.split("/");
  return new Date(
    Number.parseInt(splitFields[2]),
    Number.parseInt(splitFields[1]) - 1,
    Number.parseInt(splitFields[0])
  );
}
