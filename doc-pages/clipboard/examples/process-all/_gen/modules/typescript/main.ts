import '@ag-grid-community/core/dist/styles/ag-grid.css';
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ColDef, ColGroupDef, Grid, GridOptions, ProcessDataFromClipboardParams } from '@ag-grid-community/core';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { ClipboardModule } from '@ag-grid-enterprise/clipboard';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, MenuModule, RangeSelectionModule, ClipboardModule])

const columnDefs: ColDef[] = [
  { field: 'a' },
  { field: 'b' },
  { field: 'c' },
  { field: 'd' },
  { field: 'e' },
  { field: 'f' },
  { field: 'g' },
  { field: 'h' },
  { field: 'i' },
  { field: 'j' },
  { field: 'k' },
]

const gridOptions: GridOptions = {
  rowData: getData(),
  columnDefs: columnDefs,
  enableRangeSelection: true,

  defaultColDef: {
    editable: true,
    minWidth: 120,
    resizable: true,
    flex: 1,

    cellClassRules: {
      'cell-green': 'value.startsWith("Green")',
      'cell-blue': 'value.startsWith("Blue")',
      'cell-red': 'value.startsWith("Red")',
      'cell-yellow': 'value.startsWith("Yellow")',
      'cell-orange': 'value.startsWith("Orange")',
      'cell-grey': 'value.startsWith("Grey")',
    },
  },

  processDataFromClipboard: processDataFromClipboard,
}

function processDataFromClipboard(params: ProcessDataFromClipboardParams) {
  var containsRed
  var containsYellow
  var data = params.data

  for (var i = 0; i < data.length; i++) {
    var row = data[i]
    for (var j = 0; j < row.length; j++) {
      var value = row[j]
      if (value) {
        if (value.startsWith('Red')) {
          containsRed = true
        } else if (value.startsWith('Yellow')) {
          containsYellow = true
        }
      }
    }
  }

  if (containsRed) {
    // replace the paste request with another
    return [
      ['Orange', 'Orange'],
      ['Grey', 'Grey'],
    ]
  }

  if (containsYellow) {
    // cancels the paste
    return null
  }

  return data
}

// setup the grid after the page has finished loading
  var gridDiv = document.querySelector<HTMLElement>('#myGrid')!
  new Grid(gridDiv, gridOptions)
 