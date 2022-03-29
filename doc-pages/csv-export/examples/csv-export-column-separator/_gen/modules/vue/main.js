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
                        <label>columnSeparator = </label>
                        <select id="columnSeparator">
                            <option value="none">(default)</option>
                            <option value="tab">tab</option>
                            <option value="|">bar (|)</option>
                        </select>
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
      columnDefs: [{ field: "make" }, { field: "model" }, { field: "price" }],
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
    this.rowData = [
      { make: "Toyota", model: "Celica", price: 35000 },
      { make: "Ford", model: "Mondeo", price: 32000 },
      { make: "Porsche", model: "Boxter", price: 72000 },
    ];
  },
  methods: {
    onBtnExport() {
      var params = getParams();
      if (params.columnSeparator) {
        alert(
          "NOTE: you are downloading a file with non-standard separators - it may not render correctly in Excel."
        );
      }
      this.gridApi.exportDataAsCsv(params);
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

window.getValue = function getValue(inputSelector) {
  var text = document.querySelector(inputSelector).value;
  switch (text) {
    case "none":
      return;
    case "tab":
      return "\t";
    default:
      return text;
  }
};

window.getParams = function getParams() {
  return {
    columnSeparator: getValue("#columnSeparator"),
  };
};

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
