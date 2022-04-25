import {
  ColDef,
  GetLocaleTextParams,
  GridReadyEvent,
  ICellRendererComp,
  ICellRendererParams,
  StatusPanelDef,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
// Required feature modules are registered in app.module.ts

@Component({
  selector: 'my-app',
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [sideBar]="true"
    [statusBar]="statusBar"
    [rowGroupPanelShow]="rowGroupPanelShow"
    [pagination]="true"
    [paginationPageSize]="paginationPageSize"
    [enableRangeSelection]="true"
    [enableCharts]="true"
    [getLocaleText]="getLocaleText"
    [rowData]="rowData"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular> `,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    // this row just shows the row index, doesn't use any data from the row
    {
      headerName: '#',
      cellRenderer: NodeIdRenderer,
    },
    {
      field: 'athlete',
      filterParams: { buttons: ['clear', 'reset', 'apply'] },
    },
    {
      field: 'age',
      filterParams: { buttons: ['apply', 'cancel'] },
      enablePivot: true,
    },
    { field: 'country', enableRowGroup: true },
    { field: 'year', filter: 'agNumberColumnFilter' },
    { field: 'date' },
    {
      field: 'sport',
      filter: 'agMultiColumnFilter',
      filterParams: {
        filters: [
          {
            filter: 'agTextColumnFilter',
            display: 'accordion',
          },
          {
            filter: 'agSetColumnFilter',
            display: 'accordion',
          },
        ],
      },
    },
    { field: 'gold', enableValue: true },
    { field: 'silver', enableValue: true },
    { field: 'bronze', enableValue: true },
    { field: 'total', enableValue: true },
  ];
  public defaultColDef: ColDef = {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  };
  public statusBar: {
    statusPanels: StatusPanelDef[];
  } = {
    statusPanels: [
      { statusPanel: 'agTotalAndFilteredRowCountComponent', align: 'left' },
      { statusPanel: 'agAggregationComponent' },
    ],
  };
  public rowGroupPanelShow = 'always';
  public paginationPageSize = 500;
  public getLocaleText: (params: GetLocaleTextParams) => string = (
    params: GetLocaleTextParams
  ) => {
    switch (params.key) {
      case 'thousandSeparator':
        return '.';
      case 'decimalSeparator':
        return ',';
      default:
        return params.defaultValue ? params.defaultValue.toUpperCase() : '';
    }
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent) {
    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => (this.rowData = data));
  }
}

class NodeIdRenderer implements ICellRendererComp {
  eGui!: HTMLElement;

  init(params: ICellRendererParams) {
    this.eGui = document.createElement('div');
    this.eGui.innerHTML = params.node!.id! + 1;
  }

  getGui() {
    return this.eGui;
  }
  refresh() {
    return false;
  }
}
