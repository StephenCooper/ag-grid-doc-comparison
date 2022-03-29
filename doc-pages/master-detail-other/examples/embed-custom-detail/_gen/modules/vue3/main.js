import { createApp } from "vue";
import { AgGridVue } from "@ag-grid-community/vue3";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import DetailCellRenderer from "./detailCellRendererVue.js";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { MasterDetailModule } from "@ag-grid-enterprise/master-detail";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, MasterDetailModule]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :masterDetail="true"
                :detailCellRenderer="detailCellRenderer"
                :detailRowHeight="detailRowHeight"
                :animateRows="true"
                :defaultColDef="defaultColDef"
                :embedFullWidthRows="true"
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
        { field: "name", cellRenderer: "agGroupCellRenderer", pinned: "left" },
        { field: "account" },
        { field: "calls" },
        { field: "minutes", valueFormatter: "x.toLocaleString() + 'm'" },
        { headerName: "Extra Col 1", valueGetter: "'AAA'" },
        { headerName: "Extra Col 2", valueGetter: "'BBB'" },
        { headerName: "Extra Col 3", valueGetter: "'CCC'" },
        { headerName: "Pinned Right", pinned: "right" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {},
      detailCellRenderer: null,
      detailRowHeight: null,
      rowData: null,
    };
  },
  created() {
    this.detailCellRenderer = "DetailCellRenderer";
    this.detailRowHeight = 150;
  },
  methods: {
    onFirstDataRendered(params) {
      setTimeout(function () {
        params.api.forEachNode(function (node) {
          node.setExpanded(node.id === "1");
        });
      }, 1000);
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

createApp(VueExample).mount("#app");
