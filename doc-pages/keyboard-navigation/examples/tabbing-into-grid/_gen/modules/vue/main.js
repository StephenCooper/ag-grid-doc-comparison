import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "@ag-grid-community/vue";
import Vue from "vue";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="test-container">
                <div>
                    <div class="form-container">
                        <label>
                            Tab into Grid (Focus the First Cell)
                            <input id="my-input">
                        </label>
                    </div>
                    <div class="form-container">
                        <label>
                            Tab into the Grid (Default Behavior)
                            <input>
                        </label>
                    </div>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :rowData="rowData"
                :defaultColDef="defaultColDef"
                @first-data-rendered="onFirstDataRendered"></ag-grid-vue>
                <div class="form-container">
                    <label>
                        Tab into the grid with Shift-Tab (Default Behavior)
                        <input>
                    </label>
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
        { headerName: "#", colId: "rowNum", valueGetter: "node.id" },
        { field: "athlete", minWidth: 170 },
        { field: "age" },
        { field: "country" },
        { field: "year" },
        { field: "date" },
        { field: "sport" },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
        { field: "total" },
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
      rowData: null,
    };
  },
  created() {},
  methods: {
    onFirstDataRendered(params) {
      // obtain reference to input element
      var myInput = document.getElementById("my-input");
      // intercept key strokes within input element
      myInput.addEventListener(
        "keydown",
        function (event) {
          // ignore non Tab key strokes
          if (event.key !== "Tab") return;
          // prevents tabbing into the url section
          event.preventDefault();
          // scrolls to the first row
          params.api.ensureIndexVisible(0);
          // scrolls to the first column
          var firstCol = params.columnApi.getAllDisplayedColumns()[0];
          params.api.ensureColumnVisible(firstCol);
          // sets focus into the first grid cell
          params.api.setFocusedCell(0, firstCol);
        },
        true
      );
    },
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

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
