import { createApp } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const VueExample = {
  template: `
        <div style="height: 100%">
            <div style="display: flex; flex-direction: column; height: 100%;">
                <div style="margin: 10px 0;">
                    <button v-on:click="onBtnUpdate()">Show CSV export content text</button>
                    <button v-on:click="onBtnExport()">Download CSV export file</button>
                </div>
                <div style="flex: 1 1 0; position: relative;">
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
      this.gridApi.exportDataAsCsv();
    },
    onBtnUpdate() {
      document.querySelector("#csvResult").value = this.gridApi.getDataAsCsv();
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

createApp(VueExample).mount("#app");
