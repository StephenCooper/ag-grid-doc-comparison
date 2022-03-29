import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "@ag-grid-community/vue3";
import { createApp } from "vue";
import CustomHeader from "./customHeaderVue.js";

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
                :rowData="rowData"
                :suppressMenuHide="true"
                :defaultColDef="defaultColDef"></ag-grid-vue>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
    agColumnHeader: CustomHeader,
  },
  data: function () {
    return {
      columnDefs: [
        { field: "athlete", suppressMenu: true, minWidth: 120 },
        {
          field: "age",
          sortable: false,
          headerComponentParams: { menuIcon: "fa-external-link-alt" },
        },
        { field: "country", suppressMenu: true, minWidth: 120 },
        { field: "year", sortable: false },
        { field: "date", suppressMenu: true },
        { field: "sport", sortable: false },
        {
          field: "gold",
          headerComponentParams: { menuIcon: "fa-cog" },
          minWidth: 120,
        },
        { field: "silver", sortable: false },
        { field: "bronze", suppressMenu: true, minWidth: 120 },
        { field: "total", sortable: false },
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
        headerComponentParams: {
          menuIcon: "fa-bars",
        },
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

createApp(VueExample).mount("#app");
