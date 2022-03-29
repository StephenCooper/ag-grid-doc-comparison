import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "@ag-grid-community/vue3";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import { createApp } from "vue";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  SetFilterModule,
  MenuModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div style="margin-bottom: 5px;">
                    <button v-on:click="setNewData()">Set New Data</button>
                    <button v-on:click="reset()" style="margin-left: 5px">Reset</button>
                </div>
                
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :sideBar="sideBar"
                :rowData="rowData"
                @first-data-rendered="onFirstDataRendered"></ag-grid-vue>
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
          headerName: "Set Filter Column",
          field: "col1",
          filter: "agSetColumnFilter",
          flex: 1,
          editable: true,
        },
      ],
      gridApi: null,
      columnApi: null,

      sideBar: null,
      rowData: null,
    };
  },
  created() {
    this.sideBar = "filters";
    this.rowData = getRowData();
  },
  methods: {
    onFirstDataRendered(params) {
      params.api.getToolPanelInstance("filters").expandFilters();
    },
    setNewData() {
      var newData = [
        { col1: "A" },
        { col1: "A" },
        { col1: "B" },
        { col1: "C" },
        { col1: "D" },
        { col1: "E" },
      ];
      this.gridApi.setRowData(newData);
    },
    reset() {
      this.gridApi.setFilterModel(null);
      this.gridApi.setRowData(getRowData());
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

window.getRowData = function getRowData() {
  return [{ col1: "A" }, { col1: "A" }, { col1: "B" }, { col1: "C" }];
};

createApp(VueExample).mount("#app");
