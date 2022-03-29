import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridVue } from "ag-grid-vue";
import Vue from "vue";

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="container">
                <div>
                    <button class="export" v-on:click="onBtExport()">Export to Excel</button>
                </div>
                <div class="grid-wrapper">
                    <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :defaultExcelExportParams="defaultExcelExportParams"></ag-grid-vue>
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
        { field: "age" },
        { field: "year" },
        { field: "date" },
        { field: "sport" },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
        { field: "total" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        width: 150,
        resizable: true,
      },
      defaultExcelExportParams: null,
    };
  },
  created() {
    this.defaultExcelExportParams = {
      prependContent: [
        [
          {
            data: {
              type: "String",
              value: logos.AgGrid, // see imageUtils
            },
            mergeAcross: 1,
          },
        ],
      ],
      rowHeight: (params) => (params.rowIndex === 1 ? 82 : 20),
      addImageToCell: (rowIndex, col, value) => {
        if (rowIndex !== 1 || col.getColId() !== "athlete") {
          return;
        }
        return {
          image: {
            id: "logo",
            base64: value,
            imageType: "png",
            width: 295,
            height: 100,
            position: {
              colSpan: 2,
            },
          },
        };
      },
    };
  },
  methods: {
    onBtExport() {
      this.gridApi.exportDataAsExcel();
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      fetch("https://www.ag-grid.com/example-assets/small-olympic-winners.json")
        .then((response) => response.json())
        .then((data) => params.api.setRowData(data));
    },
  },
};

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
