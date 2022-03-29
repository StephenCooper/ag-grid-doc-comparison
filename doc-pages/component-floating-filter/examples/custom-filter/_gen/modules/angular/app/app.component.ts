import {
  ColDef,
  GridReadyEvent,
  IDoesFilterPassParams,
  IFilterComp,
  IFilterParams,
} from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
// Required feature modules are registered in app.module.ts

@Component({
  selector: "my-app",
  template: `
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  `,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: "athlete", width: 150, filter: false },
    {
      field: "gold",
      width: 100,
      filter: NumberFilter,
      suppressMenu: true,
    },
    {
      field: "silver",
      width: 100,
      filter: NumberFilter,
      suppressMenu: true,
    },
    {
      field: "bronze",
      width: 100,
      filter: NumberFilter,
      suppressMenu: true,
    },
    {
      field: "total",
      width: 100,
      filter: NumberFilter,
      suppressMenu: true,
    },
  ];
  public defaultColDef: ColDef = {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    floatingFilter: true,
    resizable: true,
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => {
        this.rowData = data;
      });
  }
}

class NumberFilter implements IFilterComp {
  filterParams!: IFilterParams;
  filterText: string | null = null;
  eFilterText: any;
  params!: IFilterParams;
  gui: any;
  onFilterChanged!: () => void;

  init(params: IFilterParams) {
    this.filterParams = params;
    this.filterText = null;
    this.params = params;
    this.setupGui();
  }

  // not called by AG Grid, just for us to help setup
  setupGui() {
    this.gui = document.createElement("div");
    this.gui.innerHTML =
      '<div style="padding: 4px;">' +
      '<div style="font-weight: bold;">Greater than: </div>' +
      '<div><input style="margin: 4px 0px 4px 0px;" type="number" id="filterText" placeholder="Number of medals..."/></div>' +
      "</div>";

    this.onFilterChanged = () => {
      this.extractFilterText();
      this.params.filterChangedCallback();
    };

    this.eFilterText = this.gui.querySelector("#filterText");
    this.eFilterText.addEventListener("input", this.onFilterChanged);
  }

  extractFilterText() {
    this.filterText = this.eFilterText.value;
  }

  getGui() {
    return this.gui;
  }

  doesFilterPass(params: IDoesFilterPassParams) {
    if (!this.isFilterActive()) {
      return false;
    }

    const { api, colDef, column, columnApi, context } = this.filterParams;
    const { node } = params;
    const value = this.filterParams.valueGetter({
      api,
      colDef,
      column,
      columnApi,
      context,
      data: node.data,
      getValue: (field) => node.data[field],
      node,
    });

    const filterValue = this.filterText;

    if (!value) return false;
    return Number(value) > Number(filterValue);
  }

  isFilterActive() {
    return (
      this.filterText !== null &&
      this.filterText !== undefined &&
      this.filterText !== "" &&
      isNumeric(this.filterText)
    );
  }

  getModel() {
    return this.isFilterActive() ? Number(this.eFilterText.value) : null;
  }

  setModel(model: any) {
    this.eFilterText.value = model;
    this.extractFilterText();
  }

  destroy() {
    this.eFilterText.removeEventListener("input", this.onFilterChanged);
  }

  getModelAsString() {
    return this.isFilterActive() ? ">" + this.filterText : "";
  }
}

const isNumeric = (n: string) =>
  !isNaN(parseFloat(n)) && isFinite(parseFloat(n));
