import {
  ColDef,
  FirstDataRenderedEvent,
  GridReadyEvent,
} from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { DetailCellRenderer } from "./detail-cell-renderer.component";
// Required feature modules are registered in app.module.ts

@Component({
  selector: "my-app",
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [enableCellChangeFlash]="true"
    [masterDetail]="true"
    [detailCellRenderer]="detailCellRenderer"
    [detailRowHeight]="detailRowHeight"
    [groupDefaultExpanded]="groupDefaultExpanded"
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
  public detailCellRenderer: any = DetailCellRenderer;
  public detailRowHeight = 70;
  public groupDefaultExpanded = 1;
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onFirstDataRendered(params: FirstDataRenderedEvent) {
    // arbitrarily expand a row for presentational purposes
    setTimeout(function () {
      params.api.getDisplayedRowAtIndex(0)!.setExpanded(true);
    }, 0);
    setInterval(function () {
      if (!allRowData) {
        return;
      }
      const data = allRowData[0];
      const newCallRecords: any[] = [];
      data.callRecords.forEach(function (record: any, index: number) {
        newCallRecords.push({
          name: record.name,
          callId: record.callId,
          duration: record.duration + (index % 2),
          switchCode: record.switchCode,
          direction: record.direction,
          number: record.number,
        });
      });
      data.callRecords = newCallRecords;
      data.calls++;
      const tran = {
        update: [data],
      };
      params.api.applyTransaction(tran);
    }, 2000);
  }

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>(
        "https://www.ag-grid.com/example-assets/master-detail-data.json"
      )
      .subscribe((data) => {
        allRowData = data;
        params.api!.setRowData(allRowData);
      });
  }
}

let allRowData: any[];
