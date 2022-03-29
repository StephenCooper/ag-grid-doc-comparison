import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridVue } from "ag-grid-vue";
import Vue from "vue";

class NodeIdRenderer {
  init(params) {
    this.eGui = document.createElement("div");
    this.eGui.innerHTML = params.node.id + 1;
  }

  getGui() {
    return this.eGui;
  }

  refresh(params) {
    return false;
  }
}

const VueExample = {
  template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :localeText="localeText"
                :defaultColDef="defaultColDef"
                :sideBar="true"
                :statusBar="statusBar"
                :rowGroupPanelShow="rowGroupPanelShow"
                :pagination="true"
                :paginationPageSize="paginationPageSize"
                :enableRangeSelection="true"
                :enableCharts="true"
                :rowData="rowData"></ag-grid-vue>
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
          cellRenderer: NodeIdRenderer,
          checkboxSelection: true,
          headerCheckboxSelection: true,
        },
        {
          field: "athlete",
          filterParams: { buttons: ["clear", "reset", "apply"] },
        },
        {
          field: "age",
          filterParams: { buttons: ["apply", "cancel"] },
          enablePivot: true,
        },
        { field: "country", enableRowGroup: true },
        { field: "year", filter: "agNumberColumnFilter" },
        { field: "date" },
        {
          field: "sport",
          filter: "agMultiColumnFilter",
          filterParams: {
            filters: [
              { filter: "agTextColumnFilter", display: "accordion" },
              { filter: "agSetColumnFilter", display: "accordion" },
            ],
          },
        },
        { field: "gold", enableValue: true },
        { field: "silver", enableValue: true },
        { field: "bronze", enableValue: true },
        { field: "total", enableValue: true },
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
      localeText: null,
      statusBar: null,
      rowGroupPanelShow: null,
      paginationPageSize: null,
      rowData: null,
    };
  },
  created() {
    this.localeText = AG_GRID_LOCALE_ZZZ;
    this.statusBar = {
      statusPanels: [
        { statusPanel: "agTotalAndFilteredRowCountComponent", align: "left" },
        { statusPanel: "agAggregationComponent" },
      ],
    };
    this.rowGroupPanelShow = "always";
    this.paginationPageSize = 500;
  },
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

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
