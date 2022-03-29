import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { CsvExportModule } from "@ag-grid-community/csv-export";
import { AgGridVue } from "@ag-grid-community/vue";
import { MenuModule } from "@ag-grid-enterprise/menu";
import Vue from "vue";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  CsvExportModule,
  MenuModule,
]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <div style="display: flex; flex-direction: column; height: 100%;">
                <div style="display: flex;">
                    <div class="row">
                        <label for="allColumns"><input id="allColumns" type="checkbox">All Columns</label>
                    </div>
                </div>
                <div style="margin: 10px 0;">
                    <button v-on:click="onBtnUpdate()">Show CSV export content text</button>
                    <button v-on:click="onBtnExport()">Download CSV export file</button>
                </div>
                <div style="flex: 1 1 0px; position: relative;">
                    <div id="gridContainer">
                        <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :suppressExcelExport="true"
                :popupParent="popupParent"
                :rowData="rowData"></ag-grid-vue>
                    </div>
                    <textarea id="csvResult">Click the Show CSV export content button to view exported CSV here</textarea>
                </div>
            </div>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: "athlete" },
        { field: "country" },
        { field: "sport" },
        { field: "gold", hide: true },
        { field: "silver", hide: true },
        { field: "bronze", hide: true },
        { field: "total" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        editable: true,
        resizable: true,
        minWidth: 100,
        flex: 1,
      },
      popupParent: null,
      rowData: null,
    };
  },
  created() {
    this.popupParent = document.body;
    this.rowData = getData();
  },
  methods: {
    onBtnExport() {
      this.gridApi.exportDataAsCsv(getParams());
    },
    onBtnUpdate() {
      document.querySelector("#csvResult").value = this.gridApi.getDataAsCsv(
        getParams()
      );
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

window.getBoolean = function getBoolean(id) {
  var field = document.querySelector("#" + id);
  return !!field.checked;
};

window.getParams = function getParams() {
  return {
    allColumns: getBoolean("allColumns"),
  };
};

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
