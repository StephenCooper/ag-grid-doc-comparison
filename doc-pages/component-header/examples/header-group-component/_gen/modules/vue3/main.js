import { createApp } from "vue";
import { AgGridVue } from "@ag-grid-community/vue3";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import CustomHeaderGroup from "./customHeaderGroupVue.js";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

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
                :defaultColDef="defaultColDef"></ag-grid-vue>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
    CustomHeaderGroup,
  },
  data: function () {
    return {
      columnDefs: [
        {
          headerName: "Athlete Details",
          headerGroupComponent: "CustomHeaderGroup",
          children: [
            { field: "athlete", width: 150 },
            { field: "age", width: 90, columnGroupShow: "open" },
            { field: "country", width: 120, columnGroupShow: "open" },
          ],
        },
        {
          headerName: "Medal details",
          headerGroupComponent: "CustomHeaderGroup",
          children: [
            { field: "year", width: 90 },
            { field: "date", width: 110 },
            { field: "sport", width: 110, columnGroupShow: "open" },
            { field: "gold", width: 100, columnGroupShow: "open" },
            { field: "silver", width: 100, columnGroupShow: "open" },
            { field: "bronze", width: 100, columnGroupShow: "open" },
            { field: "total", width: 100, columnGroupShow: "open" },
          ],
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        width: 100,
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

      const updateData = (data) => params.api.setRowData(data);

      fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

createApp(VueExample).mount("#app");
