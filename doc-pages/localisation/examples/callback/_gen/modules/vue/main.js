import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { CsvExportModule } from "@ag-grid-community/csv-export";
import { AgGridVue } from "@ag-grid-community/vue";
import { GridChartsModule } from "@ag-grid-enterprise/charts";
import { ClipboardModule } from "@ag-grid-enterprise/clipboard";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { ExcelExportModule } from "@ag-grid-enterprise/excel-export";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { MultiFilterModule } from "@ag-grid-enterprise/multi-filter";
import { RangeSelectionModule } from "@ag-grid-enterprise/range-selection";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import { SideBarModule } from "@ag-grid-enterprise/side-bar";
import { StatusBarModule } from "@ag-grid-enterprise/status-bar";
import Vue from "vue";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
  SetFilterModule,
  CsvExportModule,
  ExcelExportModule,
  GridChartsModule,
  ClipboardModule,
  RangeSelectionModule,
  RowGroupingModule,
  MultiFilterModule,
  SideBarModule,
  StatusBarModule,
]);

class NodeIdRenderer {
  init(params) {
    this.eGui = document.createElement("div");
    this.eGui.innerHTML = params.node.id + 1;
  }

  getGui() {
    return this.eGui;
  }
  refresh() {
    return false;
  }
}

const VueExample = {
  template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :sideBar="true"
                :statusBar="statusBar"
                :rowGroupPanelShow="rowGroupPanelShow"
                :pagination="true"
                :paginationPageSize="paginationPageSize"
                :enableRangeSelection="true"
                :enableCharts="true"
                :getLocaleText="getLocaleText"
                :rowData="rowData"></ag-grid-vue>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { headerName: "#", cellRenderer: NodeIdRenderer },
        {
          field: "athlete",
          filterParams: { buttons: ["clear", "reset", "apply"] },
        },
        {
          field: "age",
          filterParams: { buttons: ["apply", "cancel"] },
          enablePivot: true,
        },
        { field: "country", enableRowGroup: true },
        { field: "year", filter: "agNumberColumnFilter" },
        { field: "date" },
        {
          field: "sport",
          filter: "agMultiColumnFilter",
          filterParams: {
            filters: [
              { filter: "agTextColumnFilter", display: "accordion" },
              { filter: "agSetColumnFilter", display: "accordion" },
            ],
          },
        },
        { field: "gold", enableValue: true },
        { field: "silver", enableValue: true },
        { field: "bronze", enableValue: true },
        { field: "total", enableValue: true },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        editable: true,
        sortable: true,
        flex: 1,
        minWidth: 100,
        filter: true,
        resizable: true,
      },
      statusBar: null,
      rowGroupPanelShow: null,
      paginationPageSize: null,
      getLocaleText: null,
      rowData: null,
    };
  },
  created() {
    this.statusBar = {
      statusPanels: [
        { statusPanel: "agTotalAndFilteredRowCountComponent", align: "left" },
        { statusPanel: "agAggregationComponent" },
      ],
    };
    this.rowGroupPanelShow = "always";
    this.paginationPageSize = 500;
    this.getLocaleText = (params) => {
      switch (params.key) {
        case "thousandSeparator":
          return ".";
        case "decimalSeparator":
          return ",";
        default:
          return params.defaultValue ? params.defaultValue.toUpperCase() : "";
      }
    };
  },
  methods: {
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

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
