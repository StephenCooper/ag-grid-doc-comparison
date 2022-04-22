import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  ColDef,
  Grid,
  GridOptions,
  ModuleRegistry,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const columnDefs: ColDef[] = [
  { headerName: 'Athlete Name', field: 'athlete', suppressMenu: true },
  { field: 'age', sortable: false },
  { field: 'country', suppressMenu: true },
  { field: 'year', sortable: false },
  { field: 'date', suppressMenu: true, sortable: false },
  { field: 'sport', sortable: false },
  { field: 'gold' },
  { field: 'silver', sortable: false },
  { field: 'bronze', suppressMenu: true },
  { field: 'total', sortable: false },
];

const gridOptions: GridOptions = {
  columnDefs: columnDefs,
  rowData: null,
  suppressMenuHide: true,
  defaultColDef: {
    sortable: true,
    resizable: true,
    filter: true,
    width: 150,
    headerComponentParams: {
      menuIcon: 'fa-bars',
      template: `<div class="ag-cell-label-container" role="presentation">  
                    <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>  
                    <div ref="eLabel" class="ag-header-cell-label" role="presentation">    
                        <span ref="eSortOrder" class="ag-header-icon ag-sort-order" ></span>    
                        <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon" ></span>    
                        <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon" ></span>    
                        <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon" ></span>    
                        ** <span ref="eText" class="ag-header-cell-text" role="columnheader"></span>    
                        <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>  
                    </div>
                </div>`,
    },
  },
};

// setup the grid after the page has finished loading
const gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));
