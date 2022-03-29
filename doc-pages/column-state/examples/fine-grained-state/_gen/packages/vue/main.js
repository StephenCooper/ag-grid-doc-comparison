import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridVue } from "ag-grid-vue";
import Vue from "vue";

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="test-container">
                <div class="test-header">
                    <table>
                        <tbody><tr>
                            <td>
                                Sort:
                            </td>
                            <td>
                                <button v-on:click="onBtSortAthlete()">Sort Athlete</button>
                                <button v-on:click="onBtSortCountryThenSportClearOthers()">Sort Country, then Sport - Clear
                                    Others</button>
                                <button v-on:click="onBtClearAllSorting()">Clear All Sorting</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Column Order:
                            </td>
                            <td>
                                <button v-on:click="onBtOrderColsMedalsFirst()">Show Medals First</button>
                                <button v-on:click="onBtOrderColsMedalsLast()">Show Medals Last</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Column Visibility:
                            </td>
                            <td>
                                <button v-on:click="onBtHideMedals()">Hide Medals</button>
                                <button v-on:click="onBtShowMedals()">Show Medals</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Row Group:
                            </td>
                            <td>
                                <button v-on:click="onBtRowGroupCountryThenSport()">Group Country then Sport</button>
                                <button v-on:click="onBtRemoveCountryRowGroup()">Remove Country</button>
                                <button v-on:click="onBtClearAllRowGroups()">Clear All Groups</button>
                            </td>
                        </tr>
                    </tbody></table>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :sideBar="sideBar"
                :rowGroupPanelShow="rowGroupPanelShow"
                :pivotPanelShow="pivotPanelShow"
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
        { field: "age" },
        { field: "country" },
        { field: "sport" },
        { field: "year" },
        { field: "date" },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
        { field: "total" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        sortable: true,
        resizable: true,
        width: 150,
        enableRowGroup: true,
        enablePivot: true,
        enableValue: true,
      },
      sideBar: null,
      rowGroupPanelShow: null,
      pivotPanelShow: null,
      rowData: null,
    };
  },
  created() {
    this.sideBar = { toolPanels: ["columns"] };
    this.rowGroupPanelShow = "always";
    this.pivotPanelShow = "always";
  },
  methods: {
    onBtSortAthlete() {
      this.gridColumnApi.applyColumnState({
        state: [{ colId: "athlete", sort: "asc" }],
      });
    },
    onBtSortCountryThenSportClearOthers() {
      this.gridColumnApi.applyColumnState({
        state: [
          { colId: "country", sort: "asc", sortIndex: 0 },
          { colId: "sport", sort: "asc", sortIndex: 1 },
        ],
        defaultState: { sort: null },
      });
    },
    onBtClearAllSorting() {
      this.gridColumnApi.applyColumnState({
        defaultState: { sort: null },
      });
    },
    onBtRowGroupCountryThenSport() {
      this.gridColumnApi.applyColumnState({
        state: [
          { colId: "country", rowGroupIndex: 0 },
          { colId: "sport", rowGroupIndex: 1 },
        ],
        defaultState: { rowGroup: false },
      });
    },
    onBtRemoveCountryRowGroup() {
      this.gridColumnApi.applyColumnState({
        state: [{ colId: "country", rowGroup: false }],
      });
    },
    onBtClearAllRowGroups() {
      this.gridColumnApi.applyColumnState({
        defaultState: { rowGroup: false },
      });
    },
    onBtOrderColsMedalsFirst() {
      this.gridColumnApi.applyColumnState({
        state: [
          { colId: "gold" },
          { colId: "silver" },
          { colId: "bronze" },
          { colId: "total" },
          { colId: "athlete" },
          { colId: "age" },
          { colId: "country" },
          { colId: "sport" },
          { colId: "year" },
          { colId: "date" },
        ],
        applyOrder: true,
      });
    },
    onBtOrderColsMedalsLast() {
      this.gridColumnApi.applyColumnState({
        state: [
          { colId: "athlete" },
          { colId: "age" },
          { colId: "country" },
          { colId: "sport" },
          { colId: "year" },
          { colId: "date" },
          { colId: "gold" },
          { colId: "silver" },
          { colId: "bronze" },
          { colId: "total" },
        ],
        applyOrder: true,
      });
    },
    onBtHideMedals() {
      this.gridColumnApi.applyColumnState({
        state: [
          { colId: "gold", hide: true },
          { colId: "silver", hide: true },
          { colId: "bronze", hide: true },
          { colId: "total", hide: true },
        ],
      });
    },
    onBtShowMedals() {
      this.gridColumnApi.applyColumnState({
        state: [
          { colId: "gold", hide: false },
          { colId: "silver", hide: false },
          { colId: "bronze", hide: false },
          { colId: "total", hide: false },
        ],
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

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
