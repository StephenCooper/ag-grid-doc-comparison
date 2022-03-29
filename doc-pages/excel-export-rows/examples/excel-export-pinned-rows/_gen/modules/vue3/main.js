import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { CsvExportModule } from "@ag-grid-community/csv-export";
import { AgGridVue } from "@ag-grid-community/vue3";
import { ExcelExportModule } from "@ag-grid-enterprise/excel-export";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { createApp } from "vue";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  ExcelExportModule,
  CsvExportModule,
]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="container">
                <div class="columns">
                    <div class="column">
                        <label for="skipPinnedTop"><input id="skipPinnedTop" type="checkbox">Skip Pinned Top Rows</label>
                    </div>
                    <div class="column">
                        <label for="skipPinnedBottom"><input id="skipPinnedBottom" type="checkbox">Skip Pinned Bottom Rows</label>
                    </div>
                    <div>
                        <button v-on:click="onBtExport()" style="margin: 5px 0px; font-weight: bold;">Export to Excel</button>
                    </div>
                </div>
                <div class="grid-wrapper">
                    <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :popupParent="popupParent"
                :pinnedTopRowData="pinnedTopRowData"
                :pinnedBottomRowData="pinnedBottomRowData"
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
        {
          headerName: "Top Level Column Group",
          children: [
            {
              headerName: "Group A",
              children: [
                { field: "athlete", minWidth: 200 },
                { field: "country", minWidth: 200 },
                { headerName: "Group", valueGetter: "data.country.charAt(0)" },
              ],
            },
            {
              headerName: "Group B",
              children: [
                { field: "date", minWidth: 150 },
                { field: "sport", minWidth: 150 },
                { field: "gold" },
                { field: "silver" },
                { field: "bronze" },
                { field: "total" },
              ],
            },
          ],
        },
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
      pinnedTopRowData: null,
      pinnedBottomRowData: null,
      rowData: null,
    };
  },
  created() {
    this.popupParent = document.body;
    this.pinnedTopRowData = [
      {
        athlete: "Floating <Top> Athlete",
        country: "Floating <Top> Country",
        date: "01/08/2020",
        sport: "Track & Field",
        gold: 22,
        silver: "003",
        bronze: 44,
        total: 55,
      },
    ];
    this.pinnedBottomRowData = [
      {
        athlete: "Floating <Bottom> Athlete",
        country: "Floating <Bottom> Country",
        date: "01/08/2030",
        sport: "Track & Field",
        gold: 222,
        silver: "005",
        bronze: 244,
        total: 255,
      },
    ];
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

window.getBoolean = function getBoolean(id) {
  return !!document.querySelector("#" + id).checked;
};

window.getParams = function getParams() {
  return {
    skipPinnedTop: getBoolean("skipPinnedTop"),
    skipPinnedBottom: getBoolean("skipPinnedBottom"),
  };
};

createApp(VueExample).mount("#app");
