import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  Grid,
  GridOptions,
  ICellRendererComp,
  ICellRendererParams,
  IsFullWidthRowParams,
  ModuleRegistry,
  RowHeightParams,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { FullWidthCellRenderer } from './fullWidthCellRenderer';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

class CountryCellRenderer implements ICellRendererComp {
  eGui!: HTMLElement;

  init(params: ICellRendererParams) {
    const flag = `<img border="0" width="15" height="10" src="https://www.ag-grid.com/example-assets/flags/${params.data.code}.png">`;

    const eTemp = document.createElement('div');
    eTemp.innerHTML = `<span style="cursor: default;">${flag} ${params.value}</span>`;
    this.eGui = eTemp.firstElementChild as HTMLElement;
  }

  getGui() {
    return this.eGui;
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }
}

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'name', cellRenderer: CountryCellRenderer },
    { field: 'continent' },
    { field: 'language' },
  ],
  defaultColDef: {
    flex: 1,
    sortable: true,
    resizable: true,
    filter: true,
  },
  rowData: getData(),
  getRowHeight: function (params: RowHeightParams) {
    // return 100px height for full width rows
    if (isFullWidth(params.data)) {
      return 100;
    }
  },
  isFullWidthRow: function (params: IsFullWidthRowParams) {
    return isFullWidth(params.rowNode.data);
  },
  // see AG Grid docs cellRenderer for details on how to build cellRenderers
  fullWidthCellRenderer: FullWidthCellRenderer,
};

function isFullWidth(data: any) {
  // return true when country is Peru, France or Italy
  return ['Peru', 'France', 'Italy'].indexOf(data.name) >= 0;
}

// setup the grid after the page has finished loading
const gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);
