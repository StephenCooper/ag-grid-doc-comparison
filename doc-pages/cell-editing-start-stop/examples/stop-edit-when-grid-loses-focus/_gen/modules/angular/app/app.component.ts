import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  ColumnApi,
  Grid,
  GridApi,
  GridOptions,
  GridReadyEvent,
  ICellEditorComp,
  ICellEditorParams,
} from "@ag-grid-community/core";
// Required feature modules are registered in app.module.ts

@Component({
  selector: "my-app",
  template: `<div class="example-wrapper">
    <div class="example-header">
      Clicking outside the grid will stop the editing
      <button style="font-size: 12px">Dummy Save</button>
      <input placeholder="click here, editing stops" />
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [stopEditingWhenCellsLoseFocus]="true"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: "athlete", minWidth: 160 },
    { field: "age" },
    { field: "country", minWidth: 140 },
    { field: "year", cellEditor: YearCellEditor, cellEditorPopup: true },
    { field: "date", minWidth: 140 },
    { field: "sport", minWidth: 160 },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    filter: true,
    editable: true,
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => (this.rowData = data));
  }
}

class YearCellEditor implements ICellEditorComp {
  eGui: any;
  value: any;

  getGui() {
    return this.eGui;
  }

  getValue() {
    return this.value;
  }

  isPopup() {
    return true;
  }

  init(params: ICellEditorParams) {
    this.value = params.value;
    const tempElement = document.createElement("div");
    tempElement.innerHTML =
      '<div class="yearSelect">' +
      "<div>Clicking here does not close the popup!</div>" +
      '<button id="bt2006" class="yearButton">2006</button>' +
      '<button id="bt2008" class="yearButton">2008</button>' +
      '<button id="bt2010" class="yearButton">2010</button>' +
      '<button id="bt2012" class="yearButton">2012</button>' +
      "<div>" +
      '<input type="text" style="width: 100%;" placeholder="clicking on this text field does not close"/>' +
      "</div>" +
      "</div>";

    [2006, 2008, 2010, 2012].forEach((year) => {
      tempElement.querySelector("#bt" + year)!.addEventListener("click", () => {
        this.value = year;
        params.stopEditing();
      });
    });

    this.eGui = tempElement.firstChild;
  }
}
