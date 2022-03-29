import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridVue } from "ag-grid-vue";
import Vue from "vue";

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div style="margin-bottom: 1rem;">
                    <button v-on:click="getTextModel()">Print Text Filter model</button>
                    <button v-on:click="getSetMiniFilter()">Print Set Filter search text</button>
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
        {
          field: "athlete",
          filter: "agMultiColumnFilter",
          filterParams: {
            filters: [
              {
                filter: "agTextColumnFilter",
                filterParams: { buttons: ["apply", "clear"] },
              },
              { filter: "agSetColumnFilter" },
            ],
          },
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 200,
        resizable: true,
        menuTabs: ["filterMenuTab"],
      },
      rowData: null,
    };
  },
  created() {},
  methods: {
    getTextModel() {
      var textFilter = this.gridApi
        .getFilterInstance("athlete")
        .getChildFilterInstance(0);
      console.log("Current Text Filter model: ", textFilter.getModel());
    },
    getSetMiniFilter() {
      var setFilter = this.gridApi
        .getFilterInstance("athlete")
        .getChildFilterInstance(1);
      console.log(
        "Current Set Filter search text: ",
        setFilter.getMiniFilter()
      );
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
