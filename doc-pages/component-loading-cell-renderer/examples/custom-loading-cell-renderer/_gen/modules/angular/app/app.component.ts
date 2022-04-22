import {
  ColDef,
  GridReadyEvent,
  IServerSideDatasource,
  IServerSideGetRowsRequest,
  ServerSideStoreType,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CustomLoadingCellRenderer } from './custom-loading-cell-renderer.component';
// Required feature modules are registered in app.module.ts

@Component({
  selector: 'my-app',
  template: `<div
    style="height: 100%; padding-top: 25px; box-sizing: border-box;"
  >
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [loadingCellRenderer]="loadingCellRenderer"
      [loadingCellRendererParams]="loadingCellRendererParams"
      [rowModelType]="rowModelType"
      [serverSideStoreType]="serverSideStoreType"
      [cacheBlockSize]="cacheBlockSize"
      [maxBlocksInCache]="maxBlocksInCache"
      [animateRows]="true"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div>`,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: 'id' },
    { field: 'athlete', width: 150 },
    { field: 'age' },
    { field: 'country' },
    { field: 'year' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
  ];
  public defaultColDef: ColDef = {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  };
  public loadingCellRenderer: any = CustomLoadingCellRenderer;
  public loadingCellRendererParams: any = {
    loadingMessage: 'One moment please...',
  };
  public rowModelType = 'serverSide';
  public serverSideStoreType: ServerSideStoreType = 'partial';
  public cacheBlockSize = 100;
  public maxBlocksInCache = 10;
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => {
        // add id to data
        let idSequence = 0;
        data.forEach((item: any) => {
          item.id = idSequence++;
        });
        const server: any = getFakeServer(data);
        const datasource: IServerSideDatasource = getServerSideDatasource(
          server
        );
        params.api!.setServerSideDatasource(datasource);
      });
  }
}

function getServerSideDatasource(server: any): IServerSideDatasource {
  return {
    getRows: (params) => {
      // adding delay to simulate real server call
      setTimeout(() => {
        const response = server.getResponse(params.request);
        if (response.success) {
          // call the success callback
          params.success({
            rowData: response.rows,
            rowCount: response.lastRow,
          });
        } else {
          // inform the grid request failed
          params.fail();
        }
      }, 2000);
    },
  };
}
function getFakeServer(allData: any[]): any {
  return {
    getResponse: (request: IServerSideGetRowsRequest) => {
      console.log(
        'asking for rows: ' + request.startRow + ' to ' + request.endRow
      );
      // take a slice of the total rows
      const rowsThisPage = allData.slice(request.startRow, request.endRow);
      // if on or after the last page, work out the last row.
      const lastRow =
        allData.length <= (request.endRow || 0) ? allData.length : -1;
      return {
        success: true,
        rows: rowsThisPage,
        lastRow: lastRow,
      };
    },
  };
}
