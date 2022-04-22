import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  ColDef,
  Grid,
  GridOptions,
  ModuleRegistry,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowGroupingModule,
  FiltersToolPanelModule,
  MenuModule,
  SetFilterModule,
]);
const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'country', rowGroup: true, enableRowGroup: true },
    { field: 'year', pivot: true, enablePivot: true },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold', aggFunc: 'sum' },
    { field: 'silver', aggFunc: 'sum' },
    { field: 'bronze', aggFunc: 'sum' },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 150,
    filter: true,
    floatingFilter: true,
    sortable: true,
    resizable: true,
  },
  processSecondaryColDef: (colDef: ColDef) => {
    colDef.filter = 'agNumberColumnFilter';
    colDef.floatingFilter = true;
  },
  pivotMode: true,
  sideBar: 'filters',
};

function clearFilter() {
  gridOptions.api!.setFilterModel(null);
}

function filterUsRussiaAustralia() {
  gridOptions.api!.setFilterModel({
    ...gridOptions.api!.getFilterModel(),
    country: {
      type: 'set',
      values: ['United States', 'Russia', 'Australia'],
    },
  });
}

function filterCanadaNorwayChinaZimbabweNetherlands() {
  gridOptions.api!.setFilterModel({
    ...gridOptions.api!.getFilterModel(),
    country: {
      type: 'set',
      values: ['Canada', 'Norway', 'China', 'Zimbabwe', 'Netherlands'],
    },
  });
}

function filter20042006() {
  gridOptions.api!.setFilterModel({
    ...gridOptions.api!.getFilterModel(),
    year: {
      type: 'set',
      values: ['2004', '2006'],
    },
  });
}

function filter200820102012() {
  gridOptions.api!.setFilterModel({
    ...gridOptions.api!.getFilterModel(),
    year: {
      type: 'set',
      values: ['2008', '2010', '2012'],
    },
  });
}

function filterClearYears() {
  gridOptions.api!.setFilterModel({
    ...gridOptions.api!.getFilterModel(),
    year: undefined,
  });
}

function filterSwimmingHockey() {
  gridOptions.api!.setFilterModel({
    ...gridOptions.api!.getFilterModel(),
    sport: {
      type: 'set',
      values: ['Swimming', 'Hockey'],
    },
  });
}

function filterHockeyIceHockey() {
  gridOptions.api!.setFilterModel({
    ...gridOptions.api!.getFilterModel(),
    sport: {
      type: 'set',
      values: ['Hockey', 'Ice Hockey'],
    },
  });
}

function filterEveryYearGold() {
  const goldPivotCols = gridOptions
    .columnApi!.getSecondaryColumns()!
    .filter((col) => col.getColDef().pivotValueColumn!.getColId() === 'gold');
  if (goldPivotCols) {
    const newOpts = goldPivotCols.reduce((acc, col) => {
      acc[col.getId()] = {
        filter: 0,
        filterType: 'number',
        type: 'greaterThan',
      };
      return acc;
    }, gridOptions.api!.getFilterModel() || {});
    gridOptions.api!.setFilterModel(newOpts);
  }
}

function filter2000Silver() {
  const targetCol = gridOptions.columnApi!.getSecondaryPivotColumn(
    ['2000'],
    'silver'
  );
  if (targetCol) {
    gridOptions.api!.setFilterModel({
      ...gridOptions.api!.getFilterModel(),
      [targetCol.getId()]: {
        filterType: 'number',
        type: 'notBlank',
      },
    });
  }
}

// setup the grid after the page has finished loading
const gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));

if (typeof window !== 'undefined') {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).clearFilter = clearFilter;
  (<any>window).filterUsRussiaAustralia = filterUsRussiaAustralia;
  (<any>(
    window
  )).filterCanadaNorwayChinaZimbabweNetherlands = filterCanadaNorwayChinaZimbabweNetherlands;
  (<any>window).filter20042006 = filter20042006;
  (<any>window).filter200820102012 = filter200820102012;
  (<any>window).filterClearYears = filterClearYears;
  (<any>window).filterSwimmingHockey = filterSwimmingHockey;
  (<any>window).filterHockeyIceHockey = filterHockeyIceHockey;
  (<any>window).filterEveryYearGold = filterEveryYearGold;
  (<any>window).filter2000Silver = filter2000Silver;
}
