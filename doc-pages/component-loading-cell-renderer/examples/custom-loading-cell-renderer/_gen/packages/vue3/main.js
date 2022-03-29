import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridVue } from "ag-grid-vue3";
import { createApp } from "vue";
import CustomLoadingCellRenderer from "./customLoadingCellRendererVue.js";

const VueExample = {
  template: `
        <div style="height: 100%">
            <div style="height: 100%; padding-top: 25px; box-sizing: border-box;">
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :loadingCellRenderer="loadingCellRenderer"
                :loadingCellRendererParams="loadingCellRendererParams"
                :rowModelType="rowModelType"
                :serverSideStoreType="serverSideStoreType"
                :cacheBlockSize="cacheBlockSize"
                :maxBlocksInCache="maxBlocksInCache"
                :animateRows="true"></ag-grid-vue>
            </div>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
    CustomLoadingCellRenderer,
  },
  data: function () {
    return {
      columnDefs: [
        { field: "id" },
        { field: "athlete", width: 150 },
        { field: "age" },
        { field: "country" },
        { field: "year" },
        { field: "sport" },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        editable: true,
        sortable: true,
        flex: 1,
        minWidth: 100,
        filter: true,
        resizable: true,
      },
      loadingCellRenderer: null,
      loadingCellRendererParams: null,
      rowModelType: null,
      serverSideStoreType: null,
      cacheBlockSize: null,
      maxBlocksInCache: null,
    };
  },
  created() {
    this.loadingCellRenderer = "CustomLoadingCellRenderer";
    this.loadingCellRendererParams = {
      loadingMessage: "One moment please...",
    };
    this.rowModelType = "serverSide";
    this.serverSideStoreType = "partial";
    this.cacheBlockSize = 100;
    this.maxBlocksInCache = 10;
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => {
        // add id to data
        let idSequence = 0;
        data.forEach((item) => {
          item.id = idSequence++;
        });
        const server = getFakeServer(data);
        const datasource = getServerSideDatasource(server);
        params.api.setServerSideDatasource(datasource);
      };

      fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

window.getServerSideDatasource = function getServerSideDatasource(server) {
  return {
    getRows: (params) => {
      // adding delay to simulate real server call
      setTimeout(() => {
        const response = server.getResponse(params.request);
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
      }, 2000);
    },
  };
};

window.getFakeServer = function getFakeServer(allData) {
  return {
    getResponse: (request) => {
      console.log(
        "asking for rows: " + request.startRow + " to " + request.endRow
      );
      // take a slice of the total rows
      const rowsThisPage = allData.slice(request.startRow, request.endRow);
      // if on or after the last page, work out the last row.
      const lastRow =
        allData.length <= (request.endRow || 0) ? allData.length : -1;
      return {
        success: true,
        rows: rowsThisPage,
        lastRow: lastRow,
      };
    },
  };
};

createApp(VueExample).mount("#app");
