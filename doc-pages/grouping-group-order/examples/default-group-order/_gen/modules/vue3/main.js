import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "@ag-grid-community/vue3";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { createApp } from "vue";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :autoGroupColumnDef="autoGroupColumnDef"
                :groupDisplayType="groupDisplayType"
                :initialGroupOrderComparator="initialGroupOrderComparator"
                :animateRows="true"
                :rowData="rowData"></ag-grid-vue>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: "country", rowGroup: true, hide: true },
        { field: "year" },
        { field: "sport", rowGroup: true, hide: true },
        { field: "athlete", minWidth: 200 },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
        { field: "total" },
        { field: "age" },
        { field: "date", minWidth: 140 },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        resizable: true,
        sortable: true,
      },
      autoGroupColumnDef: null,
      groupDisplayType: null,
      initialGroupOrderComparator: null,
      rowData: null,
    };
  },
  created() {
    this.autoGroupColumnDef = {
      minWidth: 200,
    };
    this.groupDisplayType = "groupRows";
    this.initialGroupOrderComparator = (params) => {
      const a = params.nodeA.key || "";
      const b = params.nodeB.key || "";
      return a < b ? -1 : a > b ? 1 : 0;
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
