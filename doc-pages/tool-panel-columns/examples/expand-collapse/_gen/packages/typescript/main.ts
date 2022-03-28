import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, Grid, GridOptions, IColumnToolPanel, SideBarDef } from 'ag-grid-community';

const columnDefs: ColGroupDef[] = [
  {
    groupId: 'athleteGroupId',
    headerName: 'Athlete',
    children: [
      {
        headerName: 'Name',
        field: 'athlete',
        minWidth: 200,
        filter: 'agTextColumnFilter',
      },
      {
        groupId: 'competitionGroupId',
        headerName: 'Competition',
        children: [{ field: 'year' }, { field: 'date', minWidth: 180 }],
      },
    ],
  },
  {
    groupId: 'medalsGroupId',
    headerName: 'Medals',
    children: [
      { field: 'gold' },
      { field: 'silver' },
      { field: 'bronze' },
      { field: 'total' },
    ],
  },
]

const gridOptions: GridOptions = {
  columnDefs: columnDefs,
  defaultColDef: {
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
  },
  sideBar: 'columns',
  onGridReady: function (params) {
    var columnToolPanel = (gridOptions.api!.getToolPanelInstance(
      'columns'
    ) as unknown) as IColumnToolPanel
    columnToolPanel.collapseColumnGroups()
  },
}

function expandAllGroups() {
  var columnToolPanel = (gridOptions.api!.getToolPanelInstance(
    'columns'
  ) as unknown) as IColumnToolPanel
  columnToolPanel.expandColumnGroups()
}

function collapseAllGroups() {
  var columnToolPanel = (gridOptions.api!.getToolPanelInstance(
    'columns'
  ) as unknown) as IColumnToolPanel
  columnToolPanel.collapseColumnGroups()
}

function expandAthleteAndCompetitionGroups() {
  var columnToolPanel = (gridOptions.api!.getToolPanelInstance(
    'columns'
  ) as unknown) as IColumnToolPanel
  columnToolPanel.expandColumnGroups(['athleteGroupId', 'competitionGroupId'])
}

function collapseCompetitionGroups() {
  var columnToolPanel = (gridOptions.api!.getToolPanelInstance(
    'columns'
  ) as unknown) as IColumnToolPanel
  columnToolPanel.collapseColumnGroups(['competitionGroupId'])
}

// setup the grid after the page has finished loading
  var gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions)

  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then(response => response.json())
    .then(data => gridOptions.api!.setRowData(data))
 

if (typeof window !== 'undefined') {
// Attach external event handlers to window so they can be called from index.html
 (<any>window).expandAllGroups = expandAllGroups;
 (<any>window).collapseAllGroups = collapseAllGroups;
 (<any>window).expandAthleteAndCompetitionGroups = expandAthleteAndCompetitionGroups;
 (<any>window).collapseCompetitionGroups = collapseCompetitionGroups;
}