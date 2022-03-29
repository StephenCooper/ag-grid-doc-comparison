import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import {
  ColDef,
  ColGroupDef,
  ColumnApi,
  FirstDataRenderedEvent,
  Grid,
  GridApi,
  GridOptions,
  GridReadyEvent,
  IDoesFilterPassParams,
  IFilterComp,
  IFilterParams,
  IServerSideDatasource,
  ServerSideStoreType,
  SideBarDef,
} from "ag-grid-community";
declare function createFakeServer(data: any): any;
declare function createServerSideDatasource(
  server: any,
  gridOptions: GridOptions
): IServerSideDatasource;
declare function getCountries(): string[];

@Component({
  selector: "my-app",
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine-dark"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [autoGroupColumnDef]="autoGroupColumnDef"
    [rowModelType]="rowModelType"
    [serverSideStoreType]="serverSideStoreType"
    [rowGroupPanelShow]="rowGroupPanelShow"
    [pivotPanelShow]="pivotPanelShow"
    [animateRows]="true"
    [debug]="true"
    [enableRangeSelection]="true"
    [sideBar]="true"
    [suppressAggFuncInHeader]="true"
    [maxConcurrentDatasourceRequests]="maxConcurrentDatasourceRequests"
    [cacheBlockSize]="cacheBlockSize"
    [maxBlocksInCache]="maxBlocksInCache"
    [purgeClosedRowNodes]="true"
    [rowData]="rowData"
    (firstDataRendered)="onFirstDataRendered($event)"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular> `,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    {
      field: "athlete",
      enableRowGroup: true,
      enablePivot: true,
      filter: false,
    },
    {
      field: "age",
      enableRowGroup: true,
      filter: CustomAgeFilter,
    },
    {
      field: "country",
      enableRowGroup: true,
      enablePivot: true,
      rowGroup: true,
      hide: true,
      filter: "agSetColumnFilter",
      filterParams: { values: countries },
    },
    {
      field: "year",
      enableRowGroup: true,
      enablePivot: true,
      rowGroup: true,
      hide: true,
      filter: "agSetColumnFilter",
      filterParams: {
        values: ["2000", "2002", "2004", "2006", "2008", "2010", "2012"],
      },
    },
    { field: "sport", enableRowGroup: true, enablePivot: true, filter: false },
    { field: "gold", aggFunc: "sum", filter: false, enableValue: true },
    { field: "silver", aggFunc: "sum", filter: false, enableValue: true },
    { field: "bronze", aggFunc: "sum", filter: false, enableValue: true },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    // restrict what aggregation functions the columns can have,
    // include a custom function 'random' that just returns a
    // random number
    allowedAggFuncs: ["sum", "min", "max", "random"],
    sortable: true,
    resizable: true,
    filter: true,
  };
  public autoGroupColumnDef: ColDef = {
    width: 180,
  };
  public rowModelType = "serverSide";
  public serverSideStoreType: ServerSideStoreType = "partial";
  public rowGroupPanelShow = "always";
  public pivotPanelShow = "always";
  public maxConcurrentDatasourceRequests = 1;
  public cacheBlockSize = 100;
  public maxBlocksInCache = 2;
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    params.api.sizeColumnsToFit();
  }

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .subscribe((data) => {
        const fakeServer = createFakeServer(data);
        const datasource = createServerSideDatasource(fakeServer, params);
        params.api!.setServerSideDatasource(datasource);
      });
  }
}

class CustomAgeFilter implements IFilterComp {
  eGui: any;
  filterValue: number | null = null;
  params!: IFilterParams;

  init(params: IFilterParams) {
    this.eGui = document.createElement("div");
    this.eGui.innerHTML = `<div>  
          <label>    
              <input type="radio" name="ageFilterValue" ref="btAll" checked/> All  
          </label>  
          <label>    
              <input type="radio" name="ageFilterValue" ref="bt20"/> 20  
          </label>  
          <label>    
              <input type="radio" name="ageFilterValue" ref="bt22"/> 22  
          </label>
        </div>`;

    this.filterValue = null;
    this.params = params;

    // var that = this;

    this.eGui
      .querySelector('[ref="btAll"]')
      .addEventListener("change", this.onSelection.bind(this, null));
    this.eGui
      .querySelector('[ref="bt20"]')
      .addEventListener("change", this.onSelection.bind(this, 20));
    this.eGui
      .querySelector('[ref="bt22"]')
      .addEventListener("change", this.onSelection.bind(this, 22));
  }

  onSelection(value: number | null) {
    this.filterValue = value;
    this.params.filterChangedCallback();
  }

  getGui() {
    return this.eGui;
  }

  isFilterActive() {
    return this.filterValue !== null;
  }

  doesFilterPass(params: IDoesFilterPassParams) {
    // not needed for server side filtering
    const { api, colDef, column, columnApi, context } = this.params;
    const { node } = params;
    const value = this.params.valueGetter({
      api,
      colDef,
      column,
      columnApi,
      context,
      data: node.data,
      getValue: (field) => node.data[field],
      node,
    });
    return value == this.filterValue;
  }

  getModel() {
    if (this.filterValue === null) {
      return null;
    } else {
      // the format of what you return depends on your server side, just
      // return something that your server side can work with.
      return {
        filter: this.filterValue,
        type: "equals",
      };
    }
  }

  setModel(model: any) {
    if (model && model.filter === 20) {
      this.eGui.querySelector('[ref="bt20"]').checked = true;
      this.filterValue = 20;
    } else if (model && model.filter === 22) {
      this.eGui.querySelector('[ref="bt22"]').checked = true;
      this.filterValue = 22;
    } else {
      this.eGui.querySelector('[ref="btAll"]').checked = true;
      this.filterValue = null;
    }
  }
}

const countries = getCountries();
