import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, Grid, GridOptions } from '@ag-grid-community/core';
import { YearFilter } from './YearFilter';
import { YearFloatingFilter } from './YearFloatingFilter';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MultiFilterModule } from '@ag-grid-enterprise/multi-filter';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ClipboardModule } from '@ag-grid-enterprise/clipboard';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, MultiFilterModule, SetFilterModule, MenuModule, ClipboardModule, FiltersToolPanelModule])

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'athlete', filter: 'agMultiColumnFilter' },
    { field: 'sport', filter: 'agMultiColumnFilter' },
    {
      field: 'year',
      filter: 'agMultiColumnFilter',
      filterParams: {
        filters: [
          {
            filter: YearFilter,
            floatingFilterComponent: YearFloatingFilter,
          },
          {
            filter: 'agNumberColumnFilter',
          },
        ],
      },
    },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 200,
    resizable: true,
    floatingFilter: true,
    menuTabs: ['filterMenuTab'],
  }
}

// setup the grid after the page has finished loading
  var gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions)

  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then(response => response.json())
    .then(data => gridOptions.api!.setRowData(data))
 