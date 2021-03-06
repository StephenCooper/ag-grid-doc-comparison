import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import 'ag-grid-enterprise';
import { AgGridVue } from 'ag-grid-vue3';
import { createApp } from 'vue';

const VueExample = {
  template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine-dark"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :animateRows="true"
                :rowModelType="rowModelType"
                :serverSideStoreType="serverSideStoreType"></ag-grid-vue>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: 'athlete', minWidth: 220, filter: 'agTextColumnFilter' },
        {
          field: 'country',
          minWidth: 200,
          filter: 'agSetColumnFilter',
          filterParams: {
            values: [
              'United States',
              'Ireland',
              'United Kingdom',
              'Russia',
              'Australia',
              'Canada',
              'Norway',
            ],
          },
        },
        { field: 'year', filter: 'agNumberColumnFilter' },
        { field: 'sport', minWidth: 200 },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 100,
      },
      rowModelType: null,
      serverSideStoreType: null,
    };
  },
  created() {
    this.rowModelType = 'serverSide';
    this.serverSideStoreType = 'full';
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => {
        // setup the fake server with entire dataset
        var fakeServer = createFakeServer(data);
        // create datasource with a reference to the fake server
        var datasource = createServerSideDatasource(fakeServer);
        // register the datasource with the grid
        params.api.setServerSideDatasource(datasource);
      };

      fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

window.createServerSideDatasource = function createServerSideDatasource(
  server
) {
  return {
    getRows: (params) => {
      console.log(
        '[Datasource] - rows requested by grid: startRow = ' +
          params.request.startRow +
          ', endRow = ' +
          params.request.endRow
      );
      // get data for request from our fake server
      var response = server.getData();
      // simulating real server call with a 500ms delay
      setTimeout(function () {
        if (response.success) {
          // supply rows for requested block to grid
          params.success({ rowData: response.rows });
        } else {
          params.fail();
        }
      }, 1000);
    },
  };
};

window.createFakeServer = function createFakeServer(allData) {
  return {
    getData: () => {
      return {
        success: true,
        rows: allData,
      };
    },
  };
};

createApp(VueExample).mount('#app');
