import { createApp } from "vue";
import { AgGridVue } from "@ag-grid-community/vue3";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule]);

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
                :getRowId="getRowId"></ag-grid-vue>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: "code", maxWidth: 90 },
        { field: "name", minWidth: 200 },
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
        minWidth: 100,
        resizable: true,
      },
      getRowId: null,
    };
  },
  created() {
    this.getRowId = (params) => {
      return params.data.code;
    };
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const mockServer = createMockServer(),
        initialLoad$ = mockServer.initialLoad(),
        updates$ = mockServer.allDataUpdates();
      initialLoad$.subscribe(function (rowData) {
        // the initial full set of data
        // note that we don't need to un-subscribe here as it's a one off data load
        params.api.setRowData(rowData);
        // now listen for updates
        // we're using immutableData this time, so although we're setting the entire
        // data set here, the grid will only re-render changed rows, improving performance
        updates$.subscribe(function (newRowData) {
          return params.api.setRowData(newRowData);
        });
      });
    },
  },
};

window.numberFormatter = function numberFormatter(params) {
  if (typeof params.value === "number") {
    return params.value.toFixed(2);
  }
  return params.value;
};

createApp(VueExample).mount("#app");
