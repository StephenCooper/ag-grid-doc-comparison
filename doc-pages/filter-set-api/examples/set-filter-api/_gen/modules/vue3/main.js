import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "@ag-grid-community/vue3";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import { createApp } from "vue";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  SetFilterModule,
  MenuModule,
  FiltersToolPanelModule,
]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div class="example-header">
                    <div>
                        Athlete:
                        <button v-on:click="selectNothing()">API: Filter empty set</button>
                        <button v-on:click="selectJohnAndKenny()">API: Filter only John Joe Nevin and Kenny Egan</button>
                        <button v-on:click="selectEverything()">API: Remove filter</button>
                    </div>
                    <div style="padding-top: 10px;">
                        Country - available filter values
                        <button v-on:click="setCountriesToFranceAustralia()">Filter values restricted to France and Australia</button>
                        <button v-on:click="setCountriesToAll()">Make all countries available</button>
                    </div>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
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
          field: "athlete",
          filter: "agSetColumnFilter",
          filterParams: { cellHeight: 20 },
        },
        { field: "age", maxWidth: 120, filter: "agNumberColumnFilter" },
        {
          field: "country",
          valueFormatter: (params) => {
            return `${params.value.name} (${params.value.code})`;
          },
          keyCreator: countryKeyCreator,
        },
        { field: "year", maxWidth: 120 },
        { field: "date" },
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
        minWidth: 160,
        filter: true,
        resizable: true,
      },
      rowData: null,
    };
  },
  created() {},
  methods: {
    selectJohnAndKenny() {
      const instance = this.gridApi.getFilterInstance("athlete");
      instance.setModel({ values: ["John Joe Nevin", "Kenny Egan"] });
      this.gridApi.onFilterChanged();
    },
    selectEverything() {
      const instance = this.gridApi.getFilterInstance("athlete");
      instance.setModel(null);
      this.gridApi.onFilterChanged();
    },
    selectNothing() {
      const instance = this.gridApi.getFilterInstance("athlete");
      instance.setModel({ values: [] });
      this.gridApi.onFilterChanged();
    },
    setCountriesToFranceAustralia() {
      const instance = this.gridApi.getFilterInstance("country");
      instance.setFilterValues(["France", "Australia"]);
      instance.applyModel();
      this.gridApi.onFilterChanged();
    },
    setCountriesToAll() {
      const instance = this.gridApi.getFilterInstance("country");
      instance.resetFilterValues();
      instance.applyModel();
      this.gridApi.onFilterChanged();
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => {
        patchData(data);
        this.rowData = data;
      };

      fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

window.countryKeyCreator = function countryKeyCreator(params) {
  return params.value.name;
};

window.patchData = function patchData(data) {
  // hack the data, replace each country with an object of country name and code
  data.forEach(function (row) {
    const countryName = row.country;
    const countryCode = countryName.substring(0, 2).toUpperCase();
    row.country = {
      name: countryName,
      code: countryCode,
    };
  });
};

createApp(VueExample).mount("#app");
