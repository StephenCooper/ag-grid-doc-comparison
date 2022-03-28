import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, Grid, GridOptions, PostSortRowsParams } from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule])

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'athlete' },
    { field: 'age', width: 100 },
    { field: 'country', sort: 'asc' },
    { field: 'year' },
    { field: 'date' },
    { field: 'sport' },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ],
  defaultColDef: {
    width: 170,
    sortable: true,
  },
  postSortRows: (params: PostSortRowsParams) => {
    const rowNodes = params.nodes;
    // here we put Ireland rows on top while preserving the sort order
    let nextInsertPos = 0
    for (let i = 0; i < rowNodes.length; i++) {
      const country = rowNodes[i].data.country
      if (country === 'Ireland') {
        rowNodes.splice(nextInsertPos, 0, rowNodes.splice(i, 1)[0])
        nextInsertPos++
      }
    }
  },
}

// setup the grid after the page has finished loading
  const gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions)

  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then(response => response.json())
    .then(data => {
      gridOptions.api!.setRowData(data)
    })
 