import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css";
import { AgGridVue } from "@ag-grid-community/vue3";
import { ServerSideRowModelModule } from "@ag-grid-enterprise/server-side-row-model";
import { createApp } from "vue";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ServerSideRowModelModule]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div style="margin-bottom: 5px;">
                    <button v-on:click="onBtAdd()">Add Before Selected Row</button>
                    <button v-on:click="onBtRemove()">Remove Selected Row</button>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine-dark"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowSelection="rowSelection"
                :rowModelType="rowModelType"
                :serverSideStoreType="serverSideStoreType"
                :getRowId="getRowId"></ag-grid-vue>
            </div>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: "athlete", width: 150 },
        { field: "age" },
        { field: "country", width: 150 },
        { field: "year" },
        { field: "sport" },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        width: 100,
        resizable: true,
      },
      rowSelection: null,
      rowModelType: null,
      serverSideStoreType: null,
    };
  },
  created() {
    this.rowSelection = "single";
    this.rowModelType = "serverSide";
    this.serverSideStoreType = "partial";
  },
  methods: {
    onBtRemove() {
      var selectedRows = this.gridApi.getSelectedNodes();
      if (!selectedRows || selectedRows.length === 0) {
        return;
      }
      var selectedRow = selectedRows[0];
      var indexToRemove = window.rowDataServerSide.indexOf(selectedRow.data);
      // the record could be missing, if the user hit the 'remove' button a few times before refresh happens
      if (indexToRemove >= 0) {
        window.rowDataServerSide.splice(indexToRemove, 1);
      }
      this.gridApi.refreshServerSideStore();
    },
    onBtAdd() {
      var selectedRows = this.gridApi.getSelectedNodes();
      if (!selectedRows || selectedRows.length === 0) {
        return;
      }
      var selectedRow = selectedRows[0];
      // insert new row in the source data, at the top of the page
      window.rowDataServerSide.splice(selectedRow.rowIndex, 0, {
        athlete: "New Item" + newItemCount,
        id: "" + Math.random(),
      });
      newItemCount++;
      this.gridApi.refreshServerSideStore();
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => {
        // add id to data
        let idSequence = 0;
        data.forEach(function (item) {
          item.id = idSequence++;
        });
        var datasource = createMyDataSource(data);
        params.api.setServerSideDatasource(datasource);
      };

      fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
    getRowId(params) {
      return params.data.id;
    },
  },
};

window.createMyDataSource = function createMyDataSource(data) {
  window.rowDataServerSide = data;
  const dataSource = {
    getRows: function (params) {
      setTimeout(function () {
        // take a slice of the total rows
        var rowsThisPage = data.slice(
          params.request.startRow,
          params.request.endRow
        );
        // call the success callback
        params.success({
          rowData: rowsThisPage,
          rowCount: window.rowDataServerSide.length,
        });
      }, 500);
    },
  };
  return dataSource;
};

var newItemCount = 0;

createApp(VueExample).mount("#app");
