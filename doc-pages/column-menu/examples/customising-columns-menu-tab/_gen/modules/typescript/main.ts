import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, Grid, GridOptions } from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, MenuModule, ColumnsToolPanelModule])

const columnDefs: ColGroupDef[] = [
  {
    groupId: 'athleteGroupId',
    headerName: 'Athlete',
    children: [
      {
        headerName: 'Name',
        field: 'athlete',
        minWidth: 200,
        columnsMenuParams: {
          // hides the Column Filter section
          suppressColumnFilter: true,

          // hides the Select / Un-select all widget
          suppressColumnSelectAll: true,

          // hides the Expand / Collapse all widget
          suppressColumnExpandAll: true,
        },
      },
      {
        field: 'age',
        minWidth: 200,
        columnsMenuParams: {
          // contracts all column groups
          contractColumnSelection: true,
        },
      },
    ],
  },
  {
    groupId: 'medalsGroupId',
    headerName: 'Medals',
    children: [{ field: 'gold' }, { field: 'silver' }, { field: 'bronze' }],
  },
]

const gridOptions: GridOptions = {
  columnDefs: columnDefs,
  defaultColDef: {
    flex: 1,
    resizable: true,
    menuTabs: ['columnsMenuTab'],
    columnsMenuParams: {
      // suppresses updating the layout of columns as they are rearranged in the grid
      suppressSyncLayoutWithGrid: true,
    },
  },
}

// setup the grid after the page has finished loading
  const gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions)

  fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    .then(response => response.json())
    .then(data => gridOptions.api!.setRowData(data))
 