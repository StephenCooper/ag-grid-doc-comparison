import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "@ag-grid-community/vue3";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import { createApp } from "vue";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowGroupingModule,
  SetFilterModule,
  MenuModule,
  ColumnsToolPanelModule,
]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :animateRows="true"
                :groupDefaultExpanded="groupDefaultExpanded"
                @row-drag-move="onRowDragMove"></ag-grid-vue>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: "athlete", rowDrag: rowDrag },
        { field: "country", rowGroup: true },
        { field: "year", width: 100 },
        { field: "date" },
        { field: "sport" },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        width: 170,
        sortable: true,
        filter: true,
      },
      groupDefaultExpanded: null,
    };
  },
  created() {
    this.groupDefaultExpanded = 1;
  },
  methods: {
    onRowDragMove(event) {
      var movingNode = event.node;
      var overNode = event.overNode;
      // find out what country group we are hovering over
      var groupCountry;
      if (overNode.group) {
        // if over a group, we take the group key (which will be the
        // country as we are grouping by country)
        groupCountry = overNode.key;
      } else {
        // if over a non-group, we take the country directly
        groupCountry = overNode.data.country;
      }
      var needToChangeParent = movingNode.data.country !== groupCountry;
      if (needToChangeParent) {
        var movingData = movingNode.data;
        movingData.country = groupCountry;
        this.gridApi.applyTransaction({
          update: [movingData],
        });
        this.gridApi.clearFocusedCell();
      }
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      params.api.setRowData(getData());
    },
  },
};

var rowDrag = function (params) {
  // only rows that are NOT groups should be draggable
  return !params.node.group;
};

createApp(VueExample).mount("#app");
