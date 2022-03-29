import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridVue } from "ag-grid-vue3";
import { createApp } from "vue";

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="test-container">
                <div class="test-header">
                    <div class="example-section">
                        <button v-on:click="onBtSaveSortState()">Save Sort</button>
                        <button v-on:click="onBtRestoreSortState()">Restore Sort</button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button v-on:click="onBtSaveOrderAndVisibilityState()">Save Order &amp; Visibility</button>
                        <button v-on:click="onBtRestoreOrderAndVisibilityState()">Restore Order &amp; Visibility</button>
                    </div>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :sideBar="sideBar"
                :rowGroupPanelShow="rowGroupPanelShow"
                :pivotPanelShow="pivotPanelShow"
                :rowData="rowData"></ag-grid-vue>
            </div>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: "athlete" },
        { field: "age" },
        { field: "country" },
        { field: "sport" },
        { field: "year" },
        { field: "date" },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
        { field: "total" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        sortable: true,
        resizable: true,
        width: 100,
        enableRowGroup: true,
        enablePivot: true,
        enableValue: true,
      },
      sideBar: null,
      rowGroupPanelShow: null,
      pivotPanelShow: null,
      rowData: null,
    };
  },
  created() {
    this.sideBar = { toolPanels: ["columns"] };
    this.rowGroupPanelShow = "always";
    this.pivotPanelShow = "always";
  },
  methods: {
    onBtSaveSortState() {
      const allState = this.gridColumnApi.getColumnState();
      const sortState = allState.map((state) => ({
        colId: state.colId,
        sort: state.sort,
        sortIndex: state.sortIndex,
      }));
      window.sortState = sortState;
      console.log("sort state saved", sortState);
    },
    onBtRestoreSortState() {
      if (!window.sortState) {
        console.log("no sort state to restore, you must save sort state first");
        return;
      }
      this.gridColumnApi.applyColumnState({
        state: window.sortState,
      });
      console.log("sort state restored");
    },
    onBtSaveOrderAndVisibilityState() {
      const allState = this.gridColumnApi.getColumnState();
      const orderAndVisibilityState = allState.map((state) => ({
        colId: state.colId,
        hide: state.hide,
      }));
      window.orderAndVisibilityState = orderAndVisibilityState;
      console.log("order and visibility state saved", orderAndVisibilityState);
    },
    onBtRestoreOrderAndVisibilityState() {
      if (!window.orderAndVisibilityState) {
        console.log(
          "no order and visibility state to restore by, you must save order and visibility state first"
        );
        return;
      }
      this.gridColumnApi.applyColumnState({
        state: window.orderAndVisibilityState,
        applyOrder: true,
      });
      console.log("column state restored");
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

createApp(VueExample).mount("#app");
