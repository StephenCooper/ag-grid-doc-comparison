import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  FirstDataRenderedEvent,
  Grid,
  GridOptions,
  ICellRendererParams,
  IFiltersToolPanel,
  ISetFilter,
  ModuleRegistry,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  SetFilterModule,
  MenuModule,
  FiltersToolPanelModule,
]);

const gridOptions: GridOptions = {
  columnDefs: [
    {
      headerName: 'Case Insensitive (default)',
      field: 'colour',
      filter: 'agSetColumnFilter',
      filterParams: {
        caseSensitive: false,
        cellRenderer: colourCellRenderer,
      },
    },
    {
      headerName: 'Case Sensitive',
      field: 'colour',
      filter: 'agSetColumnFilter',
      filterParams: {
        caseSensitive: true,
        cellRenderer: colourCellRenderer,
      },
    },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 225,
    cellRenderer: colourCellRenderer,
    resizable: true,
    floatingFilter: true,
  },
  sideBar: 'filters',
  onFirstDataRendered: onFirstDataRendered,
  rowData: getData(),
};

var FIXED_STYLES =
  'vertical-align: middle; border: 1px solid black; margin: 3px; display: inline-block; width: 10px; height: 10px';

var FILTER_TYPES: Record<string, string> = {
  insensitive: 'colour',
  sensitive: 'colour_1',
};

function colourCellRenderer(params: ICellRendererParams) {
  if (!params.value || params.value === '(Select All)') {
    return params.value;
  }

  return `<div style="background-color: ${params.value.toLowerCase()}; ${FIXED_STYLES}"></div>${
    params.value
  }`;
}

function setModel(type: string) {
  const instance = gridOptions.api!.getFilterInstance(FILTER_TYPES[type])!;

  instance.setModel({ values: MANGLED_COLOURS });
  gridOptions.api!.onFilterChanged();
}

function getModel(type: string) {
  const instance = gridOptions.api!.getFilterInstance(FILTER_TYPES[type])!;

  alert(JSON.stringify(instance.getModel(), null, 2));
}

function setFilterValues(type: string) {
  const instance = gridOptions.api!.getFilterInstance(
    FILTER_TYPES[type]
  ) as ISetFilter;

  instance.setFilterValues(MANGLED_COLOURS);
  instance.applyModel();
  gridOptions.api!.onFilterChanged();
}

function getValues(type: string) {
  const instance = gridOptions.api!.getFilterInstance(
    FILTER_TYPES[type]
  ) as ISetFilter;

  alert(JSON.stringify(instance.getValues(), null, 2));
}

function reset(type: string) {
  const instance = gridOptions.api!.getFilterInstance(
    FILTER_TYPES[type]
  ) as ISetFilter;

  instance.resetFilterValues();
  instance.setModel(null);
  gridOptions.api!.onFilterChanged();
}

var MANGLED_COLOURS = ['ReD', 'OrAnGe', 'WhItE', 'YeLlOw'];

function onFirstDataRendered(params: FirstDataRenderedEvent) {
  ((gridOptions.api!.getToolPanelInstance(
    'filters'
  ) as any) as IFiltersToolPanel).expandFilters();
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

if (typeof window !== 'undefined') {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).setModel = setModel;
  (<any>window).getModel = getModel;
  (<any>window).setFilterValues = setFilterValues;
  (<any>window).getValues = getValues;
  (<any>window).reset = reset;
}
