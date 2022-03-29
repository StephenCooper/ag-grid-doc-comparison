import Vue from "vue";
import { AgGridVue } from "ag-grid-vue";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div class="example-header">
                    <div>
                        <button v-on:click="onBtFirst()">To First</button>
                        <button v-on:click="onBtLast()" id="btLast">To Last</button>
                        <button v-on:click="onBtPrevious()">To Previous</button>
                        <button v-on:click="onBtNext()">To Next</button>
                        <button v-on:click="onBtPageFive()">To Page 5</button>
                        <button v-on:click="onBtPageFifty()">To Page 50</button>
                    </div>
                    <div style="margin-top: 6px">
                        <span class="label">Last Page Found:</span>
                        <span class="value" id="lbLastPageFound">-</span>
                        <span class="label">Page Size:</span>
                        <span class="value" id="lbPageSize">-</span>
                        <span class="label">Total Pages:</span>
                        <span class="value" id="lbTotalPages">-</span>
                        <span class="label">Current Page:</span>
                        <span class="value" id="lbCurrentPage">-</span>
                    </div>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowSelection="rowSelection"
                :paginationPageSize="paginationPageSize"
                :pagination="true"
                :suppressPaginationPanel="true"
                :suppressScrollOnNewData="true"
                :rowData="rowData"
                @pagination-changed="onPaginationChanged"></ag-grid-vue>
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
          headerName: "#",
          width: 50,
          valueFormatter: (params) => {
            return `${parseInt(params.node.id) + 1}`;
          },
        },
        { headerName: "Athlete", field: "athlete", width: 150 },
        { headerName: "Age", field: "age", width: 90 },
        { headerName: "Country", field: "country", width: 120 },
        { headerName: "Year", field: "year", width: 90 },
        { headerName: "Date", field: "date", width: 110 },
        { headerName: "Sport", field: "sport", width: 110 },
        { headerName: "Gold", field: "gold", width: 100 },
        { headerName: "Silver", field: "silver", width: 100 },
        { headerName: "Bronze", field: "bronze", width: 100 },
        { headerName: "Total", field: "total", width: 100 },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        resizable: true,
        filter: true,
      },
      rowSelection: null,
      paginationPageSize: null,
      rowData: null,
    };
  },
  created() {
    this.rowSelection = "multiple";
    this.paginationPageSize = 500;
  },
  methods: {
    onPaginationChanged() {
      console.log("onPaginationPageLoaded");
      // Workaround for bug in events order
      if (this.gridApi) {
        setText("#lbLastPageFound", this.gridApi.paginationIsLastPageFound());
        setText("#lbPageSize", this.gridApi.paginationGetPageSize());
        // we +1 to current page, as pages are zero based
        setText("#lbCurrentPage", this.gridApi.paginationGetCurrentPage() + 1);
        setText("#lbTotalPages", this.gridApi.paginationGetTotalPages());
        setLastButtonDisabled(!this.gridApi.paginationIsLastPageFound());
      }
    },
    onBtFirst() {
      this.gridApi.paginationGoToFirstPage();
    },
    onBtLast() {
      this.gridApi.paginationGoToLastPage();
    },
    onBtNext() {
      this.gridApi.paginationGoToNextPage();
    },
    onBtPrevious() {
      this.gridApi.paginationGoToPreviousPage();
    },
    onBtPageFive() {
      // we say page 4, as the first page is zero
      this.gridApi.paginationGoToPage(4);
    },
    onBtPageFifty() {
      // we say page 49, as the first page is zero
      this.gridApi.paginationGoToPage(49);
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

window.setText = function setText(selector, text) {
  document.querySelector(selector).innerHTML = text;
};

window.setLastButtonDisabled = function setLastButtonDisabled(disabled) {
  document.querySelector("#btLast").disabled = disabled;
};

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
