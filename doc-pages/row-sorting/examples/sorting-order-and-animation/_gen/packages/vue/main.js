import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
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
                :rowData="rowData"
                :animateRows="true"
                :sortingOrder="sortingOrder"></ag-grid-vue>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: "athlete", sortingOrder: ["asc", "desc"] },
        { field: "age", width: 90, sortingOrder: ["desc", "asc"] },
        { field: "country", sortingOrder: ["desc", null] },
        { field: "year", width: 90, sortingOrder: ["asc"] },
        { field: "date" },
        { field: "sport" },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
        { field: "total" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        width: 170,
        sortable: true,
      },
      sortingOrder: null,
      rowData: null,
    };
  },
  created() {
    this.sortingOrder = ["desc", "asc", null];
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

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
