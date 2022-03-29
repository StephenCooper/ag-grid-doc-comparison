import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "@ag-grid-community/vue";
import Vue from "vue";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

class ShowCellRenderer {
  init(params) {
    const cellBlank = !params.value;
    if (cellBlank) {
      return;
    }

    this.ui = document.createElement("div");
    this.ui.innerHTML =
      '<div class="show-name">' +
      params.value.name +
      "" +
      "</div>" +
      '<div class="show-presenter">' +
      params.value.presenter +
      "</div>";
  }

  getGui() {
    return this.ui;
  }

  refresh() {
    return false;
  }
}

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
                :suppressRowTransform="true"></ag-grid-vue>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: "localTime" },
        {
          field: "show",
          cellRenderer: ShowCellRenderer,
          rowSpan: rowSpan,
          cellClassRules: { "show-cell": "value !== undefined" },
          width: 200,
        },
        { field: "a" },
        { field: "b" },
        { field: "c" },
        { field: "d" },
        { field: "e" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        resizable: true,
        width: 170,
      },
      rowData: null,
    };
  },
  created() {
    this.rowData = getData();
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

window.rowSpan = function rowSpan(params) {
  if (params.data.show) {
    return 4;
  } else {
    return 1;
  }
};

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
