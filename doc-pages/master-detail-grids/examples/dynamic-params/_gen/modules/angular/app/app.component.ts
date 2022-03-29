import {
  ColDef,
  FirstDataRenderedEvent,
  GridReadyEvent,
  ICellRendererParams,
  IDetailCellRendererParams,
} from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
// Required feature modules are registered in app.module.ts

@Component({
  selector: "my-app",
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [masterDetail]="true"
    [detailRowHeight]="detailRowHeight"
    [detailCellRendererParams]="detailCellRendererParams"
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
  public detailRowHeight = 195;
  public detailCellRendererParams: any = function (
    params: ICellRendererParams
  ) {
    var res = {} as IDetailCellRendererParams;
    // we use the same getDetailRowData for both options
    res.getDetailRowData = function (params) {
      params.successCallback(params.data.callRecords);
    };
    var nameMatch =
      params.data.name === "Mila Smith" ||
      params.data.name === "Harper Johnson";
    if (nameMatch) {
      // grid options for columns {callId, number}
      res.detailGridOptions = {
        columnDefs: [{ field: "callId" }, { field: "number" }],
        defaultColDef: {
          flex: 1,
        },
      };
    } else {
      // grid options for columns {callId, direction, duration, switchCode}
      res.detailGridOptions = {
        columnDefs: [
          { field: "callId" },
          { field: "direction" },
          { field: "duration", valueFormatter: "x.toLocaleString() + 's'" },
          { field: "switchCode" },
        ],
        defaultColDef: {
          flex: 1,
        },
      };
    }
    return res;
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    // arbitrarily expand a row for presentational purposes
    setTimeout(function () {
      var node1 = params.api.getDisplayedRowAtIndex(1)!;
      var node2 = params.api.getDisplayedRowAtIndex(2)!;
      node1.setExpanded(true);
      node2.setExpanded(true);
    }, 0);
  }

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>(
        "https://www.ag-grid.com/example-assets/master-detail-data.json"
      )
      .subscribe((data) => {
        this.rowData = data;
      });
  }
}
