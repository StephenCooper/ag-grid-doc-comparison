import Vue from "vue";
import { AgGridVue } from "@ag-grid-community/vue";
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
                <div style="margin-bottom: 1rem;">
                    <div>
                        <button v-on:click="sortByAthleteAsc()">Athlete Ascending</button>
                        <button v-on:click="sortByAthleteDesc()">Athlete Descending</button>
                        <button v-on:click="sortByCountryThenSport()">Country, then Sport</button>
                        <button v-on:click="sortBySportThenCountry()">Sport, then Country</button>
                    </div>
                    <div style="margin-top: 0.25rem;">
                        <button v-on:click="clearSort()">Clear Sort</button>
                        <button v-on:click="saveSort()">Save Sort</button>
                        <button v-on:click="restoreFromSave()">Restore from Save</button>
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
        { field: "athlete" },
        { field: "age", width: 90 },
        { field: "country" },
        { field: "year", width: 90 },
        { field: "date" },
        { field: "sport" },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
        { field: "total" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        sortable: true,
      },
      rowData: null,
    };
  },
  created() {},
  methods: {
    sortByAthleteAsc() {
      this.gridColumnApi.applyColumnState({
        state: [{ colId: "athlete", sort: "asc" }],
        defaultState: { sort: null },
      });
    },
    sortByAthleteDesc() {
      this.gridColumnApi.applyColumnState({
        state: [{ colId: "athlete", sort: "desc" }],
        defaultState: { sort: null },
      });
    },
    sortByCountryThenSport() {
      this.gridColumnApi.applyColumnState({
        state: [
          { colId: "country", sort: "asc", sortIndex: 0 },
          { colId: "sport", sort: "asc", sortIndex: 1 },
        ],
        defaultState: { sort: null },
      });
    },
    sortBySportThenCountry() {
      this.gridColumnApi.applyColumnState({
        state: [
          { colId: "country", sort: "asc", sortIndex: 1 },
          { colId: "sport", sort: "asc", sortIndex: 0 },
        ],
        defaultState: { sort: null },
      });
    },
    clearSort() {
      this.gridColumnApi.applyColumnState({
        defaultState: { sort: null },
      });
    },
    saveSort() {
      var colState = this.gridColumnApi.getColumnState();
      var sortState = colState
        .filter(function (s) {
          return s.sort != null;
        })
        .map(function (s) {
          return { colId: s.colId, sort: s.sort, sortIndex: s.sortIndex };
        });
      savedSort = sortState;
      console.log("saved sort", sortState);
    },
    restoreFromSave() {
      this.gridColumnApi.applyColumnState({
        state: savedSort,
        defaultState: { sort: null },
      });
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

var savedSort;

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
