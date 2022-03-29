import { createApp } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="container">
                <div>
                    <button v-on:click="onBtExport()" style="margin-bottom: 5px; font-weight: bold;">Export to Excel</button>
                </div>
                <div class="grid-wrapper">
                    <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :defaultExcelExportParams="defaultExcelExportParams"
                :excelStyles="excelStyles"
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
        { field: "company" },
        { field: "url", cellClass: "hyperlinks" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        resizable: true,
      },
      defaultExcelExportParams: null,
      excelStyles: null,
      rowData: null,
    };
  },
  created() {
    this.defaultExcelExportParams = {
      autoConvertFormulas: true,
      processCellCallback: (params) => {
        const field = params.column.getColDef().field;
        return field === "url" ? `=HYPERLINK("${params.value}")` : params.value;
      },
    };
    this.excelStyles = [
      {
        id: "hyperlinks",
        font: {
          underline: "Single",
          color: "#358ccb",
        },
      },
    ];
    this.rowData = [
      { company: "Google", url: "https://www.google.com" },
      { company: "Adobe", url: "https://www.adobe.com" },
      { company: "The New York Times", url: "https://www.nytimes.com" },
      { company: "Twitter", url: "https://www.twitter.com" },
      { company: "StackOverflow", url: "https://stackoverflow.com/" },
      { company: "Reddit", url: "https://www.reddit.com" },
      { company: "Github", url: "https://www.github.com" },
      { company: "Microsoft", url: "https://www.microsoft.com" },
      { company: "Gizmodo", url: "https://www.gizmodo.com" },
      { company: "LinkedIN", url: "https://www.linkedin.com" },
    ];
  },
  methods: {
    onBtExport() {
      this.gridApi.exportDataAsExcel();
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

createApp(VueExample).mount("#app");
