import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, FirstDataRenderedEvent, Grid, GridOptions, ITooltipParams } from '@ag-grid-community/core';
import { CustomTooltip } from './customTooltip';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule])

const tooltipValueGetter = (params: ITooltipParams) => ({ value: params.value })

const columnDefs: (ColDef | ColGroupDef)[] = [
  {
    headerName: 'Athletes',
    headerTooltip: 'Athletes',
    tooltipComponent: CustomTooltip,
    children: [
      {
        headerName: 'Athlete Col 1',
        field: 'athlete',
        minWidth: 150,
        headerTooltip: 'Athlete 1',
        tooltipField: 'athlete',
      },
      {
        headerName: 'Athlete Col 2',
        field: 'athlete',
        minWidth: 150,
        headerTooltip: 'Athlete 2',
        tooltipComponent: CustomTooltip,
        tooltipValueGetter: tooltipValueGetter,
      },
    ],
  },
  { field: 'sport', width: 110 },
  { field: 'gold', width: 100 },
  { field: 'silver', width: 100 },
  { field: 'bronze', width: 100 },
  { field: 'total', width: 100 },
]

const gridOptions: GridOptions = {
  defaultColDef: {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  },

  // set rowData to null or undefined to show loading panel by default
  rowData: null,
  columnDefs: columnDefs,

  onFirstDataRendered: onFirstDataRendered,
}

function onFirstDataRendered(params: FirstDataRenderedEvent) {
  params.api.getDisplayedRowAtIndex(0)!.data.athlete = undefined
  params.api.getDisplayedRowAtIndex(1)!.data.athlete = null
  params.api.getDisplayedRowAtIndex(2)!.data.athlete = ''

  params.api.refreshCells()
}

// setup the grid after the page has finished loading
  const gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions)

  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then(response => response.json())
    .then(data => {
      gridOptions.api!.setRowData(data)
    })
 