import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "@ag-grid-community/vue3";
import { createApp } from "vue";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div style="margin-bottom: 5px; display: flex; justify-content: space-between;">
                    <div>
                        <button v-on:click="onBtStartEditing()">edit (0)</button>
                        <button v-on:click="onBtStartEditing('Delete')">edit (0, Delete)</button>
                        <button v-on:click="onBtStartEditing(undefined, 'T')">edit (0, 'T')</button>
                        <button v-on:click="onBtStartEditing(undefined, undefined, 'top')">edit (0, Top)</button>
                        <button v-on:click="onBtStartEditing(undefined, undefined, 'bottom')">edit (0, Bottom)</button>
                    </div>
                    <div>
                        <button v-on:click="onBtStopEditing()">stop ()</button>
                        <button v-on:click="onBtNextCell()">next ()</button>
                        <button v-on:click="onBtPreviousCell()">previous ()</button>
                    </div>
                    <div>
                        <button v-on:click="onBtWhich()">which ()</button>
                    </div>
                </div>
                <div class="grid-wrapper">
                    <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"
                :pinnedTopRowData="pinnedTopRowData"
                :pinnedBottomRowData="pinnedBottomRowData"></ag-grid-vue>
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
        { field: "firstName" },
        { field: "lastName" },
        { field: "gender" },
        { field: "age" },
        { field: "mood" },
        { field: "country" },
        { field: "address", minWidth: 550 },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 110,
        editable: true,
        resizable: true,
      },
      rowData: null,
      pinnedTopRowData: null,
      pinnedBottomRowData: null,
    };
  },
  created() {
    this.rowData = getData();
    this.pinnedTopRowData = getPinnedTopData();
    this.pinnedBottomRowData = getPinnedBottomData();
  },
  methods: {
    onBtStopEditing() {
      this.gridApi.stopEditing();
    },
    onBtStartEditing(key, char, pinned) {
      this.gridApi.setFocusedCell(0, "lastName", pinned);
      this.gridApi.startEditingCell({
        rowIndex: 0,
        colKey: "lastName",
        // set to 'top', 'bottom' or undefined
        rowPinned: pinned,
        key: key,
        charPress: char,
      });
    },
    onBtNextCell() {
      this.gridApi.tabToNextCell();
    },
    onBtPreviousCell() {
      this.gridApi.tabToPreviousCell();
    },
    onBtWhich() {
      var cellDefs = this.gridApi.getEditingCells();
      if (cellDefs.length > 0) {
        var cellDef = cellDefs[0];
        console.log(
          "editing cell is: row = " +
            cellDef.rowIndex +
            ", col = " +
            cellDef.column.getId() +
            ", floating = " +
            cellDef.rowPinned
        );
      } else {
        console.log("no cells are editing");
      }
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

window.getPinnedTopData = function getPinnedTopData() {
  return [
    {
      firstName: "##",
      lastName: "##",
      gender: "##",
      address: "##",
      mood: "##",
      country: "##",
    },
  ];
};

window.getPinnedBottomData = function getPinnedBottomData() {
  return [
    {
      firstName: "##",
      lastName: "##",
      gender: "##",
      address: "##",
      mood: "##",
      country: "##",
    },
  ];
};

createApp(VueExample).mount("#app");
