import { createApp } from "vue";
import { AgGridVue } from "@ag-grid-community/vue3";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import DetailCellRenderer from "./detailCellRendererVue.js";
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
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :enableCellChangeFlash="true"
                :masterDetail="true"
                :detailCellRenderer="detailCellRenderer"
                :detailRowHeight="detailRowHeight"
                :groupDefaultExpanded="groupDefaultExpanded"
                :rowData="rowData"
                @first-data-rendered="onFirstDataRendered"></ag-grid-vue>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
    DetailCellRenderer,
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
      detailCellRenderer: null,
      detailRowHeight: null,
      groupDefaultExpanded: null,
      rowData: null,
    };
  },
  created() {
    this.detailCellRenderer = "DetailCellRenderer";
    this.detailRowHeight = 70;
    this.groupDefaultExpanded = 1;
  },
  methods: {
    onFirstDataRendered(params) {
      // arbitrarily expand a row for presentational purposes
      setTimeout(function () {
        params.api.getDisplayedRowAtIndex(0).setExpanded(true);
      }, 0);
      setInterval(function () {
        if (!allRowData) {
          return;
        }
        const data = allRowData[0];
        const newCallRecords = [];
        data.callRecords.forEach(function (record, index) {
          newCallRecords.push({
            name: record.name,
            callId: record.callId,
            duration: record.duration + (index % 2),
            switchCode: record.switchCode,
            direction: record.direction,
            number: record.number,
          });
        });
        data.callRecords = newCallRecords;
        data.calls++;
        const tran = {
          update: [data],
        };
        params.api.applyTransaction(tran);
      }, 2000);
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => {
        allRowData = data;
        params.api.setRowData(allRowData);
      };

      fetch("https://www.ag-grid.com/example-assets/master-detail-data.json")
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

let allRowData;

createApp(VueExample).mount("#app");
