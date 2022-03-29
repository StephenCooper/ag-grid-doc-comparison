import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine-dark.css";
import { AgGridVue } from "@ag-grid-community/vue3";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import { createApp } from "vue";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RowGroupingModule,
  MenuModule,
  SetFilterModule,
  ColumnsToolPanelModule,
]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div class="example-header">
                    <div style="display: inline-block; height: 10px; margin-top: 5px; margin-right: 10px; width: 100px; border: 1px solid grey;">
                        <div id="animationCountdown" class="transition-width" style="background-color: grey; height: 100%; width: 0%;"></div>
                    </div>
                    <span id="animationAction"></span>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine-dark"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :enableRangeSelection="true"
                :animateRows="true"
                :suppressAggFuncInHeader="true"
                :autoGroupColumnDef="autoGroupColumnDef"
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
        { field: "athlete", minWidth: 150 },
        { field: "country", minWidth: 150 },
        { field: "year", minWidth: 120 },
        { field: "gold", aggFunc: "sum" },
        { field: "silver", aggFunc: "sum" },
        { field: "bronze", aggFunc: "sum" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        sortable: true,
        filter: true,
      },
      autoGroupColumnDef: null,
      rowData: null,
    };
  },
  created() {
    this.autoGroupColumnDef = {
      // to get 'athlete' showing in the leaf level in this column
      cellRenderer: "agGroupCellRenderer",
      headerName: "Athlete",
      minWidth: 200,
      field: "athlete",
    };
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => {
        params.api.setRowData(data.slice(0, 50));
        startInterval(params.api, params.columnApi);
      };

      fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

window.startInterval = // the code below executes an action every 2,000 milliseconds.
  // it's an interval, and each time it runs, it takes the next action
  // from the 'actions' list below
  function startInterval(api, columnApi) {
    var actionIndex = 0;
    resetCountdown();
    executeAfterXSeconds();
    function executeAfterXSeconds() {
      setTimeout(function () {
        var action = getActions()[actionIndex];
        action(api, columnApi);
        actionIndex++;
        if (actionIndex >= getActions().length) {
          actionIndex = 0;
        }
        resetCountdown();
        executeAfterXSeconds();
      }, 3000);
    }
    setTitleFormatted(null);
  };

window.resetCountdown = function resetCountdown() {
  document.querySelector("#animationCountdown").style.width = countDownDirection
    ? "100%"
    : "0%";
  countDownDirection = !countDownDirection;
};

window.setTitleFormatted = function setTitleFormatted(
  apiName,
  methodName,
  paramsName
) {
  var html;
  if (apiName === null) {
    html = '<span class="code-highlight-yellow">command:> </span>';
  } else {
    html =
      '<span class="code-highlight-yellow">command:> </span> ' +
      '<span class="code-highlight-blue">' +
      apiName +
      "</span>" +
      '<span class="code-highlight-blue">.</span>' +
      '<span class="code-highlight-yellow">' +
      methodName +
      "</span>" +
      '<span class="code-highlight-blue"></span>' +
      '<span class="code-highlight-blue">(</span>' +
      '<span class="code-highlight-green">' +
      paramsName +
      "</span>" +
      '<span class="code-highlight-blue">)</span>';
  }
  document.querySelector("#animationAction").innerHTML = html;
};

window.getActions = function getActions() {
  return [
    function (api, columnApi) {
      columnApi.applyColumnState({
        state: [{ colId: "country", sort: "asc" }],
        defaultState: { sort: null },
      });
      setTitleFormatted("api", "applyColumnState", "country: 'asc'");
    },
    function (api, columnApi) {
      columnApi.applyColumnState({
        state: [
          { colId: "year", sort: "asc" },
          { colId: "country", sort: "asc" },
        ],
        defaultState: { sort: null },
      });
      setTitleFormatted(
        "api",
        "applyColumnState",
        "year: 'asc', country 'asc'"
      );
    },
    function (api, columnApi) {
      columnApi.applyColumnState({
        state: [
          { colId: "year", sort: "asc" },
          { colId: "country", sort: "desc" },
        ],
        defaultState: { sort: null },
      });
      setTitleFormatted(
        "api",
        "applyColumnState",
        "year: 'asc', country: 'desc'"
      );
    },
    function (api, columnApi) {
      columnApi.applyColumnState({
        defaultState: { sort: null },
      });
      setTitleFormatted("api", "applyColumnState", "clear sort");
    },
  ];
};

var countDownDirection = true;

createApp(VueExample).mount("#app");
