import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "@ag-grid-community/vue3";
import { createApp } from "vue";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

class SlowCellRenderer {
  init(p) {
    const start = new Date().valueOf();
    while (new Date().valueOf() - start < 15) {
      this.eGui = document.createElement("span");
    }
    this.eGui = document.createElement("span");
    this.eGui.innerHTML = `${++count}`;
  }

  getGui() {
    return this.eGui;
  }

  refresh() {
    return false;
  }
}

const VueExample = {
  template: `
        <div style="height: 100%">
            <div><label class="infoLabel">Try Scrolling!</label></div>
            <ag-grid-vue
                
                style="width: 100%; height: 95%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"
                :rowSelection="rowSelection"
                :rowBuffer="rowBuffer"></ag-grid-vue>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: "1" },
        { field: "2" },
        { field: "3" },
        { field: "4" },
        { field: "5" },
        { field: "6" },
        { field: "7" },
        { field: "8" },
        { field: "9" },
        { field: "10" },
        { field: "11" },
        { field: "12" },
        { field: "13" },
        { field: "14" },
        { field: "15" },
        { field: "16" },
        { field: "17" },
        { field: "18" },
        { field: "19" },
        { field: "20" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 80,
        cellRenderer: SlowCellRenderer,
      },
      rowData: null,
      rowSelection: null,
      rowBuffer: null,
    };
  },
  created() {
    this.rowData = getRowData();
    this.rowSelection = "single";
    this.rowBuffer = 0;
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

window.getRowData = function getRowData() {
  // 1000 blank rows for the grid
  return Array.apply(null, Array(1000));
};

let count = 0;

createApp(VueExample).mount("#app");
