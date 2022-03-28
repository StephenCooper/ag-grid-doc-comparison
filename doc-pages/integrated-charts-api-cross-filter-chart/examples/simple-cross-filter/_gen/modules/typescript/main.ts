import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css";
import { ColDef, ColGroupDef, FirstDataRenderedEvent, Grid, GridOptions } from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { GridChartsModule } from '@ag-grid-enterprise/charts';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MultiFilterModule } from '@ag-grid-enterprise/multi-filter';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, MenuModule, GridChartsModule, SetFilterModule, MultiFilterModule, FiltersToolPanelModule, ColumnsToolPanelModule])

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'salesRep', chartDataType: 'category' },
    { field: 'handset', chartDataType: 'category' },
    { field: 'sale', chartDataType: 'series' },
    { field: 'saleDate', chartDataType: 'category' },
  ],
  defaultColDef: {
    flex: 1,
    sortable: true,
    filter: 'agSetColumnFilter',
    floatingFilter: true,
    resizable: true,
  },
  rowData: getData(),
  enableCharts: true,
  chartThemes: ['ag-default-dark'],
  onFirstDataRendered: onFirstDataRendered,
}

function onFirstDataRendered(params: FirstDataRenderedEvent) {
  params.api.createCrossFilterChart({
    chartType: 'pie',
    cellRange: {
      columns: ['salesRep', 'sale'],
    },
    aggFunc: 'sum',
    chartThemeOverrides: {
      common: {
        title: {
          enabled: true,
          text: 'Sales by Representative ($)',
        },
      },
      pie: {
        series: {
          title: {
            enabled: false,
          },
          label: {
            enabled: false,
          },
        },
      },
    },
    chartContainer: document.querySelector('#pieChart') as any,
  })
}

// setup the grid after the page has finished loading
  var gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions)
 