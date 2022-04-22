import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  CellKeyDownEvent,
  CellKeyPressEvent,
  ColDef,
  Grid,
  GridOptions,
  ModuleRegistry,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
  SetFilterModule,
]);

const columnDefs: ColDef[] = [
  { field: 'athlete', minWidth: 170 },
  { field: 'age' },
  { field: 'country' },
  { field: 'year' },
  { field: 'date' },
  { field: 'sport' },
  { field: 'gold' },
  { field: 'silver' },
  { field: 'bronze' },
  { field: 'total' },
];

const gridOptions: GridOptions = {
  rowData: null,
  columnDefs: columnDefs,
  defaultColDef: {
    editable: true,
    sortable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    resizable: true,
  },
  onCellKeyDown: onCellKeyDown,
  onCellKeyPress: onCellKeyPress,
};

function onCellKeyDown(e: CellKeyDownEvent) {
  console.log('onCellKeyDown', e);
}

function onCellKeyPress(e: CellKeyPressEvent) {
  console.log('onCellKeyPress', e);
  if (e.event) {
    var keyPressed = (e.event as KeyboardEvent).key;
    console.log('Key Pressed = ' + keyPressed);
    if (keyPressed === 's') {
      var rowNode = e.node;
      var newSelection = !rowNode.isSelected();
      console.log(
        'setting selection on node ' +
          rowNode.data.athlete +
          ' to ' +
          newSelection
      );
      rowNode.setSelected(newSelection);
    }
  }
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
  .then((response) => response.json())
  .then((data) => gridOptions.api!.setRowData(data));
