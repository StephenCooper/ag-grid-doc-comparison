import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, Grid, GridOptions, StatusPanelDef } from 'ag-grid-community';
import { ClickableStatusBarComponent } from './clickableStatusBarComponent';

const columnDefs: ColDef[] = [
  {
    field: 'row',
  },
  {
    field: 'name',
  },
]

function toggleStatusBarComp() {
  const statusBarComponent = gridOptions.api!.getStatusPanel('statusBarCompKey') as any;
  statusBarComponent.setVisible(!statusBarComponent.isVisible())
}

const gridOptions: GridOptions = {
  defaultColDef: {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  },
  columnDefs: columnDefs,
  rowData: [
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
  ],
  enableRangeSelection: true,
  rowSelection: 'multiple',
  statusBar: {
    statusPanels: [
      {
        statusPanel: ClickableStatusBarComponent,
        key: 'statusBarCompKey',
      },
      {
        statusPanel: 'agAggregationComponent',
        statusPanelParams: {
          aggFuncs: ['count', 'sum'],
        },
      },
    ],
  },
}

// setup the grid after the page has finished loading
  const gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions)
  gridOptions.api!.sizeColumnsToFit()
 

if (typeof window !== 'undefined') {
// Attach external event handlers to window so they can be called from index.html
 (<any>window).toggleStatusBarComp = toggleStatusBarComp;
}