import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  ColDef,
  Grid,
  GridOptions,
  ModuleRegistry,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { MySimpleEditor } from './mySimpleEditor';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const columnDefs: ColDef[] = [
  { field: 'first_name', headerName: 'First Name', width: 120, editable: true },
  { field: 'last_name', headerName: 'Last Name', width: 120, editable: true },
  {
    field: 'gender',
    width: 100,
    cellEditor: MySimpleEditor,
  },
  {
    field: 'age',
    width: 80,
    cellEditor: MySimpleEditor,
  },
  {
    field: 'mood',
    width: 90,
    cellEditor: MySimpleEditor,
  },
  {
    field: 'country',
    width: 110,
    cellEditor: MySimpleEditor,
  },
  {
    field: 'address',
    width: 502,
    cellEditor: MySimpleEditor,
  },
];

const gridOptions: GridOptions = {
  columnDefs: columnDefs,
  defaultColDef: {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  },
  rowData: getData(),
  onGridReady: (params) => {
    setInterval(() => {
      const instances = gridOptions.api!.getCellEditorInstances();
      if (instances.length > 0) {
        const instance = instances[0] as any;
        if ((instance as MySimpleEditor).myCustomFunction) {
          const result = instance.myCustomFunction();
          console.log(
            `found editing cell: row index = ${result.rowIndex}, column = ${result.colId}.`
          );
        } else {
          console.log(
            'found editing cell, but method myCustomFunction not found, must be the default editor.'
          );
        }
      } else {
        console.log('found not editing cell.');
      }
    }, 2000);
  },
};

// setup the grid after the page has finished loading
const gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);
