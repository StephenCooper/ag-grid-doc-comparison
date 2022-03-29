import Vue from "vue";
import { AgGridVue } from "ag-grid-vue";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div style="margin-bottom: 5px;">
                    <button v-on:click="reset()">Reset</button>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :rowData="rowData"
                :sideBar="sideBar"
                @first-data-rendered="onFirstDataRendered"></ag-grid-vue>
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
          headerName: "Set Filter Column",
          field: "col1",
          filter: "agSetColumnFilter",
          flex: 1,
          editable: true,
        },
      ],
      gridApi: null,
      columnApi: null,

      rowData: null,
      sideBar: null,
    };
  },
  created() {
    this.rowData = getRowData();
    this.sideBar = "filters";
  },
  methods: {
    onFirstDataRendered(params) {
      params.api.getToolPanelInstance("filters").expandFilters();
    },
    reset() {
      this.gridApi.setFilterModel(null);
      this.gridApi.setRowData(getRowData());
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

window.getRowData = function getRowData() {
  return [
    { col1: "A" },
    { col1: "A" },
    { col1: "B" },
    { col1: "B" },
    { col1: "C" },
    { col1: "C" },
  ];
};

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
