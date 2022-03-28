import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, GetGroupRowAggParams, Grid, GridOptions, SideBarDef } from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule, MenuModule, ColumnsToolPanelModule, FiltersToolPanelModule, SetFilterModule])

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'country', rowGroup: true, hide: true },
    { field: 'year', rowGroup: true, hide: true },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { headerName: 'Gold*pi', field: 'goldPi', minWidth: 200 },
    { headerName: 'Silver*pi', field: 'silverPi', minWidth: 200 },
    { headerName: 'Bronze*pi', field: 'bronzePi', minWidth: 200 },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 150,
    filter: true,
    sortable: true,
  },
  autoGroupColumnDef: {
    headerName: 'Athlete',
    field: 'athlete',
    minWidth: 250,
  },
  sideBar: true,
  enableRangeSelection: true,
  getGroupRowAgg: getGroupRowAgg,
}

function getGroupRowAgg(params: GetGroupRowAggParams) {
  const result = {
    gold: 0,
    silver: 0,
    bronze: 0,
    goldPi: 0,
    silverPi: 0,
    bronzePi: 0,
  }

  params.nodes.forEach(node => {
    const data = node.group ? node.aggData : node.data

    if (typeof data.gold === 'number') {
      result.gold += data.gold
      result.goldPi += data.gold * Math.PI
    }

    if (typeof data.silver === 'number') {
      result.silver += data.silver
      result.silverPi += data.silver * Math.PI
    }

    if (typeof data.bronze === 'number') {
      result.bronze += data.bronze
      result.bronzePi += data.bronze * Math.PI
    }
  })

  return result
}

function expandAll() {
  gridOptions.api!.expandAll()
}

function collapseAll() {
  gridOptions.api!.collapseAll()
}

// setup the grid after the page has finished loading
  const gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions)

  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then(response => response.json())
    .then(data => gridOptions.api!.setRowData(data))
 

if (typeof window !== 'undefined') {
// Attach external event handlers to window so they can be called from index.html
 (<any>window).expandAll = expandAll;
 (<any>window).collapseAll = collapseAll;
}