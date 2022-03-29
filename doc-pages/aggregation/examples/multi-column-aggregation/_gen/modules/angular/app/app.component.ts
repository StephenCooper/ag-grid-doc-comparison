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
  IAggFuncParams,
  ValueFormatterParams,
  ValueGetterParams,
} from "@ag-grid-community/core";
// Required feature modules are registered in app.module.ts

@Component({
  selector: "my-app",
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [autoGroupColumnDef]="autoGroupColumnDef"
    [suppressAggFuncInHeader]="true"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    {
      field: "country",
      rowGroup: true,
      hide: true,
      suppressColumnsToolPanel: true,
    },
    {
      field: "sport",
      rowGroup: true,
      hide: true,
      suppressColumnsToolPanel: true,
    },
    {
      field: "year",
      pivot: true,
      hide: true,
      suppressColumnsToolPanel: true,
    },
    { field: "gold", aggFunc: "sum", valueFormatter: numberFormatter },
    { field: "silver", aggFunc: "sum", valueFormatter: numberFormatter },
    {
      headerName: "Ratio",
      colId: "goldSilverRatio",
      aggFunc: ratioAggFunc,
      valueGetter: ratioValueGetter,
      valueFormatter: ratioFormatter,
    },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    sortable: true,
    filter: true,
  };
  public autoGroupColumnDef: ColDef = {
    minWidth: 220,
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => (this.rowData = data));
  }
}

function numberFormatter(params: ValueFormatterParams): string {
  if (!params.value || params.value === 0) return "0";
  return "" + Math.round(params.value * 100) / 100;
}
function ratioValueGetter(params: ValueGetterParams) {
  if (!(params.node && params.node.group)) {
    // no need to handle group levels - calculated in the 'ratioAggFunc'
    return createValueObject(params.data.gold, params.data.silver);
  }
}
function ratioAggFunc(params: IAggFuncParams) {
  let goldSum = 0;
  let silverSum = 0;
  params.values.forEach((value) => {
    if (value && value.gold) {
      goldSum += value.gold;
    }
    if (value && value.silver) {
      silverSum += value.silver;
    }
  });
  return createValueObject(goldSum, silverSum);
}
function createValueObject(gold: number, silver: number) {
  return {
    gold: gold,
    silver: silver,
    toString: () => `${gold && silver ? gold / silver : 0}`,
  };
}
function ratioFormatter(params: ValueFormatterParams) {
  if (!params.value || params.value === 0) return "";
  return "" + Math.round(params.value * 100) / 100;
}
