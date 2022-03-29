import { createApp } from "vue";
import { AgGridVue } from "@ag-grid-community/vue3";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div class="legend-bar">
                    <span class="legend-box locked-visible"></span> Locked Visible Column
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :sideBar="sideBar"
                :defaultColDef="defaultColDef"
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
        {
          headerName: "Athlete",
          children: [
            { field: "athlete", width: 150 },
            { field: "age", lockVisible: true, cellClass: "locked-visible" },
            { field: "country", width: 150 },
            { field: "year" },
            { field: "date" },
            { field: "sport" },
          ],
        },
        {
          headerName: "Medals",
          children: [
            { field: "gold", lockVisible: true, cellClass: "locked-visible" },
            { field: "silver", lockVisible: true, cellClass: "locked-visible" },
            { field: "bronze", lockVisible: true, cellClass: "locked-visible" },
            {
              field: "total",
              lockVisible: true,
              cellClass: "locked-visible",
              hide: true,
            },
          ],
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        width: 100,
      },
      sideBar: null,
      rowData: null,
    };
  },
  created() {
    this.sideBar = {
      toolPanels: [
        {
          id: "columns",
          labelDefault: "Columns",
          labelKey: "columns",
          iconKey: "columns",
          toolPanel: "agColumnsToolPanel",
          toolPanelParams: {
            suppressRowGroups: true,
            suppressValues: true,
            suppressPivots: true,
            suppressPivotMode: true,
          },
        },
      ],
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

createApp(VueExample).mount("#app");
