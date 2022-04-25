import { ModuleRegistry } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css';
import { AgGridVue } from '@ag-grid-community/vue3';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { ServerSideRowModelModule } from '@ag-grid-enterprise/server-side-row-model';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import { createApp } from 'vue';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ServerSideRowModelModule,
  SetFilterModule,
  MenuModule,
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
                :rowModelType="rowModelType"
                :serverSideStoreType="serverSideStoreType"
                :cacheBlockSize="cacheBlockSize"
                :maxBlocksInCache="maxBlocksInCache"
                :animateRows="true"
                @filter-changed="onFilterChanged"></ag-grid-vue>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        {
          field: 'country',
          filter: 'agSetColumnFilter',
          filterParams: { values: getCountryValuesAsync },
          menuTabs: ['filterMenuTab'],
        },
        {
          field: 'sport',
          filter: 'agSetColumnFilter',
          filterParams: { values: getSportValuesAsync },
          menuTabs: ['filterMenuTab'],
        },
        { field: 'athlete', menuTabs: undefined },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        sortable: true,
        resizable: true,
      },
      rowModelType: null,
      serverSideStoreType: null,
      cacheBlockSize: null,
      maxBlocksInCache: null,
    };
  },
  created() {
    this.rowModelType = 'serverSide';
    this.serverSideStoreType = 'partial';
    this.cacheBlockSize = 100;
    this.maxBlocksInCache = 10;
  },
  methods: {
    onFilterChanged() {
      var countryFilterModel = this.gridApi.getFilterModel()['country'];
      var selected = countryFilterModel && countryFilterModel.values;
      if (!areEqual(selectedCountries, selected)) {
        selectedCountries = selected;
        console.log('Refreshing sports filter');
        var sportFilter = this.gridApi.getFilterInstance('sport');
        sportFilter.refreshFilterValues();
      }
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => {
        // setup the fake server with entire dataset
        fakeServer = new FakeServer(data);
        // create datasource with a reference to the fake server
        var datasource = getServerSideDatasource(fakeServer);
        // register the datasource with the grid
        params.api.setServerSideDatasource(datasource);
      };

      fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

window.areEqual = function areEqual(a, b) {
  if (a == null && b == null) {
    return true;
  }
  if (a != null || b != null) {
    return false;
  }
  return (
    a.length === b.length &&
    a.every(function (v, i) {
      return b[i] === v;
    })
  );
};

window.getCountryValuesAsync = function getCountryValuesAsync(params) {
  var countries = fakeServer.getCountries();
  // simulating real server call with a 500ms delay
  setTimeout(function () {
    params.success(countries);
  }, 500);
};

window.getSportValuesAsync = function getSportValuesAsync(params) {
  var sports = fakeServer.getSports(selectedCountries);
  // simulating real server call with a 500ms delay
  setTimeout(function () {
    params.success(sports);
  }, 500);
};

window.getServerSideDatasource = function getServerSideDatasource(server) {
  return {
    getRows: (params) => {
      console.log('[Datasource] - rows requested by grid: ', params.request);
      // get data for request from our fake server
      var response = server.getData(params.request);
      // simulating real server call with a 500ms delay
      setTimeout(function () {
        if (response.success) {
          // supply rows for requested block to grid
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
};

var fakeServer;

var selectedCountries = null;

createApp(VueExample).mount('#app');
