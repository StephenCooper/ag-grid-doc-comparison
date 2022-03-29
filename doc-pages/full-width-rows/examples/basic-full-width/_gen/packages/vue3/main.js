import { createApp } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import FullWidthCellRenderer from "./fullWidthCellRendererVue.js";

const VueExample = {
  template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :rowData="rowData"
                :pinnedTopRowData="pinnedTopRowData"
                :pinnedBottomRowData="pinnedBottomRowData"
                :isFullWidthRow="isFullWidthRow"
                :fullWidthCellRenderer="fullWidthCellRenderer"
                :getRowHeight="getRowHeight"></ag-grid-vue>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
    FullWidthCellRenderer,
  },
  data: function () {
    return {
      columnDefs: getColumnDefs(),
      gridApi: null,
      columnApi: null,

      rowData: null,
      pinnedTopRowData: null,
      pinnedBottomRowData: null,
      isFullWidthRow: null,
      fullWidthCellRenderer: null,
      getRowHeight: null,
    };
  },
  created() {
    this.rowData = createData(100, "body");
    this.pinnedTopRowData = createData(3, "pinned");
    this.pinnedBottomRowData = createData(3, "pinned");
    this.isFullWidthRow = (params) => {
      // in this example, we check the fullWidth attribute that we set
      // while creating the data. what check you do to decide if you
      // want a row full width is up to you, as long as you return a boolean
      // for this method.
      return params.rowNode.data.fullWidth;
    };
    this.fullWidthCellRenderer = "FullWidthCellRenderer";
    this.getRowHeight = (params) => {
      // you can have normal rows and full width rows any height that you want
      const isBodyRow = params.node.rowPinned === undefined;
      const isFullWidth = params.node.data.fullWidth;
      if (isBodyRow && isFullWidth) {
        return 75;
      }
    };
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

window.getColumnDefs = function getColumnDefs() {
  const columnDefs = [];
  alphabet().forEach(function (letter) {
    const colDef = {
      headerName: letter,
      field: letter,
      width: 150,
    };
    if (letter === "A") {
      colDef.pinned = "left";
    }
    if (letter === "Z") {
      colDef.pinned = "right";
    }
    columnDefs.push(colDef);
  });
  return columnDefs;
};

window.alphabet = function alphabet() {
  return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
};

window.createData = function createData(count, prefix) {
  const rowData = [];
  for (let i = 0; i < count; i++) {
    const item = {};
    // mark every third row as full width. how you mark the row is up to you,
    // in this example the example code (not the grid code) looks at the
    // fullWidth attribute in the isFullWidthRow() callback. how you determine
    // if a row is full width or not is totally up to you.
    item.fullWidth = i % 3 === 2;
    // put in a column for each letter of the alphabet
    alphabet().forEach(function (letter) {
      item[letter] = prefix + " (" + letter + "," + i + ")";
    });
    rowData.push(item);
  }
  return rowData;
};

createApp(VueExample).mount("#app");
