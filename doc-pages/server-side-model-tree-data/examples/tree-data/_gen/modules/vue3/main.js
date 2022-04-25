import { ModuleRegistry } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css';
import { AgGridVue } from '@ag-grid-community/vue3';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import { createApp } from 'vue';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ServerSideRowModelModule,
  RowGroupingModule,
  MenuModule,
  ColumnsToolPanelModule,
]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine-dark"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :autoGroupColumnDef="autoGroupColumnDef"
                :rowModelType="rowModelType"
                :serverSideStoreType="serverSideStoreType"
                :treeData="true"
                :animateRows="true"
                :isServerSideGroupOpenByDefault="isServerSideGroupOpenByDefault"
                :isServerSideGroup="isServerSideGroup"
                :getServerSideGroupKey="getServerSideGroupKey"></ag-grid-vue>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: 'employeeId', hide: true },
        { field: 'employeeName', hide: true },
        { field: 'jobTitle' },
        { field: 'employmentType' },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        width: 240,
        filter: 'agTextColumnFilter',
        flex: 1,
      },
      autoGroupColumnDef: null,
      rowModelType: null,
      serverSideStoreType: null,
      isServerSideGroupOpenByDefault: null,
      isServerSideGroup: null,
      getServerSideGroupKey: null,
    };
  },
  created() {
    this.autoGroupColumnDef = {
      field: 'employeeName',
      cellRendererParams: {
        innerRenderer: (params) => {
          // display employeeName rather than group key (employeeId)
          return params.data.employeeName;
        },
      },
    };
    this.rowModelType = 'serverSide';
    this.serverSideStoreType = 'partial';
    this.isServerSideGroupOpenByDefault = (params) => {
      // open first two levels by default
      return params.rowNode.level < 2;
    };
    this.isServerSideGroup = (dataItem) => {
      // indicate if node is a group
      return dataItem.group;
    };
    this.getServerSideGroupKey = (dataItem) => {
      // specify which group key to use
      return dataItem.employeeId;
    };
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => {
        var fakeServer = createFakeServer(data);
        var datasource = createServerSideDatasource(fakeServer);
        params.api.setServerSideDatasource(datasource);
      };

      fetch('https://www.ag-grid.com/example-assets/small-tree-data.json')
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

window.createFakeServer = function createFakeServer(fakeServerData) {
  const fakeServer = {
    data: fakeServerData,
    getData: function (request) {
      function extractRowsFromData(groupKeys, data) {
        if (groupKeys.length === 0) {
          return data.map(function (d) {
            return {
              group: !!d.children,
              employeeId: d.employeeId,
              employeeName: d.employeeName,
              employmentType: d.employmentType,
              jobTitle: d.jobTitle,
            };
          });
        }
        var key = groupKeys[0];
        for (var i = 0; i < data.length; i++) {
          if (data[i].employeeId === key) {
            return extractRowsFromData(
              groupKeys.slice(1),
              data[i].children.slice()
            );
          }
        }
      }
      return extractRowsFromData(request.groupKeys, this.data);
    },
  };
  return fakeServer;
};

window.createServerSideDatasource = function createServerSideDatasource(
  fakeServer
) {
  const dataSource = {
    getRows: (params) => {
      console.log('ServerSideDatasource.getRows: params = ', params);
      var allRows = fakeServer.getData(params.request);
      var request = params.request;
      var doingInfinite = request.startRow != null && request.endRow != null;
      var result = doingInfinite
        ? {
            rowData: allRows.slice(request.startRow, request.endRow),
            rowCount: allRows.length,
          }
        : { rowData: allRows };
      console.log('getRows: result = ', result);
      setTimeout(function () {
        params.success(result);
      }, 200);
    },
  };
  return dataSource;
};

createApp(VueExample).mount('#app');
