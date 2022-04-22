import {
  ColDef,
  GridReadyEvent,
  StatusPanelDef,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { Component } from '@angular/core';
import { ClickableStatusBarComponent } from './clickable-status-bar-component.component';
import { CountStatusBarComponent } from './count-status-bar-component.component';
// Required feature modules are registered in app.module.ts

@Component({
  selector: 'my-app',
  template: `<ag-grid-angular
    style="width: 100%; height: 100%;"
    class="ag-theme-alpine"
    [columnDefs]="columnDefs"
    [defaultColDef]="defaultColDef"
    [rowData]="rowData"
    [enableRangeSelection]="true"
    [rowSelection]="rowSelection"
    [statusBar]="statusBar"
    (gridReady)="onGridReady($event)"
  ></ag-grid-angular> `,
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    {
      field: 'row',
    },
    {
      field: 'name',
    },
  ];
  public defaultColDef: ColDef = {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  };
  public rowData: any[] | null = [
    { row: 'Row 1', name: 'Michael Phelps' },
    { row: 'Row 2', name: 'Natalie Coughlin' },
    { row: 'Row 3', name: 'Aleksey Nemov' },
    { row: 'Row 4', name: 'Alicia Coutts' },
    { row: 'Row 5', name: 'Missy Franklin' },
    { row: 'Row 6', name: 'Ryan Lochte' },
    { row: 'Row 7', name: 'Allison Schmitt' },
    { row: 'Row 8', name: 'Natalie Coughlin' },
    { row: 'Row 9', name: 'Ian Thorpe' },
    { row: 'Row 10', name: 'Bob Mill' },
    { row: 'Row 11', name: 'Willy Walsh' },
    { row: 'Row 12', name: 'Sarah McCoy' },
    { row: 'Row 13', name: 'Jane Jack' },
    { row: 'Row 14', name: 'Tina Wills' },
  ];
  public rowSelection = 'multiple';
  public statusBar: {
    statusPanels: StatusPanelDef[];
  } = {
    statusPanels: [
      {
        statusPanel: CountStatusBarComponent,
      },
      {
        statusPanel: ClickableStatusBarComponent,
      },
      {
        statusPanel: 'agAggregationComponent',
        statusPanelParams: {
          aggFuncs: ['count', 'sum'],
        },
      },
    ],
  };

  onGridReady(params: GridReadyEvent) {
    params.api.sizeColumnsToFit();
  }
}
