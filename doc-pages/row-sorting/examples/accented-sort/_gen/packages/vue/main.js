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
                :animateRows="true"
                :sortingOrder="sortingOrder"
                :accentedSort="true"
                :rowData="rowData"></ag-grid-vue>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [{ field: "accented", width: 150 }],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        sortable: true,
      },
      sortingOrder: null,
      rowData: null,
    };
  },
  created() {
    this.sortingOrder = ["desc", "asc", null];
    this.rowData = [
      { accented: "aáàä" },
      { accented: "aàáä" },
      { accented: "aäàá" },
    ];
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
