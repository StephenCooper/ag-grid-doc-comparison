import Vue from "vue";
import { AgGridVue } from "@ag-grid-community/vue";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { ExcelExportModule } from "@ag-grid-enterprise/excel-export";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  ExcelExportModule,
]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="container">
                <div class="columns">
                    <div class="column">
                        <label class="option" for="pageOrientation">
                            Page Orientation =
                            <select id="pageOrientation">
                                <option value="Portrait">Portrait</option>
                                <option value="Landscape">Landscape</option>
                            </select>
                        </label>
                        <label class="option" for="pageSize">
                            Page Size =
                            <select id="pageSize">
                                <option value="Letter">Letter</option>
                                <option value="Letter Small">Letter Small</option>
                                <option value="Tabloid">Tabloid</option>
                                <option value="Ledger">Ledger</option>
                                <option value="Legal">Legal</option>
                                <option value="Statement">Statement</option>
                                <option value="Executive">Executive</option>
                                <option value="A3">A3</option>
                                <option value="A4">A4</option>
                                <option value="A4 Small">A4 Small</option>
                                <option value="A5">A5</option>
                                <option value="A6">A6</option>
                                <option value="B4">B4</option>
                                <option value="B5">B5</option>
                                <option value="Folio">Folio</option>
                                <option value="Envelope">Envelope</option>
                                <option value="Envelope DL">Envelope DL</option>
                                <option value="Envelope C5">Envelope C5</option>
                                <option value="Envelope B5">Envelope B5</option>
                                <option value="Envelope C3">Envelope C3</option>
                                <option value="Envelope C4">Envelope C4</option>
                                <option value="Envelope C6">Envelope C6</option>
                                <option value="Envelope Monarch">Envelope Monarch</option>
                                <option value="Japanese Postcard">Japanese Postcard</option>
                                <option value="Japanese Double Postcard">Japanese Double Postcard</option>
                            </select>
                        </label>
                    </div>
                    <div class="column margin-container">
                        <div>Margins</div>
                        <label for="top">Top = <input type="number" id="top" value="0.75"></label>
                        <label for="right">Right = <input type="number" id="right" value="0.7"></label>
                        <label for="bottom">Bottom = <input type="number" id="bottom" value="0.75"></label>
                        <label for="left">Left = <input type="number" id="left" value="0.7"></label>
                        <label for="header">Header = <input type="number" id="header" value="0.3"></label>
                        <label for="footer">Footer = <input type="number" id="footer" value="0.3"></label>
                    </div>
                </div>
                <div>
                    <button v-on:click="onBtExport()" style="margin: 5px 0px; font-weight: bold;">Export to Excel</button>
                </div>
                <div class="grid-wrapper">
                    <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :popupParent="popupParent"
                :rowData="rowData"></ag-grid-vue>
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
        { field: "athlete", minWidth: 200 },
        { field: "country", minWidth: 200 },
        { field: "sport", minWidth: 150 },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
        { field: "total" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        sortable: true,
        filter: true,
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
  },
  methods: {
    onBtExport() {
      const { pageSetup, margins } = getSheetConfig();
      this.gridApi.exportDataAsExcel({ pageSetup, margins });
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) =>
        params.api.setRowData(data.filter((rec) => rec.country != null));

      fetch("https://www.ag-grid.com/example-assets/small-olympic-winners.json")
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

window.getNumber = function getNumber(id) {
  var el = document.querySelector(id);
  if (!el || isNaN(el.value)) {
    return 0;
  }
  return parseFloat(el.value);
};

window.getValue = function getValue(id) {
  return document.querySelector(id).value;
};

window.getSheetConfig = function getSheetConfig() {
  return {
    pageSetup: {
      orientation: getValue("#pageOrientation"),
      pageSize: getValue("#pageSize"),
    },
    margins: {
      top: getNumber("#top"),
      right: getNumber("#right"),
      bottom: getNumber("#bottom"),
      left: getNumber("#left"),
      header: getNumber("#header"),
      footer: getNumber("#footer"),
    },
  };
};

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
