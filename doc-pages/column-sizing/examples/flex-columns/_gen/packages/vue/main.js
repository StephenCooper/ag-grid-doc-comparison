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
                :rowData="rowData"></ag-grid-vue>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { headerName: "A", field: "author", width: 300, colSpan: colSpan },
        {
          headerName: "Flexed Columns",
          children: [
            { headerName: "B", minWidth: 200, maxWidth: 350, flex: 2 },
            { headerName: "C", flex: 1 },
          ],
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        resizable: true,
      },
      rowData: null,
    };
  },
  created() {
    this.rowData = [1, 2];
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      setInterval(fillAllCellsWithWidthMeasurement, 50);
    },
  },
};

window.fillAllCellsWithWidthMeasurement =
  function fillAllCellsWithWidthMeasurement() {
    Array.prototype.slice
      .call(document.querySelectorAll(".ag-cell"))
      .forEach(function (cell) {
        var width = cell.offsetWidth;
        var isFullWidthRow = cell.parentElement.childNodes.length === 1;
        cell.textContent =
          (isFullWidthRow ? "Total width: " : "") + width + "px";
      });
  };

var colSpan = function (params) {
  return params.data === 2 ? 3 : 1;
};

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
