import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import {
  ColDef,
  ColGroupDef,
  ColumnApi,
  FirstDataRenderedEvent,
  Grid,
  GridApi,
  GridOptions,
  GridReadyEvent,
  IDetailCellRendererParams,
  RowHeightParams,
} from "ag-grid-community";

@Component({
  selector: "my-app",
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [masterDetail]="true"
    [detailCellRendererParams]="detailCellRendererParams"
    [getRowHeight]="getRowHeight"
    [rowData]="rowData"
    (firstDataRendered)="onFirstDataRendered($event)"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    // group cell renderer needed for expand / collapse icons
    { field: "name", cellRenderer: "agGroupCellRenderer" },
    { field: "account" },
    { field: "calls" },
    { field: "minutes", valueFormatter: "x.toLocaleString() + 'm'" },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
  };
  public detailCellRendererParams: any = {
    detailGridOptions: {
      columnDefs: [
        { field: "callId" },
        { field: "direction" },
        { field: "number" },
        { field: "duration", valueFormatter: "x.toLocaleString() + 's'" },
        { field: "switchCode" },
      ],
      defaultColDef: {
        flex: 1,
      },
      onGridReady: function (params) {
        // using auto height to fit the height of the the detail grid
        params.api.setDomLayout("autoHeight");
      },
    },
    getDetailRowData: function (params) {
      params.successCallback(params.data.callRecords);
    },
  } as IDetailCellRendererParams;
  public getRowHeight: (params: RowHeightParams) => number | undefined | null =
    function (params) {
      if (params.node && params.node.detail) {
        var offset = 80;
        var allDetailRowHeight =
          params.data.callRecords.length *
          params.api.getSizesForCurrentTheme().rowHeight;
        var gridSizes = params.api.getSizesForCurrentTheme();
        return (
          allDetailRowHeight +
          ((gridSizes && gridSizes.headerHeight) || 0) +
          offset
        );
      }
    };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    // arbitrarily expand a row for presentational purposes
    setTimeout(function () {
      params.api.getDisplayedRowAtIndex(1)!.setExpanded(true);
    }, 0);
  }

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>(
        "https://www.ag-grid.com/example-assets/master-detail-dynamic-row-height-data.json"
      )
      .subscribe((data) => {
        this.rowData = data;
      });
  }
}
