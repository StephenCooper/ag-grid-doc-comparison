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
                :autoGroupColumnDef="autoGroupColumnDef"
                :getRowId="getRowId"
                :rowModelType="rowModelType"
                :serverSideStoreType="serverSideStoreType"
                :rowSelection="rowSelection"
                :suppressAggFuncInHeader="true"
                :animateRows="true"></ag-grid-vue>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: 'country', rowGroup: true, hide: true },
        { field: 'sport', rowGroup: true, hide: true },
        { headerName: 'Row ID', valueGetter: 'node.id', sortable: false },
        { field: 'gold', aggFunc: 'sum' },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 120,
        resizable: true,
        sortable: true,
      },
      autoGroupColumnDef: null,
      getRowId: null,
      rowModelType: null,
      serverSideStoreType: null,
      rowSelection: null,
    };
  },
  created() {
    this.autoGroupColumnDef = {
      flex: 1,
      minWidth: 280,
      field: 'athlete',
    };
    this.getRowId = (params) => {
      // if leaf level, we have ID
      if (params.data.id != null) {
        return params.data.id;
      }
      // this array will contain items that will compose the unique key
      var parts = [];
      // if parent groups, add the value for the parent group
      if (params.parentKeys) {
        parts.push(...params.parentKeys);
      }
      // it we are a group, add the value for this level's group
      var rowGroupCols = params.columnApi.getRowGroupColumns();
      var thisGroupCol = rowGroupCols[params.level];
      if (thisGroupCol) {
        parts.push(params.data[thisGroupCol.getColDef().field]);
      }
      return parts.join('-');
    };
    this.rowModelType = 'serverSide';
    this.serverSideStoreType = 'partial';
    this.rowSelection = 'multiple';
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => {
        // give an ID to each piece of row data
        data.forEach((item, index) => (item.id = index));
        // setup the fake server with entire dataset
        var fakeServer = new FakeServer(data);
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
      }, 300);
    },
  };
};

createApp(VueExample).mount('#app');
