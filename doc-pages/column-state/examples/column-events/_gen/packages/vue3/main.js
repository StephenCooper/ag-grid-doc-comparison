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
                    <div class="test-button-row">
                        <div class="test-button-group">
                            <button v-on:click="onBtSortOn()">Sort On</button>
                            <br />
                            <button v-on:click="onBtSortOff()">Sort Off</button>
                        </div>
                        <div class="test-button-group">
                            <button v-on:click="onBtWidthNarrow()">Width Narrow</button>
                            <br />
                            <button v-on:click="onBtWidthNormal()">Width Normal</button>
                        </div>
                        <div class="test-button-group">
                            <button v-on:click="onBtHide()">Hide Cols</button>
                            <br />
                            <button v-on:click="onBtShow()">Show Cols</button>
                        </div>
                        <div class="test-button-group">
                            <button v-on:click="onBtReverseOrder()">Reverse Medal Order</button>
                            <br />
                            <button v-on:click="onBtNormalOrder()">Normal Medal Order</button>
                        </div>
                        <div class="test-button-group">
                            <button v-on:click="onBtRowGroupOn()">Row Group On</button>
                            <br />
                            <button v-on:click="onBtRowGroupOff()">Row Group Off</button>
                        </div>
                        <div class="test-button-group">
                            <button v-on:click="onBtAggFuncOn()">Agg Func On</button>
                            <br />
                            <button v-on:click="onBtAggFuncOff()">Agg Func Off</button>
                        </div>
                        <div class="test-button-group">
                            <button v-on:click="onBtPivotOn()">Pivot On</button>
                            <br />
                            <button v-on:click="onBtPivotOff()">Pivot Off</button>
                        </div>
                        <div class="test-button-group">
                            <button v-on:click="onBtPinnedOn()">Pinned On</button>
                            <br />
                            <button v-on:click="onBtPinnedOff()">Pinned Off</button>
                        </div>
                    </div>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"
                @sort-changed="onSortChanged"
                @column-resized="onColumnResized"
                @column-visible="onColumnVisible"
                @column-pivot-changed="onColumnPivotChanged"
                @column-row-group-changed="onColumnRowGroupChanged"
                @column-value-changed="onColumnValueChanged"
                @column-moved="onColumnMoved"
                @column-pinned="onColumnPinned"></ag-grid-vue>
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
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        sortable: true,
        resizable: true,
        width: 150,
        enableRowGroup: true,
        enablePivot: true,
        enableValue: true,
      },
      rowData: null,
    };
  },
  created() {},
  methods: {
    onSortChanged(e) {
      console.log("Event Sort Changed", e);
    },
    onColumnResized(e) {
      console.log("Event Column Resized", e);
    },
    onColumnVisible(e) {
      console.log("Event Column Visible", e);
    },
    onColumnPivotChanged(e) {
      console.log("Event Pivot Changed", e);
    },
    onColumnRowGroupChanged(e) {
      console.log("Event Row Group Changed", e);
    },
    onColumnValueChanged(e) {
      console.log("Event Value Changed", e);
    },
    onColumnMoved(e) {
      console.log("Event Column Moved", e);
    },
    onColumnPinned(e) {
      console.log("Event Column Pinned", e);
    },
    onBtSortOn() {
      this.gridColumnApi.applyColumnState({
        state: [
          { colId: "age", sort: "desc" },
          { colId: "athlete", sort: "asc" },
        ],
      });
    },
    onBtSortOff() {
      this.gridColumnApi.applyColumnState({
        defaultState: { sort: null },
      });
    },
    onBtWidthNarrow() {
      this.gridColumnApi.applyColumnState({
        state: [
          { colId: "age", width: 100 },
          { colId: "athlete", width: 100 },
        ],
      });
    },
    onBtWidthNormal() {
      this.gridColumnApi.applyColumnState({
        state: [
          { colId: "age", width: 200 },
          { colId: "athlete", width: 200 },
        ],
      });
    },
    onBtHide() {
      this.gridColumnApi.applyColumnState({
        state: [
          { colId: "age", hide: true },
          { colId: "athlete", hide: true },
        ],
      });
    },
    onBtShow() {
      this.gridColumnApi.applyColumnState({
        defaultState: { hide: false },
      });
    },
    onBtPivotOn() {
      this.gridColumnApi.setPivotMode(true);
      this.gridColumnApi.applyColumnState({
        state: [{ colId: "country", pivot: true }],
      });
    },
    onBtPivotOff() {
      this.gridColumnApi.setPivotMode(false);
      this.gridColumnApi.applyColumnState({
        defaultState: { pivot: false },
      });
    },
    onBtRowGroupOn() {
      this.gridColumnApi.applyColumnState({
        state: [{ colId: "sport", rowGroup: true }],
      });
    },
    onBtRowGroupOff() {
      this.gridColumnApi.applyColumnState({
        defaultState: { rowGroup: false },
      });
    },
    onBtAggFuncOn() {
      this.gridColumnApi.applyColumnState({
        state: [
          { colId: "gold", aggFunc: "sum" },
          { colId: "silver", aggFunc: "sum" },
          { colId: "bronze", aggFunc: "sum" },
        ],
      });
    },
    onBtAggFuncOff() {
      this.gridColumnApi.applyColumnState({
        defaultState: { aggFunc: null },
      });
    },
    onBtNormalOrder() {
      this.gridColumnApi.applyColumnState({
        state: [
          { colId: "athlete" },
          { colId: "age" },
          { colId: "country" },
          { colId: "sport" },
          { colId: "gold" },
          { colId: "silver" },
          { colId: "bronze" },
        ],
        applyOrder: true,
      });
    },
    onBtReverseOrder() {
      this.gridColumnApi.applyColumnState({
        state: [
          { colId: "athlete" },
          { colId: "age" },
          { colId: "country" },
          { colId: "sport" },
          { colId: "bronze" },
          { colId: "silver" },
          { colId: "gold" },
        ],
        applyOrder: true,
      });
    },
    onBtPinnedOn() {
      this.gridColumnApi.applyColumnState({
        state: [
          { colId: "athlete", pinned: "left" },
          { colId: "age", pinned: "right" },
        ],
      });
    },
    onBtPinnedOff() {
      this.gridColumnApi.applyColumnState({
        defaultState: { pinned: null },
      });
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
