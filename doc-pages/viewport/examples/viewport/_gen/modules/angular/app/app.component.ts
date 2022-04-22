import {
  ColDef,
  GetRowIdFunc,
  GetRowIdParams,
  GridReadyEvent,
  ICellRendererComp,
  ICellRendererParams,
  IViewportDatasource,
  ValueFormatterParams,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
// Required feature modules are registered in app.module.ts
declare function createMockServer(): any;
declare function createViewportDatasource(mockServer: any): IViewportDatasource;

@Component({
  selector: 'my-app',
  template: `
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [rowSelection]="rowSelection"
      [rowModelType]="rowModelType"
      [getRowId]="getRowId"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  `,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    // this col shows the row index, doesn't use any data from the row
    {
      headerName: '#',
      maxWidth: 80,
      cellRenderer: RowIndexRenderer,
    },
    { field: 'code', maxWidth: 90 },
    { field: 'name', minWidth: 220 },
    {
      field: 'bid',
      cellClass: 'cell-number',
      valueFormatter: numberFormatter,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
      field: 'mid',
      cellClass: 'cell-number',
      valueFormatter: numberFormatter,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
      field: 'ask',
      cellClass: 'cell-number',
      valueFormatter: numberFormatter,
      cellRenderer: 'agAnimateShowChangeCellRenderer',
    },
    {
      field: 'volume',
      cellClass: 'cell-number',
      cellRenderer: 'agAnimateSlideCellRenderer',
    },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 140,
    resizable: true,
  };
  public rowSelection = 'multiple';
  public rowModelType = 'viewport';
  public getRowId: GetRowIdFunc = function (params: GetRowIdParams) {
    // the code is unique, so perfect for the id
    return params.data.code;
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/stocks.json')
      .subscribe((data) => {
        // set up a mock server - real code will not do this, it will contact your
        // real server to get what it needs
        var mockServer = createMockServer();
        mockServer.init(data);
        var viewportDatasource = createViewportDatasource(mockServer);
        params.api!.setViewportDatasource(viewportDatasource);
        // put the 'size cols to fit' into a timeout, so that the scroll is taken into consideration
        setTimeout(function () {
          params.api!.sizeColumnsToFit();
        }, 100);
      });
  }
}

class RowIndexRenderer implements ICellRendererComp {
  eGui!: HTMLDivElement;
  init(params: ICellRendererParams) {
    this.eGui = document.createElement('div');
    this.eGui.innerHTML = '' + params.rowIndex;
  }
  refresh(params: ICellRendererParams): boolean {
    return false;
  }
  getGui(): HTMLElement {
    return this.eGui;
  }
}

function numberFormatter(params: ValueFormatterParams) {
  if (typeof params.value === 'number') {
    return params.value.toFixed(2);
  } else {
    return params.value;
  }
}
