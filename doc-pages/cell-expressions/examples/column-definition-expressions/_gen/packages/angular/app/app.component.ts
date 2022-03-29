import { Component } from "@angular/core";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import {
  CellValueChangedEvent,
  ColDef,
  ColGroupDef,
  ColumnApi,
  Grid,
  GridApi,
  GridOptions,
  GridReadyEvent,
} from "ag-grid-community";

@Component({
  selector: "my-app",
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine-dark"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [enableRangeSelection]="true"
    [rowData]="rowData"
    (cellValueChanged)="onCellValueChanged($event)"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    {
      headerName: "String (editable)",
      field: "simple",
      editable: true,
    },
    {
      headerName: "Bad Number (editable)",
      field: "numberBad",
      editable: true,
    },
    {
      headerName: "Good Number (editable)",
      field: "numberGood",
      editable: true,
      valueFormatter: `"£" + Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, "$1,")`,
      valueParser: "Number(newValue)",
    },
    {
      headerName: "Name (editable)",
      editable: true,
      valueGetter: 'data.firstName + " " + data.lastName',
      valueSetter:
        // an expression can span multiple lines!!!
        `var nameSplit = newValue.split(" ");
             var newFirstName = nameSplit[0];
             var newLastName = nameSplit[1];
             if (data.firstName !== newFirstName || data.lastName !== newLastName) {  
                data.firstName = newFirstName;  
                data.lastName = newLastName;  
                return true;
            } else {  
                return false;
            }`,
    },
    { headerName: "A", field: "a", maxWidth: 120 },
    { headerName: "B", field: "b", maxWidth: 120 },
    { headerName: "A + B", valueGetter: "data.a + data.b", maxWidth: 120 },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 200,
    resizable: true,
  };
  public rowData: any[] | null = getData();

  onCellValueChanged(event: CellValueChangedEvent) {
    console.log("data after changes is: ", event.data);
  }

  onGridReady(params: GridReadyEvent) {
    params.api.sizeColumnsToFit();
  }
}
