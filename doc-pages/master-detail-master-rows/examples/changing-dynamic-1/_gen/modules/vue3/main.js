import { createApp } from "vue";
import { AgGridVue } from "@ag-grid-community/vue3";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { MasterDetailModule } from "@ag-grid-enterprise/master-detail";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";

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
                    <button v-on:click="onBtClearMilaCalls()">Clear Mila Calls</button>
                    <button v-on:click="onBtSetMilaCalls()">Set Mila Calls</button>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :masterDetail="true"
                :isRowMaster="isRowMaster"
                :defaultColDef="defaultColDef"
                :getRowId="getRowId"
                :detailCellRendererParams="detailCellRendererParams"
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
      },
      isRowMaster: null,
      getRowId: null,
      detailCellRendererParams: null,
      rowData: null,
    };
  },
  created() {
    this.isRowMaster = (dataItem) => {
      return dataItem ? dataItem.callRecords.length > 0 : false;
    };
    this.getRowId = (params) => {
      return params.data.account;
    };
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
        },
      },
      getDetailRowData: (params) => {
        params.successCallback(params.data.callRecords);
      },
    };
  },
  methods: {
    onFirstDataRendered(params) {
      // arbitrarily expand a row for presentational purposes
      setTimeout(function () {
        params.api.getDisplayedRowAtIndex(1).setExpanded(true);
      }, 0);
    },
    onBtClearMilaCalls() {
      var milaSmithRowNode = this.gridApi.getRowNode("177001");
      var milaSmithData = milaSmithRowNode.data;
      milaSmithData.callRecords = [];
      this.gridApi.applyTransaction({ update: [milaSmithData] });
    },
    onBtSetMilaCalls() {
      var milaSmithRowNode = this.gridApi.getRowNode("177001");
      var milaSmithData = milaSmithRowNode.data;
      milaSmithData.callRecords = [
        {
          name: "susan",
          callId: 579,
          duration: 23,
          switchCode: "SW5",
          direction: "Out",
          number: "(02) 47485405",
        },
        {
          name: "susan",
          callId: 580,
          duration: 52,
          switchCode: "SW3",
          direction: "In",
          number: "(02) 32367069",
        },
      ];
      this.gridApi.applyTransaction({ update: [milaSmithData] });
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => {
        this.rowData = data;
      };

      fetch(
        "https://www.ag-grid.com/example-assets/master-detail-dynamic-data.json"
      )
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

createApp(VueExample).mount("#app");
