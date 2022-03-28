import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, FirstDataRenderedEvent, Grid, GridOptions, IFiltersToolPanel, KeyCreatorParams, SideBarDef, ValueFormatterParams } from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, SetFilterModule, MenuModule, ColumnsToolPanelModule, FiltersToolPanelModule])

const gridOptions: GridOptions = {
  columnDefs: [
    {
      headerName: 'Country (Complex Object)',
      field: 'country',
      keyCreator: countryKeyCreator,
      valueFormatter: countryValueFormatter,
      filter: 'agSetColumnFilter',
    },
  ],
  defaultColDef: {
    flex: 1,
    floatingFilter: true,
  },
  sideBar: 'filters',
  onFirstDataRendered: onFirstDataRendered,
}

function countryKeyCreator(params: KeyCreatorParams) {
  var countryObject = params.value
  return countryObject.name
}

function countryValueFormatter(params: ValueFormatterParams) {
  return params.value.name
}

function printFilterModel() {
  var filterModel = gridOptions.api!.getFilterModel()
  console.log(filterModel)
}

function onFirstDataRendered(params: FirstDataRenderedEvent) {
  ((params.api.getToolPanelInstance(
    'filters'
  ) as any) as IFiltersToolPanel).expandFilters()
}

// setup the grid after the page has finished loading
  var gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions)

  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then(response => response.json())
    .then(function (data) {
      // hack the data, replace each country with an object of country name and code
      data.forEach(function (row: any) {
        var countryName = row.country
        var countryCode = countryName.substring(0, 2).toUpperCase()
        row.country = {
          name: countryName,
          code: countryCode,
        }
      })

      gridOptions.api!.setRowData(data)
    })
 

if (typeof window !== 'undefined') {
// Attach external event handlers to window so they can be called from index.html
 (<any>window).printFilterModel = printFilterModel;
}