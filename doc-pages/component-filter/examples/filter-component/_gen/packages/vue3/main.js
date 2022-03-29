import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue3";
import { createApp } from "vue";
import PartialMatchFilter from "./partialMatchFilterVue.js";

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <button style="margin-bottom: 5px" v-on:click="onClicked()" class="btn btn-primary">Invoke Filter Instance Method</button>
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
    PartialMatchFilter,
  },
  data: function () {
    return {
      columnDefs: [
        { field: "row" },
        {
          field: "name",
          filter: "PartialMatchFilter",
          menuTabs: ["filterMenuTab"],
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        editable: true,
        sortable: true,
        flex: 1,
        minWidth: 100,
        filter: true,
        resizable: true,
      },
      rowData: null,
    };
  },
  created() {
    this.rowData = getData();
  },
  methods: {
    onClicked() {
      this.gridApi.getFilterInstance("name", function (instance) {
        instance.componentMethod("Hello World!");
      });
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      params.api.sizeColumnsToFit();
    },
  },
};

createApp(VueExample).mount("#app");
