import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, Grid, GridOptions, IViewportDatasource, IViewportDatasourceParams } from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ViewportRowModelModule } from '@ag-grid-enterprise/viewport-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ViewportRowModelModule])

const columnDefs: ColDef[] = [
  {
    headerName: 'ID',
    field: 'id',
  },
  {
    headerName: 'Expected Position',
    valueGetter: '"translateY(" + node.rowIndex * 100 + "px)"',
  },

  {
    field: 'a',
  },
  {
    field: 'b',
  },
  {
    field: 'c',
  },
]

const gridOptions: GridOptions = {
  // debug: true,
  rowHeight: 100,
  columnDefs: columnDefs,
  rowModelType: 'viewport',
  viewportDatasource: createViewportDatasource(),
}

// setup the grid after the page has finished loading
  var gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions)

function createViewportDatasource(): IViewportDatasource {
  let initParams: IViewportDatasourceParams;
  return {
    init: (params: IViewportDatasourceParams) => {
      initParams = params
      var oneMillion = 1000 * 1000
      params.setRowCount(oneMillion)
    },
    setViewportRange(
      firstRow: number,
      lastRow: number
    ) {
      var rowData: any = {}

      for (var rowIndex = firstRow; rowIndex <= lastRow; rowIndex++) {
        var item: any = {}
        item.id = rowIndex
        item.a = 'A-' + rowIndex
        item.b = 'B-' + rowIndex
        item.c = 'C-' + rowIndex
        rowData[rowIndex] = item
      }

      initParams.setRowData(rowData)
    },
    destroy: () => { }
  }
} 