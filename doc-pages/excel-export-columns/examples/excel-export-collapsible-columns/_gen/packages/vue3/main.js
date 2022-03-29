import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridVue } from "ag-grid-vue3";
import { createApp } from "vue";

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="container">
                <div class="columns">
                    <div>
                        <button v-on:click="onBtExport()" style="font-weight: bold;">Export to Excel</button>
                    </div>
                </div>
                <div class="grid-wrapper">
                    <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"
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
        {
          headerName: "Athlete Details",
          children: [
            { field: "athlete", width: 180, filter: "agTextColumnFilter" },
            { field: "age", width: 90, filter: "agNumberColumnFilter" },
            { headerName: "Country", field: "country", width: 140 },
          ],
        },
        {
          headerName: "Sports Results",
          children: [
            { field: "sport", width: 140 },
            {
              columnGroupShow: "closed",
              field: "total",
              width: 100,
              filter: "agNumberColumnFilter",
            },
            {
              columnGroupShow: "open",
              field: "gold",
              width: 100,
              filter: "agNumberColumnFilter",
            },
            {
              columnGroupShow: "open",
              field: "silver",
              width: 100,
              filter: "agNumberColumnFilter",
            },
            {
              columnGroupShow: "open",
              field: "bronze",
              width: 100,
              filter: "agNumberColumnFilter",
            },
          ],
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        sortable: true,
        resizable: true,
        filter: true,
      },
      defaultExcelExportParams: null,
      rowData: null,
    };
  },
  created() {
    this.defaultExcelExportParams = {
      allColumns: true,
    };
  },
  methods: {
    onBtExport() {
      this.gridApi.exportDataAsExcel();
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
