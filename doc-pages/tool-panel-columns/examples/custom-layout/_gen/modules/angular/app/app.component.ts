import {
  ColDef,
  ColGroupDef,
  GridApi,
  GridReadyEvent,
  IColumnToolPanel,
  SideBarDef,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
// Required feature modules are registered in app.module.ts

@Component({
  selector: 'my-app',
  template: `<div class="example-wrapper">
    <div>
      <span class="button-group">
        <button (click)="setCustomSortLayout()">Custom Sort Layout</button>
        <button (click)="setCustomGroupLayout()">Custom Group Layout</button>
      </span>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 100%;"
      class="ag-theme-alpine"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [sideBar]="sideBar"
      [rowData]="rowData"
      (gridReady)="onGridReady($event)"
    ></ag-grid-angular>
  </div> `,
})
export class AppComponent {
  private gridApi!: GridApi;

  public columnDefs: (ColDef | ColGroupDef)[] = [
    {
      headerName: 'Athlete',
      children: [
        {
          headerName: 'Name',
          field: 'athlete',
          minWidth: 200,
          filter: 'agTextColumnFilter',
        },
        { field: 'age' },
        { field: 'country', minWidth: 200 },
      ],
    },
    {
      headerName: 'Competition',
      children: [{ field: 'year' }, { field: 'date', minWidth: 180 }],
    },
    { colId: 'sport', field: 'sport', minWidth: 200 },
    {
      headerName: 'Medals',
      children: [
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
      ],
    },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    // allow every column to be aggregated
    enableValue: true,
    // allow every column to be grouped
    enableRowGroup: true,
    // allow every column to be pivoted
    enablePivot: true,
    filter: true,
    sortable: true,
    resizable: true,
  };
  public sideBar: SideBarDef | string | string[] | boolean | null = {
    toolPanels: [
      {
        id: 'columns',
        labelDefault: 'Columns',
        labelKey: 'columns',
        iconKey: 'columns',
        toolPanel: 'agColumnsToolPanel',
        toolPanelParams: {
          // prevents custom layout changing when columns are reordered in the grid
          suppressSyncLayoutWithGrid: true,
          // prevents columns being reordered from the columns tool panel
          suppressColumnMove: true,
        },
      },
    ],
    defaultToolPanel: 'columns',
  };
  public rowData!: any[];

  constructor(private http: HttpClient) {}

  setCustomSortLayout() {
    var columnToolPanel = (this.gridApi.getToolPanelInstance(
      'columns'
    ) as unknown) as IColumnToolPanel;
    columnToolPanel!.setColumnLayout(sortedToolPanelColumnDefs);
  }

  setCustomGroupLayout() {
    var columnToolPanel = (this.gridApi.getToolPanelInstance(
      'columns'
    ) as unknown) as IColumnToolPanel;
    columnToolPanel.setColumnLayout(customToolPanelColumnDefs);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;

    this.http
      .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .subscribe((data) => (this.rowData = data));
  }
}

var sortedToolPanelColumnDefs = [
  {
    headerName: 'Athlete',
    children: [
      { field: 'age' },
      { field: 'country' },
      { headerName: 'Name', field: 'athlete' },
    ],
  },
  {
    headerName: 'Competition',
    children: [{ field: 'date' }, { field: 'year' }],
  },
  {
    headerName: 'Medals',
    children: [
      { field: 'bronze' },
      { field: 'gold' },
      { field: 'silver' },
      { field: 'total' },
    ],
  },
  { colId: 'sport', field: 'sport' },
];
var customToolPanelColumnDefs = [
  {
    headerName: 'Dummy Group 1',
    children: [
      { field: 'age' },
      { headerName: 'Name', field: 'athlete' },
      {
        headerName: 'Dummy Group 2',
        children: [{ colId: 'sport' }, { field: 'country' }],
      },
    ],
  },
  {
    headerName: 'Medals',
    children: [
      { field: 'total' },
      { field: 'bronze' },
      {
        headerName: 'Dummy Group 3',
        children: [{ field: 'silver' }, { field: 'gold' }],
      },
    ],
  },
];
