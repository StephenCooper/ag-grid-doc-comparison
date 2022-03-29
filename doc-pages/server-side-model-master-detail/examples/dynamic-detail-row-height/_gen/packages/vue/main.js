import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import "ag-grid-enterprise";
import { AgGridVue } from "ag-grid-vue";
import Vue from "vue";

const VueExample = {
  template: `
        <div style="height: 100%">
            <div style="height: 100%; box-sizing: border-box;">
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine-dark"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :animateRows="true"
                :rowModelType="rowModelType"
                :serverSideStoreType="serverSideStoreType"
                :masterDetail="true"
                :detailCellRendererParams="detailCellRendererParams"
                :getRowHeight="getRowHeight"></ag-grid-vue>
            </div>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        {
          field: "accountId",
          maxWidth: 200,
          cellRenderer: "agGroupCellRenderer",
        },
        { field: "name" },
        { field: "country" },
        { field: "calls" },
        { field: "totalDuration" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
      },
      rowModelType: null,
      serverSideStoreType: null,
      detailCellRendererParams: null,
      getRowHeight: null,
    };
  },
  created() {
    this.rowModelType = "serverSide";
    this.serverSideStoreType = "partial";
    this.detailCellRendererParams = {
      detailGridOptions: {
        columnDefs: [
          { field: "callId" },
          { field: "direction" },
          { field: "duration", valueFormatter: "x.toLocaleString() + 's'" },
          { field: "switchCode" },
          { field: "number" },
        ],
        domLayout: "autoHeight",
        defaultColDef: {
          flex: 1,
        },
      },
      getDetailRowData: (params) => {
        // supply details records to detail cell renderer (i.e. detail grid)
        params.successCallback(params.data.callRecords);
      },
    };
    this.getRowHeight = (params) => {
      if (params.node && params.node.detail) {
        var offset = 60;
        var sizes = params.api.getSizesForCurrentTheme() || {};
        var allDetailRowHeight =
          params.data.callRecords.length * sizes.rowHeight;
        return allDetailRowHeight + (sizes.headerHeight || 0) + offset;
      }
    };
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      setTimeout(function () {
        // expand some master row
        var someRow = params.api.getRowNode("1");
        if (someRow) {
          someRow.setExpanded(true);
        }
      }, 1000);

      const updateData = (data) => {
        // setup the fake server with entire dataset
        var fakeServer = new FakeServer(data);
        // create datasource with a reference to the fake server
        var datasource = getServerSideDatasource(fakeServer);
        // register the datasource with the grid
        params.api.setServerSideDatasource(datasource);
      };

      fetch("https://www.ag-grid.com/example-assets/call-data.json")
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

window.getServerSideDatasource = function getServerSideDatasource(server) {
  return {
    getRows: function (params) {
      console.log("[Datasource] - rows requested by grid: ", params.request);
      var response = server.getData(params.request);
      // adding delay to simulate real server call
      setTimeout(function () {
        if (response.success) {
          // call the success callback
          params.success({
            rowData: response.rows,
            rowCount: response.lastRow,
          });
        } else {
          // inform the grid request failed
          params.fail();
        }
      }, 200);
    },
  };
};

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
