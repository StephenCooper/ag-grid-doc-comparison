import Vue from "vue";
import { AgGridVue } from "ag-grid-vue";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import FullWidthCellRenderer from "./fullWidthCellRendererVue.js";

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
                :rowDragManaged="true"
                :getRowHeight="getRowHeight"
                :isFullWidthRow="isFullWidthRow"
                :fullWidthCellRenderer="fullWidthCellRenderer"
                :animateRows="true"></ag-grid-vue>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
    FullWidthCellRenderer,
  },
  data: function () {
    return {
      columnDefs: [
        { field: "name", cellRenderer: countryCellRenderer },
        { field: "continent" },
        { field: "language" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        sortable: true,
        resizable: true,
        filter: true,
      },
      rowData: null,
      getRowHeight: null,
      isFullWidthRow: null,
      fullWidthCellRenderer: null,
    };
  },
  created() {
    this.rowData = getData();
    this.getRowHeight = (params) => {
      // return 100px height for full width rows
      if (isFullWidth(params.data)) {
        return 100;
      }
    };
    this.isFullWidthRow = (params) => {
      return isFullWidth(params.rowNode.data);
    };
    this.fullWidthCellRenderer = "FullWidthCellRenderer";
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

window.countryCellRenderer = function countryCellRenderer(params) {
  if (!params.fullWidth) {
    return params.value;
  }
  var flag =
    '<img border="0" width="15" height="10" src="https://www.ag-grid.com/example-assets/flags/' +
    params.data.code +
    '.png">';
  return (
    '<span style="cursor: default;">' + flag + " " + params.value + "</span>"
  );
};

window.isFullWidth = function isFullWidth(data) {
  // return true when country is Peru, France or Italy
  return ["Peru", "France", "Italy"].indexOf(data.name) >= 0;
};

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
