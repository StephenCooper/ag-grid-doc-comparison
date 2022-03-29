import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {
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
  template: `<div class="example-wrapper">
    <div class="button-bar example-header">
      <table>
        <tbody>
          <tr>
            <td>pivot (<span id="pivot">off</span>)</td>
            <td>
              <button (click)="setPivotOn()">on</button>
              <button (click)="setPivotOff()">off</button>
            </td>
          </tr>
          <tr>
            <td>
              groupHeaderHeight (<span id="groupHeaderHeight">undefined</span>)
            </td>
            <td>
              <button (click)="setGroupHeaderHeight(40)">40px</button>
              <button (click)="setGroupHeaderHeight(60)">60px</button>
              <button (click)="setGroupHeaderHeight()">undefined</button>
            </td>
            <td>headerHeight (<span id="headerHeight">undefined</span>)</td>
            <td>
              <button (click)="setHeaderHeight(70)">70px</button>
              <button (click)="setHeaderHeight(80)">80px</button>
              <button (click)="setHeaderHeight()">undefined</button>
            </td>
          </tr>
          <tr id="requiresPivot" class="hidden">
            <td>
              pivotGroupHeaderHeight (<span id="pivotGroupHeaderHeight"
                >undefined</span
              >)
            </td>
            <td>
              <button (click)="setPivotGroupHeaderHeight(50)">50px</button>
              <button (click)="setPivotGroupHeaderHeight(70)">70px</button>
              <button (click)="setPivotGroupHeaderHeight()">undefined</button>
            </td>
            <td>
              pivotHeaderHeight (<span id="pivotHeaderHeight">undefined</span>)
            </td>
            <td>
              <button (click)="setPivotHeaderHeight(60)">60px</button>
              <button (click)="setPivotHeaderHeight(80)">80px</button>
              <button (click)="setPivotHeaderHeight()">undefined</button>
            </td>
          </tr>
          <tr id="requiresNotPivot">
            <td>
              floatingFiltersHeight (<span id="floatingFiltersHeight"
                >undefined</span
              >)
            </td>
            <td>
              <button (click)="setFloatingFiltersHeight(35)">35px</button>
              <button (click)="setFloatingFiltersHeight(55)">55px</button>
              <button (click)="setFloatingFiltersHeight()">undefined</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  private gridApi!: GridApi;
  private gridColumnApi!: ColumnApi;

  public columnDefs: (ColDef | ColGroupDef)[] = [
    {
      headerName: "Athlete Details",
      children: [
        {
          field: "athlete",
          width: 150,
          suppressSizeToFit: true,
          enableRowGroup: true,
          rowGroupIndex: 0,
        },
        {
          field: "age",
          width: 90,
          minWidth: 75,
          maxWidth: 100,
          enableRowGroup: true,
        },
        {
          field: "country",
          enableRowGroup: true,
        },
        {
          field: "year",
          width: 90,
          enableRowGroup: true,
          pivotIndex: 0,
        },
        { field: "sport", width: 110, enableRowGroup: true },
        {
          field: "gold",
          enableValue: true,
          suppressMenu: true,
          filter: "agNumberColumnFilter",
          aggFunc: "sum",
        },
        {
          field: "silver",
          enableValue: true,
          suppressMenu: true,
          filter: "agNumberColumnFilter",
          aggFunc: "sum",
        },
        {
          field: "bronze",
          enableValue: true,
          suppressMenu: true,
          filter: "agNumberColumnFilter",
          aggFunc: "sum",
        },
        {
          field: "total",
          enableValue: true,
          suppressMenu: true,
          filter: "agNumberColumnFilter",
          aggFunc: "sum",
        },
      ],
    },
  ];
  public defaultColDef: ColDef = {
    sortable: true,
    resizable: true,
    floatingFilter: true,
    width: 120,
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  setPivotOn() {
    document.querySelector("#requiresPivot")!.className = "";
    document.querySelector("#requiresNotPivot")!.className = "hidden";
    this.gridColumnApi.setPivotMode(true);
    setIdText("pivot", "on");
  }

  setPivotOff() {
    document.querySelector("#requiresPivot")!.className = "hidden";
    document.querySelector("#requiresNotPivot")!.className = "";
    this.gridColumnApi.setPivotMode(false);
    setIdText("pivot", "off");
  }

  setHeaderHeight(value?: number) {
    this.gridApi.setHeaderHeight(value);
    setIdText("headerHeight", value);
  }

  setGroupHeaderHeight(value?: number) {
    this.gridApi.setGroupHeaderHeight(value);
    setIdText("groupHeaderHeight", value);
  }

  setFloatingFiltersHeight(value?: number) {
    this.gridApi.setFloatingFiltersHeight(value);
    setIdText("floatingFiltersHeight", value);
  }

  setPivotGroupHeaderHeight(value?: number) {
    this.gridApi.setPivotGroupHeaderHeight(value);
    setIdText("pivotGroupHeaderHeight", value);
  }

  setPivotHeaderHeight(value?: number) {
    this.gridApi.setPivotHeaderHeight(value);
    setIdText("pivotHeaderHeight", value);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => (this.rowData = data));
  }
}

function setIdText(id: string, value: string | number | undefined) {
  document.getElementById(id)!.innerHTML =
    value == undefined ? "undefined" : value + "";
}
