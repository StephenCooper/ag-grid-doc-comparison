import {
  ColumnApi,
  Grid,
  GridOptions,
  IServerSideDatasource,
  ModuleRegistry,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ServerSideRowModelModule,
  RowGroupingModule,
  MenuModule,
  ColumnsToolPanelModule,
]);
declare var FakeServer: any;
const gridOptions: GridOptions = {
  columnDefs: [
    { field: 'country', rowGroup: true },
    { field: 'year', pivot: true }, // pivot on 'year'
    { field: 'total', aggFunc: 'sum' },
  ],
  defaultColDef: {
    flex: 4,
    minWidth: 100,
    resizable: true,
  },
  autoGroupColumnDef: {
    flex: 5,
    minWidth: 200,
  },

  // use the server-side row model
  rowModelType: 'serverSide',
  serverSideStoreType: 'partial',

  // enable pivoting
  pivotMode: true,

  animateRows: true,
  // debug: true
};

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

function getServerSideDatasource(server: any): IServerSideDatasource {
  return {
    getRows: (params) => {
      console.log('[Datasource] - rows requested by grid: ', params.request);

      // get data for request from our fake server
      var response = server.getData(params.request);

      // add pivot colDefs in the grid based on the resulting data
      addPivotColDefs(response, params.columnApi);

      // simulating real server call with a 500ms delay
      setTimeout(function () {
        if (response.success) {
          // supply data to grid
          params.success({
            rowData: response.rows,
            rowCount: response.lastRow,
          });
        } else {
          params.fail();
        }
      }, 500);
    },
  };
}

function addPivotColDefs(response: any, columnApi: ColumnApi) {
  // check if pivot colDefs already exist
  var existingPivotColDefs = columnApi.getSecondaryColumns();
  if (existingPivotColDefs && existingPivotColDefs.length > 0) {
    return;
  }

  // create colDefs
  var pivotColDefs = response.pivotFields.map(function (field: string) {
    var headerName = field.split('_')[0];
    return { headerName: headerName, field: field };
  });

  // supply secondary columns to the grid
  columnApi.setSecondaryColumns(pivotColDefs);
}
