import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "@ag-grid-community/vue";
import Vue from "vue";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"
                @filter-opened="onFilterOpened"
                @filter-changed="onFilterChanged"
                @filter-modified="onFilterModified"></ag-grid-vue>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        {
          field: "athlete",
          filter: "agTextColumnFilter",
          filterParams: { buttons: ["reset", "apply"] },
        },
        {
          field: "age",
          maxWidth: 100,
          filter: "agNumberColumnFilter",
          filterParams: { buttons: ["apply", "reset"], closeOnApply: true },
        },
        {
          field: "country",
          filter: "agTextColumnFilter",
          filterParams: { buttons: ["clear", "apply"] },
        },
        {
          field: "year",
          filter: "agNumberColumnFilter",
          filterParams: { buttons: ["apply", "cancel"], closeOnApply: true },
          maxWidth: 100,
        },
        { field: "sport" },
        { field: "gold", filter: "agNumberColumnFilter" },
        { field: "silver", filter: "agNumberColumnFilter" },
        { field: "bronze", filter: "agNumberColumnFilter" },
        { field: "total", filter: "agNumberColumnFilter" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        filter: true,
      },
      rowData: null,
    };
  },
  created() {},
  methods: {
    onFilterOpened(e) {
      console.log("onFilterOpened", e);
    },
    onFilterChanged(e) {
      console.log("onFilterChanged", e);
      console.log("gridApi.getFilterModel() =>", e.api.getFilterModel());
    },
    onFilterModified(e) {
      console.log("onFilterModified", e);
      console.log("filterInstance.getModel() =>", e.filterInstance.getModel());
      console.log(
        "filterInstance.getModelFromUi() =>",
        e.filterInstance.getModelFromUi()
      );
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

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
