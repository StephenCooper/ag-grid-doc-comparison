import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "@ag-grid-community/vue";
import Vue from "vue";
import NumberFilterComponent from "./numberFilterComponentVue.js";
import NumberFloatingFilterComponent from "./numberFloatingFilterComponentVue.js";

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
                :rowData="rowData"></ag-grid-vue>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
    NumberFloatingFilterComponent,
    NumberFilterComponent,
  },
  data: function () {
    return {
      columnDefs: [
        { field: "athlete", filter: "agTextColumnFilter" },
        {
          field: "gold",
          floatingFilterComponent: "NumberFloatingFilterComponent",
          floatingFilterComponentParams: { suppressFilterButton: true },
          filter: "NumberFilterComponent",
        },
        {
          field: "silver",
          floatingFilterComponent: "NumberFloatingFilterComponent",
          floatingFilterComponentParams: { suppressFilterButton: true },
          filter: "NumberFilterComponent",
        },
        {
          field: "bronze",
          floatingFilterComponent: "NumberFloatingFilterComponent",
          floatingFilterComponentParams: { suppressFilterButton: true },
          filter: "NumberFilterComponent",
        },
        {
          field: "total",
          floatingFilterComponent: "NumberFloatingFilterComponent",
          floatingFilterComponentParams: { suppressFilterButton: true },
          filter: "NumberFilterComponent",
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        editable: true,
        sortable: true,
        flex: 1,
        minWidth: 100,
        filter: true,
        floatingFilter: true,
        resizable: true,
      },
      rowData: null,
    };
  },
  created() {},
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

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
