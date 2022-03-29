import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue3";
import { createApp } from "vue";

const VueExample = {
  template: `
        <div style="height: 100%">
            <div style="display: flex; flex-direction: column; height: 100%;">
                <div style="margin-bottom: 10px;">
                    <button v-on:click="insertItemsAt2AndRefresh(5)">Insert Rows</button>
                    <button v-on:click="removeItem(3, 10)">Delete Rows</button>
                    <button v-on:click="setRowCountTo200()">Set Row Count</button>
                    <button v-on:click="rowsAndMaxFound()">Print Info</button>
                    <button v-on:click="jumpTo500()">Jump to 500</button>
                    <button v-on:click="printCacheState()">Print Cache State</button>
                </div>
                <div style="margin-bottom: 10px;">
                    <button v-on:click="setPricesHigh()">Set Prices High</button>
                    <button v-on:click="setPricesLow()">Set Prices Low</button>
                    <button v-on:click="refreshCache()">Refresh Cache</button>
                    <button v-on:click="purgeCache()">Purge Cache</button>
                </div>
                <div style="flex-grow: 1;">
                    <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :datasource="datasource"
                :defaultColDef="defaultColDef"
                :rowSelection="rowSelection"
                :rowModelType="rowModelType"
                :maxBlocksInCache="maxBlocksInCache"
                :infiniteInitialRowCount="infiniteInitialRowCount"
                :maxConcurrentDatasourceRequests="maxConcurrentDatasourceRequests"
                :getRowId="getRowId"
                :getRowStyle="getRowStyle"></ag-grid-vue>
                </div>
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
          headerName: "Item ID",
          field: "id",
          valueGetter: "node.id",
          cellRenderer: (params) => {
            if (params.value !== undefined) {
              return params.value;
            } else {
              return '<img src="https://www.ag-grid.com/example-assets/loading.gif">';
            }
          },
        },
        { field: "make" },
        { field: "model" },
        { field: "price", valueFormatter: valueFormatter },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        resizable: true,
      },
      datasource: null,
      rowSelection: null,
      rowModelType: null,
      maxBlocksInCache: null,
      infiniteInitialRowCount: null,
      maxConcurrentDatasourceRequests: null,
      getRowId: null,
      getRowStyle: null,
    };
  },
  created() {
    this.datasource = {
      rowCount: undefined,
      getRows: (params) => {
        console.log("asking for " + params.startRow + " to " + params.endRow);
        // At this point in your code, you would call the server.
        // To make the demo look real, wait for 500ms before returning
        setTimeout(function () {
          // take a slice of the total rows
          const rowsThisPage = allOfTheData.slice(
            params.startRow,
            params.endRow
          );
          // make a copy of each row - this is what would happen if taking data from server
          for (let i = 0; i < rowsThisPage.length; i++) {
            const item = rowsThisPage[i];
            // this is a trick to copy an object
            const itemCopy = JSON.parse(JSON.stringify(item));
            rowsThisPage[i] = itemCopy;
          }
          // if on or after the last page, work out the last row.
          let lastRow = -1;
          if (allOfTheData.length <= params.endRow) {
            lastRow = allOfTheData.length;
          }
          // call the success callback
          params.successCallback(rowsThisPage, lastRow);
        }, 500);
      },
    };
    this.rowSelection = "multiple";
    this.rowModelType = "infinite";
    this.maxBlocksInCache = 2;
    this.infiniteInitialRowCount = 500;
    this.maxConcurrentDatasourceRequests = 2;
    this.getRowId = (params) => {
      return params.data.id.toString();
    };
    this.getRowStyle = (params) => {
      if (params.data && params.data.make === "Honda") {
        return {
          fontWeight: "bold",
        };
      } else {
        return undefined;
      }
    };
  },
  methods: {
    insertItemsAt2AndRefresh(count) {
      insertItemsAt2(count);
      // if the data has stopped looking for the last row, then we need to adjust the
      // row count to allow for the extra data, otherwise the grid will not allow scrolling
      // to the last row. eg if we have 1000 rows, scroll all the way to the bottom (so
      // maxRowFound=true), and then add 5 rows, the rowCount needs to be adjusted
      // to 1005, so grid can scroll to the end. the grid does NOT do this for you in the
      // refreshVirtualPageCache() method, as this would be assuming you want to do it which
      // is not true, maybe the row count is constant and you just want to refresh the details.
      const maxRowFound = this.gridApi.isLastRowIndexKnown();
      if (maxRowFound) {
        const rowCount = this.gridApi.getInfiniteRowCount() || 0;
        this.gridApi.setRowCount(rowCount + count);
      }
      // get grid to refresh the data
      this.gridApi.refreshInfiniteCache();
    },
    removeItem(start, limit) {
      allOfTheData.splice(start, limit);
      this.gridApi.refreshInfiniteCache();
    },
    refreshCache() {
      this.gridApi.refreshInfiniteCache();
    },
    purgeCache() {
      this.gridApi.purgeInfiniteCache();
    },
    setRowCountTo200() {
      this.gridApi.setRowCount(200, false);
    },
    rowsAndMaxFound() {
      console.log(
        "getInfiniteRowCount() => " + this.gridApi.getInfiniteRowCount()
      );
      console.log(
        "isLastRowIndexKnown() => " + this.gridApi.isLastRowIndexKnown()
      );
    },
    // function just gives new prices to the row data, it does not update the grid
    setPricesHigh() {
      allOfTheData.forEach(function (dataItem) {
        dataItem.price = Math.round(55500 + 400 * (0.5 + Math.random()));
      });
    },
    setPricesLow() {
      allOfTheData.forEach(function (dataItem) {
        dataItem.price = Math.round(1000 + 100 * (0.5 + Math.random()));
      });
    },
    printCacheState() {
      console.log("*** Cache State ***");
      console.log(this.gridApi.getCacheBlockState());
    },
    jumpTo500() {
      // first up, need to make sure the grid is actually showing 500 or more rows
      if ((this.gridApi.getInfiniteRowCount() || 0) < 501) {
        this.gridApi.setRowCount(501, false);
      }
      // next, we can jump to the row
      this.gridApi.ensureIndexVisible(500);
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      sequenceId = 1;
      allOfTheData = [];
      for (let i = 0; i < 1000; i++) {
        allOfTheData.push(createRowData(sequenceId++));
      }
    },
  },
};

window.createRowData = function createRowData(id) {
  const makes = ["Toyota", "Ford", "Porsche", "Chevy", "Honda", "Nissan"];
  const models = [
    "Cruze",
    "Celica",
    "Mondeo",
    "Boxter",
    "Genesis",
    "Accord",
    "Taurus",
  ];
  return {
    id: id,
    make: makes[id % makes.length],
    model: models[id % models.length],
    price: 72000,
  };
};

window.insertItemsAt2 = function insertItemsAt2(count) {
  const newDataItems = [];
  for (let i = 0; i < count; i++) {
    const newItem = createRowData(sequenceId++);
    allOfTheData.splice(2, 0, newItem);
    newDataItems.push(newItem);
  }
  return newDataItems;
};

const valueFormatter = function (params) {
  if (typeof params.value === "number") {
    return "£" + params.value.toLocaleString();
  } else {
    return params.value;
  }
};

// this counter is used to give id's to the rows
var sequenceId = 0;

var allOfTheData = [];

createApp(VueExample).mount("#app");
