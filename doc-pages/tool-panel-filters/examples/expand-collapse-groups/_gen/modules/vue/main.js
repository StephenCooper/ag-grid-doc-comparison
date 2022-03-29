import Vue from "vue";
import { AgGridVue } from "@ag-grid-community/vue";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  SetFilterModule,
  FiltersToolPanelModule,
]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div>
                    <span class="button-group">
                        <button v-on:click="expandAthleteAndCompetition()">Expand Athlete &amp; Competition</button>
                        <button v-on:click="collapseCompetition()">Collapse Competition</button>
                        <button v-on:click="expandAll()">Expand All</button>
                        <button v-on:click="collapseAll()">Collapse All</button>
                    </span>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :sideBar="sideBar"
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
          groupId: "athleteGroupId",
          headerName: "Athlete",
          children: [
            {
              headerName: "Name",
              field: "athlete",
              minWidth: 200,
              filter: "agTextColumnFilter",
            },
            { field: "age" },
            {
              groupId: "competitionGroupId",
              headerName: "Competition",
              children: [{ field: "year" }, { field: "date", minWidth: 180 }],
            },
            { field: "country", minWidth: 200 },
          ],
        },
        { colId: "sport", field: "sport", minWidth: 200 },
        {
          headerName: "Medals",
          children: [
            { field: "gold" },
            { field: "silver" },
            { field: "bronze" },
            { field: "total" },
          ],
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        filter: true,
        resizable: true,
      },
      sideBar: null,
      rowData: null,
    };
  },
  created() {
    this.sideBar = "filters";
  },
  methods: {
    collapseAll() {
      this.gridApi.getToolPanelInstance("filters").collapseFilterGroups();
    },
    expandAthleteAndCompetition() {
      this.gridApi
        .getToolPanelInstance("filters")
        .expandFilterGroups(["athleteGroupId", "competitionGroupId"]);
    },
    collapseCompetition() {
      this.gridApi
        .getToolPanelInstance("filters")
        .collapseFilterGroups(["competitionGroupId"]);
    },
    expandAll() {
      this.gridApi.getToolPanelInstance("filters").expandFilterGroups();
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      // initially collapse all filter groups
      params.api.getToolPanelInstance("filters").collapseFilterGroups();

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
