import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridVue } from "ag-grid-vue";
import Vue from "vue";

const VueExample = {
  template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :rowData="rowData"
                :defaultColDef="defaultColDef"
                :autoGroupColumnDef="autoGroupColumnDef"
                :treeData="true"
                :animateRows="true"
                :groupDefaultExpanded="groupDefaultExpanded"
                :getDataPath="getDataPath"></ag-grid-vue>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        {
          field: "groupType",
          valueGetter: (params) => {
            return params.data ? "Provided" : "Filler";
          },
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
      },
      rowData: null,
      autoGroupColumnDef: null,
      groupDefaultExpanded: null,
      getDataPath: null,
    };
  },
  created() {
    this.rowData = [
      { orgHierarchy: ["A"] },
      { orgHierarchy: ["A", "B"] },
      { orgHierarchy: ["C", "D"] },
      { orgHierarchy: ["E", "F", "G", "H"] },
    ];
    this.autoGroupColumnDef = {
      headerName: "Organisation Hierarchy",
      cellRendererParams: {
        suppressCount: true,
      },
    };
    this.groupDefaultExpanded = -1;
    this.getDataPath = (data) => {
      return data.orgHierarchy;
    };
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
