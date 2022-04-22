import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import {
  Grid,
  GridOptions,
  IDetailCellRendererParams,
  IServerSideDatasource,
  IServerSideGetRowsRequest,
  ModuleRegistry,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { MasterDetailModule } from '@ag-grid-enterprise/master-detail';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ServerSideRowModelModule,
  ClientSideRowModelModule,
  MasterDetailModule,
  MenuModule,
  ColumnsToolPanelModule,
]);

const gridOptions: GridOptions = {
  columnDefs: [
    // group cell renderer needed for expand / collapse icons
    { field: 'accountId', cellRenderer: 'agGroupCellRenderer' },
    { field: 'name' },
    { field: 'country' },
    { field: 'calls' },
    { field: 'totalDuration' },
  ],
  defaultColDef: {
    flex: 1,
  },

  animateRows: true,

  // use the server-side row model
  rowModelType: 'serverSide',
  serverSideStoreType: 'partial',

  // enable master detail
  masterDetail: true,

  detailCellRendererParams: {
    detailGridOptions: {
      columnDefs: [
        { field: 'callId' },
        { field: 'direction' },
        { field: 'duration', valueFormatter: "x.toLocaleString() + 's'" },
        { field: 'switchCode', minWidth: 150 },
        { field: 'number', minWidth: 180 },
      ],
      defaultColDef: {
        flex: 1,
      },
    },
    getDetailRowData: function (params) {
      // supply details records to detail cell renderer (i.e. detail grid)
      params.successCallback(params.data.callRecords);
    },
  } as IDetailCellRendererParams,
  onGridReady: function (params) {
    setTimeout(function () {
      // expand some master row
      var someRow = params.api.getRowNode('1');
      if (someRow) {
        someRow.setExpanded(true);
      }
    }, 1000);
  },
};

function getServerSideDatasource(server: any): IServerSideDatasource {
  return {
    getRows: function (params) {
      // adding delay to simulate real server call
      setTimeout(function () {
        var response = server.getResponse(params.request);

        if (response.success) {
          // call the success callback
          params.success({
            rowData: response.rows,
            rowCount: response.lastRow,
          });
        } else {
          // inform the grid request failed
          params.fail();
        }
      }, 500);
    },
  };
}

function getFakeServer(allData: any) {
  return {
    getResponse: function (request: IServerSideGetRowsRequest) {
      console.log(
        'asking for rows: ' + request.startRow + ' to ' + request.endRow
      );

      // take a slice of the total rows
      var rowsThisPage = allData.slice(request.startRow, request.endRow);

      // if row count is known, it's possible to skip over blocks
      var lastRow = allData.length;

      return {
        success: true,
        rows: rowsThisPage,
        lastRow: lastRow,
      };
    },
  };
}

// setup the grid after the page has finished loading
var gridDiv = document.querySelector<HTMLElement>('#myGrid')!;
new Grid(gridDiv, gridOptions);

fetch('https://www.ag-grid.com/example-assets/call-data.json')
  .then((response) => response.json())
  .then(function (data) {
    var server = getFakeServer(data);
    var datasource = getServerSideDatasource(server);
    gridOptions.api!.setServerSideDatasource(datasource);
  });
