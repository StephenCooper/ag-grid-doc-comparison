import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "@ag-grid-community/vue3";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { MasterDetailModule } from "@ag-grid-enterprise/master-detail";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { createApp } from "vue";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MasterDetailModule,
  MenuModule,
  ColumnsToolPanelModule,
]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <div style="display: flex; flex-direction: column; height: 100%;">
                <div style="padding-bottom: 4px;">
                    <button v-on:click="flashMilaSmithOnly()">Flash Mila Smith</button>
                    <button v-on:click="flashAll()">Flash All</button>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :masterDetail="true"
                :detailRowHeight="detailRowHeight"
                :detailCellRendererParams="detailCellRendererParams"
                :getRowId="getRowId"
                :defaultColDef="defaultColDef"
                :rowData="rowData"
                @first-data-rendered="onFirstDataRendered"></ag-grid-vue>
            </div>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: "name", cellRenderer: "agGroupCellRenderer" },
        { field: "account" },
        { field: "calls" },
        { field: "minutes", valueFormatter: "x.toLocaleString() + 'm'" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        editable: true,
        resizable: true,
      },
      detailRowHeight: null,
      detailCellRendererParams: null,
      getRowId: null,
      rowData: null,
    };
  },
  created() {
    this.detailRowHeight = 200;
    this.detailCellRendererParams = {
      detailGridOptions: {
        columnDefs: [
          { field: "callId" },
          { field: "direction" },
          { field: "number", minWidth: 150 },
          { field: "duration", valueFormatter: "x.toLocaleString() + 's'" },
          { field: "switchCode", minWidth: 150 },
        ],
        defaultColDef: {
          flex: 1,
          editable: true,
          resizable: true,
        },
      },
      getDetailRowData: (params) => {
        params.successCallback(params.data.callRecords);
      },
    };
    this.getRowId = (params) => {
      // use 'account' as the row ID
      return params.data.account;
    };
  },
  methods: {
    onFirstDataRendered(params) {
      // expand the first two rows
      setTimeout(function () {
        params.api.forEachNode(function (node) {
          node.setExpanded(true);
        });
      }, 0);
    },
    flashMilaSmithOnly() {
      // flash Mila Smith - we know her account is 177001 and we use the account for the row ID
      var detailGrid = this.gridApi.getDetailGridInfo("detail_177001");
      if (detailGrid) {
        detailGrid.api.flashCells();
      }
    },
    flashAll() {
      this.gridApi.forEachDetailGridInfo(function (detailGridApi) {
        detailGridApi.api.flashCells();
      });
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => {
        this.rowData = data;
      };

      fetch("https://www.ag-grid.com/example-assets/master-detail-data.json")
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

createApp(VueExample).mount("#app");
