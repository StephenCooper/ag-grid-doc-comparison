import { ColDef, ColGroupDef, GridReadyEvent } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
// Required feature modules are registered in app.module.ts

@Component({
  selector: "my-app",
  template: `<div style="height: 100%; box-sizing: border-box;">
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [defaultColGroupDef]="defaultColGroupDef"
      [columnTypes]="columnTypes"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  public columnDefs: (ColDef | ColGroupDef)[] = [
    // using default ColDef
    { field: "athlete" },
    { field: "sport" },
    // using number column type
    { field: "age", type: "numberColumn" },
    { field: "year", type: "numberColumn" },
    // using date and non-editable column types
    { field: "date", type: ["dateColumn", "nonEditableColumn"], width: 220 },
    {
      headerName: "Medals",
      groupId: "medalsGroup",
      children: [
        // using medal column type
        { headerName: "Gold", field: "gold", type: "medalColumn" },
        { headerName: "Silver", field: "silver", type: "medalColumn" },
        { headerName: "Bronze", field: "bronze", type: "medalColumn" },
        {
          headerName: "Total",
          field: "total",
          type: "medalColumn",
          columnGroupShow: "closed",
        },
      ],
    },
  ];
  public defaultColDef: ColDef = {
    // set the default column width
    width: 150,
    // make every column editable
    editable: true,
    // make every column use 'text' filter by default
    filter: "agTextColumnFilter",
    // enable floating filters by default
    floatingFilter: true,
    // make columns resizable
    resizable: true,
  };
  public defaultColGroupDef: Partial<ColGroupDef> = {
    marryChildren: true,
  };
  public columnTypes: {
    [key: string]: ColDef;
  } = {
    numberColumn: { width: 130, filter: "agNumberColumnFilter" },
    medalColumn: { width: 100, columnGroupShow: "open", filter: false },
    nonEditableColumn: { editable: false },
    dateColumn: {
      // specify we want to use the date filter
      filter: "agDateColumnFilter",
      // add extra parameters for the date filter
      filterParams: {
        // provide comparator function
        comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
          // In the example application, dates are stored as dd/mm/yyyy
          // We create a Date object for comparison against the filter date
          const dateParts = cellValue.split("/");
          const day = Number(dateParts[0]);
          const month = Number(dateParts[1]) - 1;
          const year = Number(dateParts[2]);
          const cellDate = new Date(year, month, day);
          // Now that both parameters are Date objects, we can compare
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          } else if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          } else {
            return 0;
          }
        },
      },
    },
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => (this.rowData = data));
  }
}
