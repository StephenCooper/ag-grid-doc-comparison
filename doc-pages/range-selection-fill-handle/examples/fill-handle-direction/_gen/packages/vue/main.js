import Vue from "vue";
import { AgGridVue } from "ag-grid-vue";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div style="margin-bottom: 5px">
                    <label>Axis: </label>
                    <button class="ag-fill-direction xy" v-on:click="fillHandleAxis('xy')">xy</button>
                    <button class="ag-fill-direction x selected" v-on:click="fillHandleAxis('x')">x only</button>
                    <button class="ag-fill-direction y" v-on:click="fillHandleAxis('y')">y only</button>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :enableRangeSelection="true"
                :enableFillHandle="true"
                :fillHandleDirection="fillHandleDirection"
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
        { field: "athlete", minWidth: 150 },
        { field: "age", maxWidth: 90 },
        { field: "country", minWidth: 150 },
        { field: "year", maxWidth: 90 },
        { field: "date", minWidth: 150 },
        { field: "sport", minWidth: 150 },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
        { field: "total" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        editable: true,
      },
      fillHandleDirection: null,
      rowData: null,
    };
  },
  created() {
    this.fillHandleDirection = "x";
  },
  methods: {
    fillHandleAxis(direction) {
      var buttons = Array.prototype.slice.call(
        document.querySelectorAll(".ag-fill-direction")
      );
      var button = document.querySelector(".ag-fill-direction." + direction);
      buttons.forEach(function (btn) {
        btn.classList.remove("selected");
      });
      button.classList.add("selected");
      this.gridApi.setFillHandleDirection(direction);
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
