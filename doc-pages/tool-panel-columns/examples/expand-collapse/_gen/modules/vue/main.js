import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "@ag-grid-community/vue";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import Vue from "vue";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  SetFilterModule,
  ColumnsToolPanelModule,
]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div>
                    <span class="button-group">
                        <button v-on:click="expandAllGroups()">Expand All</button>
                        <button v-on:click="collapseAllGroups()">Collapse All</button>
                        <button v-on:click="expandAthleteAndCompetitionGroups()">Expand Athlete &amp; Competition</button>
                        <button v-on:click="collapseCompetitionGroups()">Collapse Competition</button>
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
            {
              groupId: "competitionGroupId",
              headerName: "Competition",
              children: [{ field: "year" }, { field: "date", minWidth: 180 }],
            },
          ],
        },
        {
          groupId: "medalsGroupId",
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
        // allow every column to be aggregated
        enableValue: true,
        // allow every column to be grouped
        enableRowGroup: true,
        // allow every column to be pivoted
        enablePivot: true,
        filter: true,
        sortable: true,
        resizable: true,
      },
      sideBar: null,
      rowData: null,
    };
  },
  created() {
    this.sideBar = "columns";
  },
  methods: {
    expandAllGroups() {
      var columnToolPanel = this.gridApi.getToolPanelInstance("columns");
      columnToolPanel.expandColumnGroups();
    },
    collapseAllGroups() {
      var columnToolPanel = this.gridApi.getToolPanelInstance("columns");
      columnToolPanel.collapseColumnGroups();
    },
    expandAthleteAndCompetitionGroups() {
      var columnToolPanel = this.gridApi.getToolPanelInstance("columns");
      columnToolPanel.expandColumnGroups([
        "athleteGroupId",
        "competitionGroupId",
      ]);
    },
    collapseCompetitionGroups() {
      var columnToolPanel = this.gridApi.getToolPanelInstance("columns");
      columnToolPanel.collapseColumnGroups(["competitionGroupId"]);
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      var columnToolPanel = params.api.getToolPanelInstance("columns");
      columnToolPanel.collapseColumnGroups();

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
