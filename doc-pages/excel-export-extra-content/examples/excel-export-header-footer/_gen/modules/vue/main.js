import Vue from "vue";
import { AgGridVue } from "@ag-grid-community/vue";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ExcelExportModule } from "@ag-grid-enterprise/excel-export";
import { MenuModule } from "@ag-grid-enterprise/menu";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ExcelExportModule,
  MenuModule,
]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="container">
                <div class="columns">
                    <div class="column">
                        <span>Header</span>
                        <label>
                            Position
                            <select id="headerPosition">
                                <option>Left</option>
                                <option>Center</option>
                                <option>Right</option>
                            </select>
                        </label>
                        <label>
                            Font
                            <select id="headerFontName">
                                <option>Calibri</option>
                                <option>Arial</option>
                            </select>
                            <select id="headerFontSize">
                                <option>11</option>
                                <option>12</option>
                                <option>13</option>
                                <option>14</option>
                                <option>16</option>
                                <option>20</option>
                            </select>
                            <select id="headerFontWeight">
                                <option>Regular</option>
                                <option>Bold</option>
                                <option>Italic</option>
                                <option>Bold Italic</option>
                            </select>
                            <label class="option underline" for="headerUnderline">
                                <input type="checkbox" id="headerUnderline">
                                <button style="text-decoration: underline;">U</button>
                            </label>
                        </label>
                        <label class="option" for="headerValue">Value
                            <input id="headerValue">
                        </label>
                    </div>
                    <div class="column">
                        <span>Footer</span>
                        <label>
                            Position
                            <select id="footerPosition">
                                <option>Left</option>
                                <option>Center</option>
                                <option>Right</option>
                            </select>
                        </label>
                        <label>
                            Font
                            <select id="footerFontName">
                                <option>Calibri</option>
                                <option>Arial</option>
                            </select>
                            <select id="footerFontSize">
                                <option>11</option>
                                <option>12</option>
                                <option>13</option>
                                <option>14</option>
                                <option>16</option>
                                <option>20</option>
                            </select>
                            <select id="footerFontWeight">
                                <option>Regular</option>
                                <option>Bold</option>
                                <option>Italic</option>
                                <option>Bold Italic</option>
                            </select>
                            <label class="option underline" for="footerUnderline">
                                <input type="checkbox" id="footerUnderline">
                                <button style="text-decoration: underline;">U</button>
                            </label>
                        </label>
                        <label class="option" for="footerValue">Value
                            <input id="footerValue">
                        </label>
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
      this.gridApi.exportDataAsExcel(getParams());
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

const getValues = (type) => {
  const value = document.querySelector("#" + type + "Value").value;
  if (value == null) {
    return;
  }
  const obj = {
    value: value,
  };
  obj.position = document.querySelector("#" + type + "Position").value;
  const fontName = document.querySelector("#" + type + "FontName").value;
  const fontSize = document.querySelector("#" + type + "FontSize").value;
  const fontWeight = document.querySelector("#" + type + "FontWeight").value;
  const underline = document.querySelector("#" + type + "Underline").checked;
  if (
    fontName !== "Calibri" ||
    fontSize != "11" ||
    fontWeight !== "Regular" ||
    underline
  ) {
    obj.font = {};
    if (fontName !== "Calibri") {
      obj.font.fontName = fontName;
    }
    if (fontSize != "11") {
      obj.font.size = Number.parseInt(fontSize);
    }
    if (fontWeight !== "Regular") {
      if (fontWeight.indexOf("Bold") !== -1) {
        obj.font.bold = true;
      }
      if (fontWeight.indexOf("Italic") !== -1) {
        obj.font.italic = true;
      }
    }
    if (underline) {
      obj.font.underline = "Single";
    }
  }
  return obj;
};

const getParams = () => {
  const header = getValues("header");
  const footer = getValues("footer");
  if (!header && !footer) {
    return undefined;
  }
  const obj = {
    headerFooterConfig: {
      all: {},
    },
  };
  if (header) {
    obj.headerFooterConfig.all.header = [header];
  }
  if (footer) {
    obj.headerFooterConfig.all.footer = [footer];
  }
  return obj;
};

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
