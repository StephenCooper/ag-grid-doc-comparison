import Vue from "vue";
import { AgGridVue } from "ag-grid-vue";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="container">
                <div class="columns">
                    <label class="option" for="columnGroups">
                        <input id="columnGroups" type="checkbox">Skip Column Group Headers
                    </label>
                    <label class="option" for="skipHeader">
                        <input id="skipHeader" type="checkbox">Skip Column Headers
                    </label>
                    <div>
                        <button v-on:click="onBtExport()" style="margin: 5px 0px; font-weight: bold;">Export to Excel</button>
                    </div>
                </div>
                <div class="grid-wrapper">
                    <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :popupParent="popupParent"
                :rowData="rowData"></ag-grid-vue>
                </div>
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
          headerName: "Top Level Column Group",
          children: [
            {
              headerName: "Group A",
              children: [
                { field: "athlete", minWidth: 200 },
                { field: "country", minWidth: 200 },
                { headerName: "Group", valueGetter: "data.country.charAt(0)" },
              ],
            },
            {
              headerName: "Group B",
              children: [
                { field: "sport", minWidth: 150 },
                { field: "gold" },
                { field: "silver" },
                { field: "bronze" },
                { field: "total" },
              ],
            },
          ],
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        sortable: true,
        filter: true,
        resizable: true,
        minWidth: 100,
        flex: 1,
      },
      popupParent: null,
      rowData: null,
    };
  },
  created() {
    this.popupParent = document.body;
  },
  methods: {
    onBtExport() {
      this.gridApi.exportDataAsExcel(getParams());
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      document.getElementById("columnGroups").checked = true;

      const updateData = (data) =>
        params.api.setRowData(data.filter((rec) => rec.country != null));

      fetch("https://www.ag-grid.com/example-assets/small-olympic-winners.json")
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

window.getBoolean = function getBoolean(id) {
  return !!document.querySelector("#" + id).checked;
};

window.getParams = function getParams() {
  return {
    skipColumnGroupHeaders: getBoolean("columnGroups"),
    skipColumnHeaders: getBoolean("skipHeader"),
  };
};

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
