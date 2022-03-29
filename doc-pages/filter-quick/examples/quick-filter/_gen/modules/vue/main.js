import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "@ag-grid-community/vue";
import Vue from "vue";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div class="example-header">
                    <input type="text" id="filter-text-box" placeholder="Filter..." v-on:input="onFilterTextBoxChanged()">
                    <button style="margin-left: 20px;" v-on:click="onPrintQuickFilterTexts()">Print Quick Filter Cache Texts</button>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"
                :cacheQuickFilter="true"></ag-grid-vue>
            </div>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: "name" },
        { headerName: "Age", field: "person.age" },
        { headerName: "Country", valueGetter: "data.person.country" },
        {
          headerName: "Results",
          field: "medals",
          cellRenderer: MedalRenderer,
          getQuickFilterText: (params) => {
            return getMedalString(params.value);
          },
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        editable: true,
      },
      rowData: null,
    };
  },
  created() {
    this.rowData = getData();
  },
  methods: {
    onFilterTextBoxChanged() {
      this.gridApi.setQuickFilter(
        document.getElementById("filter-text-box").value
      );
    },
    onPrintQuickFilterTexts() {
      this.gridApi.forEachNode(function (rowNode, index) {
        console.log(
          "Row " +
            index +
            " quick filter text is " +
            rowNode.quickFilterAggregateText
        );
      });
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

const getMedalString = function ({ gold, silver, bronze }) {
  const goldStr = gold > 0 ? `Gold: ${gold} ` : "";
  const silverStr = silver > 0 ? `Silver: ${silver} ` : "";
  const bronzeStr = bronze > 0 ? `Bronze: ${bronze}` : "";
  return goldStr + silverStr + bronzeStr;
};

const MedalRenderer = function (params) {
  return getMedalString(params.value);
};

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
