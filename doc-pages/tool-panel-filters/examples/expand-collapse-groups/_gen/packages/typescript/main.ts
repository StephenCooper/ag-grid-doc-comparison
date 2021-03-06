import {
  ColDef,
  ColGroupDef,
  Grid,
  GridOptions,
  IFiltersToolPanel,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';

const columnDefs: (ColDef | ColGroupDef)[] = [
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
      { field: 'age' },
      {
        groupId: 'competitionGroupId',
        headerName: 'Competition',
        children: [{ field: 'year' }, { field: 'date', minWidth: 180 }],
      },
      { field: 'country', minWidth: 200 },
    ],
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

const gridOptions: GridOptions = {
  columnDefs: columnDefs,
  defaultColDef: {
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  },
  sideBar: 'filters',
  onGridReady: (params) => {
    // initially collapse all filter groups
    ((params.api.getToolPanelInstance(
      'filters'
    ) as any) as IFiltersToolPanel).collapseFilterGroups();
  },
};

function collapseAll() {
  ((gridOptions.api!.getToolPanelInstance(
    'filters'
  ) as any) as IFiltersToolPanel).collapseFilterGroups();
}

function expandAthleteAndCompetition() {
  ((gridOptions.api!.getToolPanelInstance(
    'filters'
  ) as any) as IFiltersToolPanel).expandFilterGroups([
    'athleteGroupId',
    'competitionGroupId',
  ]);
}

function collapseCompetition() {
  ((gridOptions.api!.getToolPanelInstance(
    'filters'
  ) as any) as IFiltersToolPanel).collapseFilterGroups(['competitionGroupId']);
}

function expandAll() {
  ((gridOptions.api!.getToolPanelInstance(
    'filters'
  ) as any) as IFiltersToolPanel).expandFilterGroups();
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));

if (typeof window !== 'undefined') {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).collapseAll = collapseAll;
  (<any>window).expandAthleteAndCompetition = expandAthleteAndCompetition;
  (<any>window).collapseCompetition = collapseCompetition;
  (<any>window).expandAll = expandAll;
}
