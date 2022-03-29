import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridVue } from "ag-grid-vue";
import Vue from "vue";
import DetailCellRenderer from "./detailCellRendererVue.js";

const VueExample = {
  template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :masterDetail="true"
                :detailCellRenderer="detailCellRenderer"
                :detailRowHeight="detailRowHeight"
                :groupDefaultExpanded="groupDefaultExpanded"
                :rowData="rowData"
                @first-data-rendered="onFirstDataRendered"></ag-grid-vue>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
    DetailCellRenderer,
  },
  data: function () {
    return {
      columnDefs: [
        { field: "name", cellRenderer: "agGroupCellRenderer" },
        { field: "account" },
        { field: "calls" },
        { field: "minutes", valueFormatter: "x.toLocaleString() + 'm'" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
      },
      detailCellRenderer: null,
      detailRowHeight: null,
      groupDefaultExpanded: null,
      rowData: null,
    };
  },
  created() {
    this.detailCellRenderer = "DetailCellRenderer";
    this.detailRowHeight = 70;
    this.groupDefaultExpanded = 1;
  },
  methods: {
    onFirstDataRendered(params) {
      params.api.forEachNode(function (node) {
        node.setExpanded(node.id === "1");
      });
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => {
        this.rowData = data;
      };

      fetch("https://www.ag-grid.com/example-assets/master-detail-data.json")
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
