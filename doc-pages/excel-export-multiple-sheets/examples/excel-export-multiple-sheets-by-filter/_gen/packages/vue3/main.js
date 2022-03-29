import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridVue } from "ag-grid-vue3";
import { createApp } from "vue";

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
        { field: "age" },
        { field: "country", minWidth: 200 },
        { field: "year" },
        { field: "date", minWidth: 150 },
        { field: "sport", minWidth: 150 },
        { field: "gold" },
        { field: "silver" },
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
      rowData: null,
    };
  },
  created() {},
  methods: {
    onBtExport() {
      var sports = {};
      this.gridApi.forEachNode(function (node) {
        if (!sports[node.data.sport]) {
          sports[node.data.sport] = true;
        }
      });
      var spreadsheets = [];
      var sportFilterInstance = this.gridApi.getFilterInstance("sport");
      for (var sport in sports) {
        sportFilterInstance.setModel({ values: [sport] });
        this.gridApi.onFilterChanged();
        if (sportFilterInstance.getModel() == null) {
          throw new Error("Example error: Filter not applied");
        }
        const sheet = this.gridApi.getSheetDataForExcel({
          sheetName: sport,
        });
        if (sheet) {
          spreadsheets.push(sheet);
        }
      }
      sportFilterInstance.setModel(null);
      this.gridApi.onFilterChanged();
      this.gridApi.exportMultipleSheetsAsExcel({
        data: spreadsheets,
        fileName: "ag-grid.xlsx",
      });
      spreadsheets = [];
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => params.api.setRowData(data);

      fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

createApp(VueExample).mount("#app");
