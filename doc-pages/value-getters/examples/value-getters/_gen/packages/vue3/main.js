import { createApp } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";

const VueExample = {
  template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine-dark"
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
        { headerName: "#", maxWidth: 100, valueGetter: hashValueGetter },
        { field: "a" },
        { field: "b" },
        { headerName: "A + B", colId: "a&b", valueGetter: abValueGetter },
        { headerName: "A * 1000", minWidth: 95, valueGetter: a1000ValueGetter },
        { headerName: "B * 137", minWidth: 90, valueGetter: b137ValueGetter },
        { headerName: "Random", minWidth: 90, valueGetter: randomValueGetter },
        { headerName: "Chain", valueGetter: chainValueGetter },
        { headerName: "Const", minWidth: 85, valueGetter: constValueGetter },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 75,
        // cellClass: 'number-cell'
      },
      rowData: null,
    };
  },
  created() {
    this.rowData = createRowData();
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

window.abValueGetter = function abValueGetter(params) {
  return params.data.a + params.data.b;
};

window.createRowData = function createRowData() {
  var rowData = [];
  for (var i = 0; i < 100; i++) {
    rowData.push({
      a: Math.floor(i % 4),
      b: Math.floor(i % 7),
    });
  }
  return rowData;
};

var hashValueGetter = function (params) {
  return params.node ? params.node.rowIndex : null;
};

var a1000ValueGetter = function (params) {
  return params.data.a * 1000;
};

var b137ValueGetter = function (params) {
  return params.data.b * 137;
};

var randomValueGetter = function () {
  return Math.floor(Math.random() * 1000);
};

var chainValueGetter = function (params) {
  return params.getValue("a&b") * 1000;
};

var constValueGetter = function () {
  return 99999;
};

createApp(VueExample).mount("#app");
