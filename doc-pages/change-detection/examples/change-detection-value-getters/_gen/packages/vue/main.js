import Vue from "vue";
import { AgGridVue } from "ag-grid-vue";
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
                :columnTypes="columnTypes"
                :rowData="rowData"
                :groupDefaultExpanded="groupDefaultExpanded"
                :suppressAggFuncInHeader="true"
                :enableCellChangeFlash="true"
                :animateRows="true"></ag-grid-vue>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: "a", type: "valueColumn" },
        { field: "b", type: "valueColumn" },
        { field: "c", type: "valueColumn" },
        { field: "d", type: "valueColumn" },
        { field: "e", type: "valueColumn" },
        { field: "f", type: "valueColumn" },
        {
          headerName: "Total",
          valueGetter: "data.a + data.b + data.c + data.d + data.e + data.f",
          editable: false,
          cellClass: "total-col",
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        sortable: true,
      },
      columnTypes: null,
      rowData: null,
      groupDefaultExpanded: null,
    };
  },
  created() {
    this.columnTypes = {
      valueColumn: {
        editable: true,
        valueParser: "Number(newValue)",
        filter: "agNumberColumnFilter",
      },
    };
    this.rowData = getRowData();
    this.groupDefaultExpanded = 1;
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

window.getRowData = function getRowData() {
  var rowData = [];
  for (var i = 1; i <= 20; i++) {
    rowData.push({
      group: i < 5 ? "A" : "B",
      a: (i * 863) % 100,
      b: (i * 811) % 100,
      c: (i * 743) % 100,
      d: (i * 677) % 100,
      e: (i * 619) % 100,
      f: (i * 571) % 100,
    });
  }
  return rowData;
};

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
