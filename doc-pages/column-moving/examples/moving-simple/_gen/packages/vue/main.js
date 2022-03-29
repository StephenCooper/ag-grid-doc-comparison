import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue";
import Vue from "vue";

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div style="margin-bottom: 1rem;">
                    <button v-on:click="onMedalsFirst()">Medals First</button>
                    <button v-on:click="onMedalsLast()">Medals Last</button>
                    <button v-on:click="onCountryFirst()">Country First</button>
                    <button v-on:click="onSwapFirstTwo()">Swap First Two</button>
                    <button v-on:click="onPrintColumns()">Print Columns</button>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :suppressDragLeaveHidesColumns="true"
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
        { field: "athlete" },
        { field: "age" },
        { field: "country" },
        { field: "year" },
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
        width: 150,
      },
      rowData: null,
    };
  },
  created() {},
  methods: {
    onMedalsFirst() {
      this.gridColumnApi.moveColumns(["gold", "silver", "bronze", "total"], 0);
    },
    onMedalsLast() {
      this.gridColumnApi.moveColumns(["gold", "silver", "bronze", "total"], 6);
    },
    onCountryFirst() {
      this.gridColumnApi.moveColumn("country", 0);
    },
    onSwapFirstTwo() {
      this.gridColumnApi.moveColumnByIndex(0, 1);
    },
    onPrintColumns() {
      const cols = this.gridColumnApi.getAllGridColumns();
      const colToNameFunc = (col, index) => index + " = " + col.getId();
      const colNames = cols.map(colToNameFunc).join(", ");
      console.log("columns are: " + colNames);
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
