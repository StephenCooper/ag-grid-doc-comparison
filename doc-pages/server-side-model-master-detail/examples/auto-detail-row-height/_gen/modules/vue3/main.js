import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css';
import { AgGridVue } from '@ag-grid-community/vue3';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { MasterDetailModule } from '@ag-grid-enterprise/master-detail';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import { createApp } from 'vue';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ServerSideRowModelModule,
  ClientSideRowModelModule,
  MasterDetailModule,
  MenuModule,
  ColumnsToolPanelModule,
]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <div style="height: 100%; box-sizing: border-box;">
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine-dark"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :animateRows="true"
                :rowModelType="rowModelType"
                :serverSideStoreType="serverSideStoreType"
                :masterDetail="true"
                :detailRowAutoHeight="true"
                :detailCellRendererParams="detailCellRendererParams"></ag-grid-vue>
            </div>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        {
          field: 'accountId',
          maxWidth: 200,
          cellRenderer: 'agGroupCellRenderer',
        },
        { field: 'name' },
        { field: 'country' },
        { field: 'calls' },
        { field: 'totalDuration' },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
      },
      rowModelType: null,
      serverSideStoreType: null,
      detailCellRendererParams: null,
    };
  },
  created() {
    this.rowModelType = 'serverSide';
    this.serverSideStoreType = 'partial';
    this.detailCellRendererParams = {
      detailGridOptions: {
        columnDefs: [
          { field: 'callId' },
          { field: 'direction' },
          { field: 'duration', valueFormatter: "x.toLocaleString() + 's'" },
          { field: 'switchCode' },
          { field: 'number' },
        ],
        defaultColDef: {
          flex: 1,
        },
      },
      getDetailRowData: (params) => {
        // supply details records to detail cell renderer (i.e. detail grid)
        params.successCallback(params.data.callRecords);
      },
    };
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      setTimeout(function () {
        // expand some master row
        var someRow = params.api.getRowNode('1');
        if (someRow) {
          someRow.setExpanded(true);
        }
      }, 1000);

      const updateData = (data) => {
        // setup the fake server with entire dataset
        var fakeServer = new FakeServer(data);
        // create datasource with a reference to the fake server
        var datasource = getServerSideDatasource(fakeServer);
        // register the datasource with the grid
        params.api.setServerSideDatasource(datasource);
      };

      fetch('https://www.ag-grid.com/example-assets/call-data.json')
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

window.getServerSideDatasource = function getServerSideDatasource(server) {
  return {
    getRows: (params) => {
      console.log('[Datasource] - rows requested by grid: ', params.request);
      var response = server.getData(params.request);
      // adding delay to simulate real server call
      setTimeout(function () {
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
      }, 200);
    },
  };
};

createApp(VueExample).mount('#app');
