import {
  ColDef,
  Grid,
  GridOptions,
  IServerSideDatasource,
  ModuleRegistry,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ServerSideRowModelModule, RowGroupingModule]);
declare var FakeServer: any;
const columnDefs: ColDef[] = [
  // here we are using a valueGetter to get the country name from the complex object
  {
    colId: 'country',
    valueGetter: 'data.country.name',
    rowGroup: true,
    hide: true,
  },

  { field: 'gold', aggFunc: 'sum' },
  { field: 'silver', aggFunc: 'sum' },
  { field: 'bronze', aggFunc: 'sum' },
];

const gridOptions: GridOptions = {
  columnDefs: columnDefs,
  defaultColDef: {
    flex: 1,
    minWidth: 150,
    resizable: true,
    sortable: true,
  },
  autoGroupColumnDef: {
    flex: 1,
    minWidth: 280,
  },
  // use the server-side row model
  rowModelType: 'serverSide',
  serverSideStoreType: 'partial',

  animateRows: true,
  suppressAggFuncInHeader: true,
  // debug: true,
};

function getServerSideDatasource(server: any): IServerSideDatasource {
  return {
    getRows: (params) => {
      console.log('[Datasource] - rows requested by grid: ', params.request);

      var response = server.getData(params.request);

      // convert country to a complex object
      var resultsWithComplexObjects = response.rows.map(function (row: any) {
        row.country = {
          name: row.country,
          code: row.country.substring(0, 3).toUpperCase(),
        };
        return row;
      });

      // adding delay to simulate real server call
      setTimeout(function () {
        if (response.success) {
          // call the success callback
          params.success({
            rowData: resultsWithComplexObjects,
            rowCount: response.lastRow,
          });
        } else {
          // inform the grid request failed
          params.fail();
        }
      }, 200);
    },
  };
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
  .then((response) => response.json())
  .then(function (data) {
    // setup the fake server with entire dataset
    var fakeServer = new FakeServer(data);

    // create datasource with a reference to the fake server
    var datasource = getServerSideDatasource(fakeServer);

    // register the datasource with the grid
    gridOptions.api!.setServerSideDatasource(datasource);
  });
