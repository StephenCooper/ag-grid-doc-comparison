import Vue from "vue";
import { AgGridVue } from "ag-grid-vue";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const VueExample = {
  template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :suppressClickEdit="true"
                :rowData="rowData"></ag-grid-vue>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: "athlete", minWidth: 180 },
        { field: "age" },
        { field: "country", minWidth: 160 },
        { field: "year" },
        { field: "date", minWidth: 160 },
        { field: "sport", minWidth: 180 },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
        { field: "total" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        editable: true,
        // we use a cell renderer to include a button, so when the button
        // gets clicked, the editing starts.
        cellRenderer: getRenderer(),
      },
      rowData: null,
    };
  },
  created() {},
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => params.api.setRowData(data);

      fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

window.getRenderer = function getRenderer() {
  class CellRenderer {
    createGui() {
      const template =
        '<span><button id="theButton" style="height: 39px">#</button><span id="theValue" style="padding-left: 4px;"></span></span>';
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = template;
      this.eGui = tempDiv.firstElementChild;
    }
    init(params) {
      // create the gui
      this.createGui();
      // keep params, we use it in onButtonClicked
      this.params = params;
      // attach the value to the value span
      const eValue = this.eGui.querySelector("#theValue");
      eValue.innerHTML = params.value;
      // setup the button, first get reference to it
      this.eButton = this.eGui.querySelector("#theButton");
      // bind the listener so 'this' is preserved, also keep reference to it for removal
      this.buttonClickListener = this.onButtonClicked.bind(this);
      // add the listener
      this.eButton.addEventListener("click", this.buttonClickListener);
    }
    onButtonClicked() {
      // start editing this cell. see the docs on the params that this method takes
      const startEditingParams = {
        rowIndex: this.params.rowIndex,
        colKey: this.params.column.getId(),
      };
      this.params.api.startEditingCell(startEditingParams);
    }
    getGui() {
      // returns our gui to the grid for this cell
      return this.eGui;
    }
    refresh() {
      return false;
    }
    destroy() {
      // be good, clean up the listener
      this.eButton.removeEventListener("click", this.buttonClickListener);
    }
  }
  return CellRenderer;
};

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
