import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridVue } from "ag-grid-vue3";
import { createApp } from "vue";

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="test-header" style="padding: 5px; justify-content: space-between">
                <div style="align-items: start;">
                    <button v-on:click="updateRowData(0)">0 Rows</button>
                    <button v-on:click="updateRowData(5)">5 Rows</button>
                    <button v-on:click="updateRowData(50)">50 Rows</button>
                </div>
                <div style="align-items: center;">
                    <label>
                        <input type="checkbox" id="floating-rows" v-on:click="cbFloatingRows()" style="vertical-align: text-top;">
                        <span style="background-color: #00e5ff; width: 15px; height: 15px; border: 1px solid #888; display: inline-block; vertical-align: text-top;"></span>
                        Pinned Rows
                    </label>
                    <button v-on:click="setAutoHeight()">Auto Height</button>
                    <button v-on:click="setFixedHeight()">Fixed Height</button>
                </div>
                <div style="align-items: end;">
                    Row Count = <span id="currentRowCount"></span>
                </div>
            </div>
            <ag-grid-vue
                id="myGrid"
                
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"
                :domLayout="domLayout"
                :animateRows="true"
                :popupParent="popupParent"></ag-grid-vue>
            <div style="border: 10px solid #eee; padding: 10px; margin-top: 20px;">
                <p style="color: #333; text-align: center;">
                    This text is under the grid and should move up and down as the height of the grid changes.
                </p>
                <p style="color: #777;">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                    laborum.
                </p>
                <p style="color: #777;">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                    laborum.
                </p>
                <p style="color: #777;">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                    laborum.
                </p>
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
          headerName: "Core",
          children: [
            { headerName: "ID", field: "id" },
            { field: "make" },
            { field: "price", filter: "agNumberColumnFilter" },
          ],
        },
        {
          headerName: "Extra",
          children: [
            { field: "val1", filter: "agNumberColumnFilter" },
            { field: "val2", filter: "agNumberColumnFilter" },
            { field: "val3", filter: "agNumberColumnFilter" },
            { field: "val4", filter: "agNumberColumnFilter" },
            { field: "val5", filter: "agNumberColumnFilter" },
            { field: "val6", filter: "agNumberColumnFilter" },
            { field: "val7", filter: "agNumberColumnFilter" },
            { field: "val8", filter: "agNumberColumnFilter" },
            { field: "val9", filter: "agNumberColumnFilter" },
            { field: "val10", filter: "agNumberColumnFilter" },
          ],
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        enableRowGroup: true,
        enablePivot: true,
        enableValue: true,
        sortable: true,
        filter: true,
        resizable: true,
      },
      rowData: null,
      domLayout: null,
      popupParent: null,
    };
  },
  created() {
    this.rowData = getData(5);
    this.domLayout = "autoHeight";
    this.popupParent = document.body;
  },
  methods: {
    updateRowData(rowCount) {
      this.gridApi.setRowData(getData(rowCount));
      document.querySelector("#currentRowCount").innerHTML = `${rowCount}`;
    },
    cbFloatingRows() {
      var show = document.getElementById("floating-rows").checked;
      if (show) {
        this.gridApi.setPinnedTopRowData([createRow(999), createRow(998)]);
        this.gridApi.setPinnedBottomRowData([createRow(997), createRow(996)]);
      } else {
        this.gridApi.setPinnedTopRowData();
        this.gridApi.setPinnedBottomRowData();
      }
    },
    setAutoHeight() {
      this.gridApi.setDomLayout("autoHeight");
      // auto height will get the grid to fill the height of the contents,
      // so the grid div should have no height set, the height is dynamic.
      document.querySelector("#myGrid").style.height = "";
    },
    setFixedHeight() {
      // we could also call setDomLayout() here as normal is the default
      this.gridApi.setDomLayout("normal");
      // when auto height is off, the grid ahs a fixed height, and then the grid
      // will provide scrollbars if the data does not fit into it.
      document.querySelector("#myGrid").style.height = "400px";
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      document.querySelector("#currentRowCount").innerHTML = "5";
    },
  },
};

window.createRow = function createRow(index) {
  var makes = ["Toyota", "Ford", "BMW", "Phantom", "Porsche"];
  return {
    id: "D" + (1000 + index),
    make: makes[Math.floor(Math.random() * makes.length)],
    price: Math.floor(Math.random() * 100000),
    val1: Math.floor(Math.random() * 1000),
    val2: Math.floor(Math.random() * 1000),
    val3: Math.floor(Math.random() * 1000),
    val4: Math.floor(Math.random() * 1000),
    val5: Math.floor(Math.random() * 1000),
    val6: Math.floor(Math.random() * 1000),
    val7: Math.floor(Math.random() * 1000),
    val8: Math.floor(Math.random() * 1000),
    val9: Math.floor(Math.random() * 1000),
    val10: Math.floor(Math.random() * 1000),
  };
};

window.getData = function getData(count) {
  var rowData = [];
  for (var i = 0; i < count; i++) {
    rowData.push(createRow(i));
  }
  return rowData;
};

createApp(VueExample).mount("#app");
