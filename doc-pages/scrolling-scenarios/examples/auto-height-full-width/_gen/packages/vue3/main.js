import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridVue } from "ag-grid-vue3";
import { createApp } from "vue";

const VueExample = {
  template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"
                :pagination="true"
                :paginationPageSize="paginationPageSize"
                :statusBar="statusBar"
                :enableRangeSelection="true"
                :domLayout="domLayout"
                :isFullWidthRow="isFullWidthRow"
                :fullWidthCellRenderer="fullWidthCellRenderer"></ag-grid-vue>
            <p>
                This text is under the grid and should move up and down as the height of the grid changes.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
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
            { headerName: "Make", field: "make" },
            { headerName: "Price", field: "price", filter: "number" },
          ],
        },
        {
          headerName: "Extra",
          children: [
            {
              headerName: "Val 1",
              field: "val1",
              filter: "number",
              pinned: "left",
            },
            {
              headerName: "Val 2",
              field: "val2",
              filter: "number",
              pinned: "left",
            },
            { headerName: "Val 3", field: "val3", filter: "number" },
            { headerName: "Val 4", field: "val4", filter: "number" },
            { headerName: "Val 5", field: "val5", filter: "number" },
            { headerName: "Val 6", field: "val6", filter: "number" },
            { headerName: "Val 7", field: "val7", filter: "number" },
            { headerName: "Val 8", field: "val8", filter: "number" },
            {
              headerName: "Val 9",
              field: "val9",
              filter: "number",
              pinned: "right",
            },
            {
              headerName: "Val 10",
              field: "val10",
              filter: "number",
              pinned: "right",
            },
          ],
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        enableRowGroup: true,
        enablePivot: true,
        enableValue: true,
        width: 100,
        sortable: true,
        resizable: true,
        filter: true,
        flex: 1,
        minWidth: 100,
      },
      rowData: null,
      paginationPageSize: null,
      statusBar: null,
      domLayout: null,
    };
  },
  created() {
    this.rowData = createRowData();
    this.paginationPageSize = 10;
    this.statusBar = {
      statusPanels: [{ statusPanel: "agAggregationComponent" }],
    };
    this.domLayout = "autoHeight";
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
    isFullWidthRow(params) {
      return params.rowNode.data.fullWidth;
    },
    fullWidthCellRenderer(params) {
      // pinned rows will have node.floating set to either 'top' or 'bottom' - see docs for floating
      let cssClass;
      let message;
      if (params.node.rowPinned) {
        cssClass = "example-full-width-floating-row";
        message = "Floating full width row at index " + params.rowIndex;
      } else {
        cssClass = "example-full-width-row";
        message = "Normal full width row at index" + params.rowIndex;
      }
      const eDiv = document.createElement("div");
      eDiv.innerHTML = `<div class="${cssClass}"><button>Click</button> ${message}</div>`;
      const eButton = eDiv.querySelector("button");
      eButton.addEventListener("click", function () {
        alert("button clicked");
      });
      return eDiv;
    },
  },
};

window.createRow = function createRow(index) {
  return {
    id: "D" + (1000 + index),
    make: makes[Math.floor(Math.random() * makes.length)],
    price: Math.floor(Math.random() * 100000),
    // every third row is full width
    fullWidth: index % 3 === 0,
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

window.createRowData = function createRowData() {
  const rowData = [];
  for (let i = 0; i < 15; i++) {
    rowData.push(createRow(i));
  }
  return rowData;
};

const makes = ["Toyota", "Ford", "BMW", "Phantom", "Porsche"];

createApp(VueExample).mount("#app");
