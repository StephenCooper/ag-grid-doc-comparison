import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "@ag-grid-community/vue3";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { createApp } from "vue";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowGroupingModule,
  MenuModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="test-container">
                <div class="test-header">
                    <span class="legend-item ag-row-level-0"></span>
                    <span class="legend-label">Top Level Group (After collapsing)</span>
                    <span class="legend-item ag-row-level-1"></span>
                    <span class="legend-label">Second Level Group</span>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :autoGroupColumnDef="autoGroupColumnDef"
                :pivotMode="true"
                :groupDefaultExpanded="groupDefaultExpanded"
                :groupHideOpenParents="true"
                :groupDisplayType="groupDisplayType"
                :animateRows="true"
                :sideBar="true"
                :rowData="rowData"></ag-grid-vue>
            </div>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: "country", rowGroup: true },
        { field: "athlete", rowGroup: true },
        { headerName: "Year", valueGetter: "data.year", pivot: true },
        { field: "gold", aggFunc: "sum" },
        { field: "silver", aggFunc: "sum" },
        { field: "bronze", aggFunc: "sum" },
        { field: "total", aggFunc: "sum" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        enableRowGroup: true,
        enablePivot: true,
        enableValue: true,
        filter: true,
        resizable: true,
        sortable: true,
      },
      autoGroupColumnDef: null,
      groupDefaultExpanded: null,
      groupDisplayType: null,
      rowData: null,
    };
  },
  created() {
    this.autoGroupColumnDef = {
      minWidth: 250,
    };
    this.groupDefaultExpanded = 9;
    this.groupDisplayType = "multipleColumns";
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => {
        this.rowData = data;
      };

      fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

createApp(VueExample).mount("#app");
