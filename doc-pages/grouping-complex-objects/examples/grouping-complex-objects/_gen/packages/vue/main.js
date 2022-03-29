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
                :defaultColDef="defaultColDef"
                :autoGroupColumnDef="autoGroupColumnDef"
                :rowData="rowData"></ag-grid-vue>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: "athlete", minWidth: 200 },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
        { field: "total" },
        { field: "age" },
        {
          field: "country",
          rowGroup: true,
          hide: true,
          valueGetter: countryValueGetter,
          keyCreator: countryKeyCreator,
        },
        { field: "year" },
        { field: "date" },
        { field: "sport", minWidth: 200 },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        resizable: true,
      },
      autoGroupColumnDef: null,
      rowData: null,
    };
  },
  created() {
    this.autoGroupColumnDef = {
      minWidth: 200,
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

window.countryKeyCreator = function countryKeyCreator(params) {
  var countryObject = params.value;
  return countryObject.name;
};

window.countryValueGetter = function countryValueGetter(params) {
  // hack the data  - replace the country with an object of country name and code
  var countryName = params.data.country;
  var countryCode = countryName.substring(0, 2).toUpperCase();
  return {
    name: countryName,
    code: countryCode,
  };
};

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
