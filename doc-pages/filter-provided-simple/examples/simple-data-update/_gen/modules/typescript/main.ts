import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { Grid, GridOptions, ModuleRegistry } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

var filterParams = {
  comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split('/');
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );

    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }

    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }

    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
  },
  browserDatePicker: true,
};

var fetchedData: any[];

const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'athlete' },
    { field: 'age', filter: 'agNumberColumnFilter', maxWidth: 100 },
    {
      field: 'date',
      filter: 'agDateColumnFilter',
      filterParams: filterParams,
    },
    { field: 'total', filter: false },
  ],
  defaultColDef: {
    flex: 1,
    minWidth: 150,
    filter: true,
  },
};

function jumbleData() {
  if (fetchedData) {
    const ages = fetchedData.map((d) => d.age);
    // Force reload by mutating fetched data - jumble the ages.
    const jumbledData = fetchedData.map((d) => {
      const randomAgeIndex = Math.round(Math.random() * (ages.length - 1));
      return { ...d, age: ages.splice(randomAgeIndex, 1)[0] };
    });

    gridOptions.api!.setRowData(jumbledData);
  }
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
  .then((response) => response.json())
  .then((data) => {
    fetchedData = data.slice(0, 9);
    gridOptions.api!.setRowData(fetchedData);
  });

if (typeof window !== 'undefined') {
  // Attach external event handlers to window so they can be called from index.html
  (<any>window).jumbleData = jumbleData;
}
