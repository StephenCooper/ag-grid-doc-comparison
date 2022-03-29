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
            <div class="example-wrapper">
                <div style="margin-bottom: 5px;">
                    <input type="text" id="filter-text-box" placeholder="Filter..." v-on:input="onFilterTextBoxChanged()">
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :autoGroupColumnDef="autoGroupColumnDef"
                :rowData="rowData"
                :treeData="true"
                :animateRows="true"
                :groupDefaultExpanded="groupDefaultExpanded"
                :getDataPath="getDataPath"></ag-grid-vue>
            </div>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [{ field: "jobTitle" }, { field: "employmentType" }],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
      },
      autoGroupColumnDef: null,
      rowData: null,
      groupDefaultExpanded: null,
      getDataPath: null,
    };
  },
  created() {
    this.autoGroupColumnDef = {
      headerName: "Organisation Hierarchy",
      minWidth: 300,
      cellRendererParams: {
        suppressCount: true,
      },
    };
    this.rowData = getData();
    this.groupDefaultExpanded = -1;
    this.getDataPath = (data) => {
      return data.orgHierarchy;
    };
  },
  methods: {
    onFilterTextBoxChanged() {
      this.gridApi.setQuickFilter(
        document.getElementById("filter-text-box").value
      );
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

createApp(VueExample).mount("#app");
