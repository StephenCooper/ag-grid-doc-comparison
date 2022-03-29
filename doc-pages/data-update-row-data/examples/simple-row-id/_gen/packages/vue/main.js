import Vue from "vue";
import { AgGridVue } from "ag-grid-vue";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const VueExample = {
  template: `
        <div style="height: 100%">
            <div style="height: 100%; width: 100%; display: flex; flex-direction: column;">
                <div style="margin-bottom: 5px; min-height: 30px;">
                    <button v-on:click="onRowDataA()">Row Data A</button>
                    <button v-on:click="onRowDataB()">Row Data B</button>
                </div>
                <div style="flex: 1 1 0px;">
                    <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :rowData="rowData"
                :rowSelection="rowSelection"
                :animateRows="true"
                :getRowId="getRowId"></ag-grid-vue>
                </div>
            </div>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [{ field: "make" }, { field: "model" }, { field: "price" }],
      gridApi: null,
      columnApi: null,

      rowData: null,
      rowSelection: null,
      getRowId: null,
    };
  },
  created() {
    this.rowData = rowDataA;
    this.rowSelection = "single";
    this.getRowId = (params) => params.data.id;
  },
  methods: {
    onRowDataA() {
      this.gridApi.setRowData(rowDataA);
    },
    onRowDataB() {
      this.gridApi.setRowData(rowDataB);
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

// specify the data
var rowDataA = [
  { id: "1", make: "Toyota", model: "Celica", price: 35000 },
  { id: "4", make: "BMW", model: "M50", price: 60000 },
  { id: "5", make: "Aston Martin", model: "DBX", price: 190000 },
];

var rowDataB = [
  { id: "1", make: "Toyota", model: "Celica", price: 35000 },
  { id: "2", make: "Ford", model: "Mondeo", price: 32000 },
  { id: "3", make: "Porsche", model: "Boxter", price: 72000 },
  { id: "4", make: "BMW", model: "M50", price: 60000 },
  { id: "5", make: "Aston Martin", model: "DBX", price: 190000 },
];

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
