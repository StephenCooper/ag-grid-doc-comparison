import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
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

      var mockServer = createMockServer(),
        initialLoad$ = mockServer.initialLoad(),
        updates$ = mockServer.byRowupdates();
      initialLoad$.subscribe(function (rowData) {
        // the initial full set of data
        // note that we don't need to un-subscribe here as it's a one off data load
        params.api.setRowData(rowData);
        // now listen for updates
        // we process the updates with a transaction - this ensures that only the changes
        // rows will get re-rendered, improving performance
        updates$.subscribe(function (updates) {
          return params.api.applyTransaction({ update: updates });
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

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
