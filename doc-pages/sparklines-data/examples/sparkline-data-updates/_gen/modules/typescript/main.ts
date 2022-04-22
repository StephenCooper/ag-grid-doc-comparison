import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { Grid, GridOptions, ModuleRegistry } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { SparklinesModule } from '@ag-grid-enterprise/sparklines';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, SparklinesModule]);

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'symbol', maxWidth: 120 },
    { field: 'name', minWidth: 250 },
    {
      field: 'change',
      cellRenderer: 'agSparklineCellRenderer',
    },
    {
      field: 'volume',
      type: 'numericColumn',
      maxWidth: 140,
    },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 100,
    resizable: true,
  },
  rowData: getData(),
  rowHeight: 50,
};

var intervalId: any;

function start() {
  if (intervalId) {
    return;
  }

  const updateData = () => {
    const itemsToUpdate: any[] = [];
    gridOptions.api!.forEachNodeAfterFilterAndSort(function (rowNode) {
      const data = rowNode.data;
      const n = data.change.length;
      const v =
        Math.random() > 0.5 ? Number(Math.random()) : -Number(Math.random());
      data.change = [...data.change.slice(1, n), v];
      itemsToUpdate.push(data);
    });
    gridOptions.api!.applyTransaction({ update: itemsToUpdate });
  };

  intervalId = setInterval(updateData, 300);
}

function stop() {
  if (intervalId === undefined) {
    return;
  }
  clearInterval(intervalId);
  intervalId = undefined;
}

// setup the grid after the page has finished loading

var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

if (typeof window !== 'undefined') {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).start = start;
  (<any>window).stop = stop;
}
