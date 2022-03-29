import { createApp } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div class="button-bar example-header">
                    <table>
                        <tbody><tr>
                            <td>pivot (<span id="pivot">off</span>)</td>
                            <td>
                                <button v-on:click="setPivotOn()">on</button>
                                <button v-on:click="setPivotOff()">off</button>
                            </td>
                        </tr>
                        <tr>
                            <td>groupHeaderHeight (<span id="groupHeaderHeight">undefined</span>)</td>
                            <td>
                                <button v-on:click="setGroupHeaderHeight(40)">40px</button>
                                <button v-on:click="setGroupHeaderHeight(60)">60px</button>
                                <button v-on:click="setGroupHeaderHeight()">undefined</button>
                            </td>
                            <td>headerHeight (<span id="headerHeight">undefined</span>)</td>
                            <td>
                                <button v-on:click="setHeaderHeight(70)">70px</button>
                                <button v-on:click="setHeaderHeight(80)">80px</button>
                                <button v-on:click="setHeaderHeight()">undefined</button>
                            </td>
                        </tr>
                        <tr id="requiresPivot" class="hidden">
                            <td> pivotGroupHeaderHeight (<span id="pivotGroupHeaderHeight">undefined</span>)
                            </td>
                            <td>
                                <button v-on:click="setPivotGroupHeaderHeight(50)">50px</button>
                                <button v-on:click="setPivotGroupHeaderHeight(70)">70px</button>
                                <button v-on:click="setPivotGroupHeaderHeight()">undefined</button>
                            </td>
                            <td>pivotHeaderHeight (<span id="pivotHeaderHeight">undefined</span>)</td>
                            <td>
                                <button v-on:click="setPivotHeaderHeight(60)">60px</button>
                                <button v-on:click="setPivotHeaderHeight(80)">80px</button>
                                <button v-on:click="setPivotHeaderHeight()">undefined</button>
                            </td>
                        </tr>
                        <tr id="requiresNotPivot">
                            <td>floatingFiltersHeight (<span id="floatingFiltersHeight">undefined</span>)</td>
                            <td>
                                <button v-on:click="setFloatingFiltersHeight(35)">35px</button>
                                <button v-on:click="setFloatingFiltersHeight(55)">55px</button>
                                <button v-on:click="setFloatingFiltersHeight()">undefined</button>
                            </td>
                        </tr>
                    </tbody></table>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
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
        {
          headerName: "Athlete Details",
          children: [
            {
              field: "athlete",
              width: 150,
              suppressSizeToFit: true,
              enableRowGroup: true,
              rowGroupIndex: 0,
            },
            {
              field: "age",
              width: 90,
              minWidth: 75,
              maxWidth: 100,
              enableRowGroup: true,
            },
            { field: "country", enableRowGroup: true },
            { field: "year", width: 90, enableRowGroup: true, pivotIndex: 0 },
            { field: "sport", width: 110, enableRowGroup: true },
            {
              field: "gold",
              enableValue: true,
              suppressMenu: true,
              filter: "agNumberColumnFilter",
              aggFunc: "sum",
            },
            {
              field: "silver",
              enableValue: true,
              suppressMenu: true,
              filter: "agNumberColumnFilter",
              aggFunc: "sum",
            },
            {
              field: "bronze",
              enableValue: true,
              suppressMenu: true,
              filter: "agNumberColumnFilter",
              aggFunc: "sum",
            },
            {
              field: "total",
              enableValue: true,
              suppressMenu: true,
              filter: "agNumberColumnFilter",
              aggFunc: "sum",
            },
          ],
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        sortable: true,
        resizable: true,
        floatingFilter: true,
        width: 120,
      },
      rowData: null,
    };
  },
  created() {},
  methods: {
    setPivotOn() {
      document.querySelector("#requiresPivot").className = "";
      document.querySelector("#requiresNotPivot").className = "hidden";
      this.gridColumnApi.setPivotMode(true);
      setIdText("pivot", "on");
    },
    setPivotOff() {
      document.querySelector("#requiresPivot").className = "hidden";
      document.querySelector("#requiresNotPivot").className = "";
      this.gridColumnApi.setPivotMode(false);
      setIdText("pivot", "off");
    },
    setHeaderHeight(value) {
      this.gridApi.setHeaderHeight(value);
      setIdText("headerHeight", value);
    },
    setGroupHeaderHeight(value) {
      this.gridApi.setGroupHeaderHeight(value);
      setIdText("groupHeaderHeight", value);
    },
    setFloatingFiltersHeight(value) {
      this.gridApi.setFloatingFiltersHeight(value);
      setIdText("floatingFiltersHeight", value);
    },
    setPivotGroupHeaderHeight(value) {
      this.gridApi.setPivotGroupHeaderHeight(value);
      setIdText("pivotGroupHeaderHeight", value);
    },
    setPivotHeaderHeight(value) {
      this.gridApi.setPivotHeaderHeight(value);
      setIdText("pivotHeaderHeight", value);
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

window.setIdText = function setIdText(id, value) {
  document.getElementById(id).innerHTML =
    value == undefined ? "undefined" : value + "";
};

createApp(VueExample).mount("#app");
