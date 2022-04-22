import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  ColDef,
  Grid,
  GridOptions,
  IFiltersToolPanel,
  ISetFilter,
  ModuleRegistry,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  SetFilterModule,
  MenuModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
]);

const columnDefs: ColDef[] = [
  { field: 'athlete', filter: 'agSetColumnFilter' },
];

const gridOptions: GridOptions = {
  columnDefs: columnDefs,
  defaultColDef: {
    flex: 1,
    minWidth: 150,
    filter: true,
    sortable: true,
  },
  sideBar: 'filters',
  onGridReady: (params) => {
    ((params.api.getToolPanelInstance(
      'filters'
    ) as any) as IFiltersToolPanel).expandFilters();
  },
};

let savedMiniFilterText: string | null = '';

function getMiniFilterText() {
  const athleteFilter = gridOptions.api!.getFilterInstance(
    'athlete'
  ) as ISetFilter;
  console.log(athleteFilter.getMiniFilter());
}

function saveMiniFilterText() {
  const athleteFilter = gridOptions.api!.getFilterInstance(
    'athlete'
  ) as ISetFilter;
  savedMiniFilterText = athleteFilter.getMiniFilter();
}

function restoreMiniFilterText() {
  const athleteFilter = gridOptions.api!.getFilterInstance(
    'athlete'
  ) as ISetFilter;
  athleteFilter.setMiniFilter(savedMiniFilterText);
}

function resetFilter() {
  const athleteFilter = gridOptions.api!.getFilterInstance(
    'athlete'
  ) as ISetFilter;
  athleteFilter.setModel(null);
  gridOptions.api!.onFilterChanged();
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));

if (typeof window !== 'undefined') {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).getMiniFilterText = getMiniFilterText;
  (<any>window).saveMiniFilterText = saveMiniFilterText;
  (<any>window).restoreMiniFilterText = restoreMiniFilterText;
  (<any>window).resetFilter = resetFilter;
}
