import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridVue } from "ag-grid-vue";
import Vue from "vue";
import CountryCellRenderer from "./countryCellRendererVue.js";

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div style="margin-bottom: 5px;">
                    <button v-on:click="printFilterModel()">Print Filter Model</button>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :context="context"
                :defaultColDef="defaultColDef"
                :sideBar="sideBar"
                :rowData="rowData"
                @first-data-rendered="onFirstDataRendered"></ag-grid-vue>
            </div>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
    CountryCellRenderer,
  },
  data: function () {
    return {
      columnDefs: [
        {
          headerName: "No Cell Renderer",
          field: "country",
          cellRenderer: "CountryCellRenderer",
          filter: "agSetColumnFilter",
          filterParams: {},
        },
        {
          headerName: "With Cell Renderers",
          field: "country",
          cellRenderer: "CountryCellRenderer",
          filter: "agSetColumnFilter",
          filterParams: { cellRenderer: "CountryCellRenderer" },
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 225,
        resizable: true,
        floatingFilter: true,
      },
      context: null,
      sideBar: null,
      rowData: null,
    };
  },
  created() {
    this.context = {
      COUNTRY_CODES: COUNTRY_CODES,
    };
    this.sideBar = "filters";
  },
  methods: {
    onFirstDataRendered(params) {
      params.api.getToolPanelInstance("filters").expandFilters();
    },
    printFilterModel() {
      const filterModel = this.gridApi.getFilterModel();
      console.log(filterModel);
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => {
        // only return data that has corresponding country codes
        const dataWithFlags = data.filter(function (d) {
          return COUNTRY_CODES[d.country];
        });
        params.api.setRowData(dataWithFlags);
      };

      fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

const COUNTRY_CODES = {
  Ireland: "ie",
  Luxembourg: "lu",
  Belgium: "be",
  Spain: "es",
  France: "fr",
  Germany: "de",
  Sweden: "se",
  Italy: "it",
  Greece: "gr",
  Iceland: "is",
  Portugal: "pt",
  Malta: "mt",
  Norway: "no",
  Brazil: "br",
  Argentina: "ar",
  Colombia: "co",
  Peru: "pe",
  Venezuela: "ve",
  Uruguay: "uy",
};

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
