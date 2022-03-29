import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridVue } from "ag-grid-vue";
import Vue from "vue";

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div class="example-header">
                    <div>
                        Case Insensitive:
                        <button v-on:click="setModel('insensitive')">API: setModel() - mismatching case</button>
                        <button v-on:click="getModel('insensitive')">API: getModel()</button>
                        <button v-on:click="setFilterValues('insensitive')">API: setFilterValues() - mismatching case </button>
                        <button v-on:click="getValues('insensitive')">API: getValues()</button>
                        <button v-on:click="reset('insensitive')">Reset</button>
                    </div>
                    <div style="padding-top: 10px;">
                        Case Sensitive:
                        <button v-on:click="setModel('sensitive')">API: setModel() - mismatching case</button>
                        <button v-on:click="getModel('sensitive')">API: getModel()</button>
                        <button v-on:click="setFilterValues('sensitive')">API: setFilterValues() - mismatching case </button>
                        <button v-on:click="getValues('sensitive')">API: getValues()</button>
                        <button v-on:click="reset('sensitive')">Reset</button>
                    </div>
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
          headerName: "Case Insensitive (default)",
          field: "colour",
          filter: "agSetColumnFilter",
          filterParams: {
            caseSensitive: false,
            cellRenderer: colourCellRenderer,
          },
        },
        {
          headerName: "Case Sensitive",
          field: "colour",
          filter: "agSetColumnFilter",
          filterParams: {
            caseSensitive: true,
            cellRenderer: colourCellRenderer,
          },
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 225,
        cellRenderer: colourCellRenderer,
        resizable: true,
        floatingFilter: true,
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
      this.gridApi.getToolPanelInstance("filters").expandFilters();
    },
    setModel(type) {
      const instance = this.gridApi.getFilterInstance(FILTER_TYPES[type]);
      instance.setModel({ values: MANGLED_COLOURS });
      this.gridApi.onFilterChanged();
    },
    getModel(type) {
      const instance = this.gridApi.getFilterInstance(FILTER_TYPES[type]);
      alert(JSON.stringify(instance.getModel(), null, 2));
    },
    setFilterValues(type) {
      const instance = this.gridApi.getFilterInstance(FILTER_TYPES[type]);
      instance.setFilterValues(MANGLED_COLOURS);
      instance.applyModel();
      this.gridApi.onFilterChanged();
    },
    getValues(type) {
      const instance = this.gridApi.getFilterInstance(FILTER_TYPES[type]);
      alert(JSON.stringify(instance.getValues(), null, 2));
    },
    reset(type) {
      const instance = this.gridApi.getFilterInstance(FILTER_TYPES[type]);
      instance.resetFilterValues();
      instance.setModel(null);
      this.gridApi.onFilterChanged();
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

window.colourCellRenderer = function colourCellRenderer(params) {
  if (!params.value || params.value === "(Select All)") {
    return params.value;
  }
  return `<div style="background-color: ${params.value.toLowerCase()}; ${FIXED_STYLES}"></div>${
    params.value
  }`;
};

var FIXED_STYLES =
  "vertical-align: middle; border: 1px solid black; margin: 3px; display: inline-block; width: 10px; height: 10px";

var FILTER_TYPES = {
  insensitive: "colour",
  sensitive: "colour_1",
};

var MANGLED_COLOURS = ["ReD", "OrAnGe", "WhItE", "YeLlOw"];

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
