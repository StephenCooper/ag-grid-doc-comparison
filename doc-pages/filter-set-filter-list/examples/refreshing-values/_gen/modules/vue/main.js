import Vue from "vue";
import { AgGridVue } from "@ag-grid-community/vue";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  SetFilterModule,
  MenuModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <div id="container">
                <div id="header">
                    <button v-on:click="useList1()">Use <code>['Elephant', 'Lion', 'Monkey']</code></button>
                    <button v-on:click="useList2()">Use <code>['Elephant', 'Giraffe', 'Tiger']</code></button>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :sideBar="sideBar"
                :rowData="rowData"
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
          colId: "array",
          headerName: "Values Array",
          field: "animal",
          filter: "agSetColumnFilter",
          filterParams: arrayFilterParams,
        },
        {
          colId: "callback",
          headerName: "Values Callback",
          field: "animal",
          filter: "agSetColumnFilter",
          filterParams: callbackFilterParams,
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        filter: true,
        resizable: true,
      },
      sideBar: null,
      rowData: null,
    };
  },
  created() {
    this.sideBar = "filters";
    this.rowData = getData();
  },
  methods: {
    onFirstDataRendered(params) {
      params.api.getToolPanelInstance("filters").expandFilters();
    },
    useList1() {
      console.log("Updating values to " + list1);
      valuesArray.length = 0;
      list1.forEach(function (value) {
        valuesArray.push(value);
      });
      var filter = this.gridApi.getFilterInstance("array");
      filter.refreshFilterValues();
      valuesCallbackList = list1;
    },
    useList2() {
      console.log("Updating values to " + list2);
      valuesArray.length = 0;
      list2.forEach(function (value) {
        valuesArray.push(value);
      });
      var filter = this.gridApi.getFilterInstance("array");
      filter.refreshFilterValues();
      valuesCallbackList = list2;
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

window.valuesCallback = function valuesCallback(params) {
  setTimeout(function () {
    params.success(valuesCallbackList);
  }, 1000);
};

var list1 = ["Elephant", "Lion", "Monkey"];

var list2 = ["Elephant", "Giraffe", "Tiger"];

var valuesArray = list1.slice();

var valuesCallbackList = list1;

var arrayFilterParams = {
  values: valuesArray,
};

var callbackFilterParams = {
  values: valuesCallback,
  refreshValuesOnOpen: true,
};

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
