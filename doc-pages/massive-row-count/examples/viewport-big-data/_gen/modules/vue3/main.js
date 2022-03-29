import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "@ag-grid-community/vue3";
import { ViewportRowModelModule } from "@ag-grid-enterprise/viewport-row-model";
import { createApp } from "vue";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ViewportRowModelModule]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :rowHeight="rowHeight"
                :rowModelType="rowModelType"
                :viewportDatasource="viewportDatasource"></ag-grid-vue>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { headerName: "ID", field: "id" },
        {
          headerName: "Expected Position",
          valueGetter: "'translateY(' + node.rowIndex * 100 + 'px)'",
        },
        { field: "a" },
        { field: "b" },
        { field: "c" },
      ],
      gridApi: null,
      columnApi: null,

      rowHeight: null,
      rowModelType: null,
      viewportDatasource: null,
    };
  },
  created() {
    this.rowHeight = 100;
    this.rowModelType = "viewport";
    this.viewportDatasource = createViewportDatasource();
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

window.createViewportDatasource = function createViewportDatasource() {
  let initParams;
  return {
    init: (params) => {
      initParams = params;
      var oneMillion = 1000 * 1000;
      params.setRowCount(oneMillion);
    },
    setViewportRange(firstRow, lastRow) {
      var rowData = {};
      for (var rowIndex = firstRow; rowIndex <= lastRow; rowIndex++) {
        var item = {};
        item.id = rowIndex;
        item.a = "A-" + rowIndex;
        item.b = "B-" + rowIndex;
        item.c = "C-" + rowIndex;
        rowData[rowIndex] = item;
      }
      initParams.setRowData(rowData);
    },
    destroy: () => {},
  };
};

createApp(VueExample).mount("#app");
