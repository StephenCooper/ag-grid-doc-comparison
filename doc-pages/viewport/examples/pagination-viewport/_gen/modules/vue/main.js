import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "@ag-grid-community/vue";
import { ViewportRowModelModule } from "@ag-grid-enterprise/viewport-row-model";
import Vue from "vue";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ViewportRowModelModule]);

class RowIndexRenderer {
  init(params) {
    this.eGui = document.createElement("div");
    this.eGui.innerHTML = "" + params.rowIndex;
  }
  refresh(params) {
    return false;
  }
  getGui() {
    return this.eGui;
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
                :enableRangeSelection="true"
                :rowModelType="rowModelType"
                :pagination="true"
                :paginationAutoPageSize="true"
                :viewportRowModelPageSize="viewportRowModelPageSize"
                :viewportRowModelBufferSize="viewportRowModelBufferSize"
                :getRowId="getRowId"></ag-grid-vue>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { headerName: "#", maxWidth: 80, cellRenderer: RowIndexRenderer },
        { field: "code", maxWidth: 90 },
        { field: "name", minWidth: 220 },
        {
          field: "bid",
          cellClass: "cell-number",
          valueFormatter: numberFormatter,
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
        {
          field: "mid",
          cellClass: "cell-number",
          valueFormatter: numberFormatter,
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
        {
          field: "ask",
          cellClass: "cell-number",
          valueFormatter: numberFormatter,
          cellRenderer: "agAnimateShowChangeCellRenderer",
        },
        {
          field: "volume",
          cellClass: "cell-number",
          cellRenderer: "agAnimateSlideCellRenderer",
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 140,
        resizable: true,
      },
      rowModelType: null,
      viewportRowModelPageSize: null,
      viewportRowModelBufferSize: null,
      getRowId: null,
    };
  },
  created() {
    this.rowModelType = "viewport";
    this.viewportRowModelPageSize = 1;
    this.viewportRowModelBufferSize = 0;
    this.getRowId = (params) => {
      // the code is unique, so perfect for the id
      return params.data.code;
    };
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => {
        // set up a mock server - real code will not do this, it will contact your
        // real server to get what it needs
        var mockServer = createMockServer();
        mockServer.init(data);
        var viewportDatasource = createViewportDatasource(mockServer);
        params.api.setViewportDatasource(viewportDatasource);
        // put the 'size cols to fit' into a timeout, so that the scroll is taken into consideration
        setTimeout(function () {
          params.api.sizeColumnsToFit();
        }, 100);
      };

      fetch("https://www.ag-grid.com/example-assets/stocks.json")
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

window.numberFormatter = function numberFormatter(params) {
  if (typeof params.value === "number") {
    return params.value.toFixed(2);
  } else {
    return params.value;
  }
};

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
