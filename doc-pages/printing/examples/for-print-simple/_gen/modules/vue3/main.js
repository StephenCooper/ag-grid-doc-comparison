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
            <button v-on:click="onBtPrinterFriendly()">Printer Friendly Layout</button>
            <button v-on:click="onBtNormal()">Normal Layout</button>
            <h3>
                Latin Text
            </h3>
            <p>
                Lorem ipsum dolor sit amet, ne cum repudiare abhorreant. Atqui molestiae neglegentur ad nam, mei amet eros ea, populo deleniti scaevola et pri. Pro no ubique explicari, his reque nulla consequuntur in. His soleat doctus constituam te, sed at alterum repudiandae. Suas ludus electram te ius.
            </p>
            <ag-grid-vue
                id="myGrid"
                style="width: 400px; height: 200px;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :rowData="rowData"
                :defaultColDef="defaultColDef"></ag-grid-vue>
            <h3>
                More Latin Text
            </h3>
            <p>
                Lorem ipsum dolor sit amet, ne cum repudiare abhorreant. Atqui molestiae neglegentur ad nam, mei amet eros ea, populo deleniti scaevola et pri. Pro no ubique explicari, his reque nulla consequuntur in. His soleat doctus constituam te, sed at alterum repudiandae. Suas ludus electram te ius.
            </p>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { headerName: "ID", valueGetter: "node.rowIndex + 1", width: 70 },
        { field: "model", width: 150 },
        { field: "color" },
        { field: "price", valueFormatter: "'$' + value.toLocaleString()" },
        { field: "year" },
        { field: "country" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        width: 100,
      },
      rowData: null,
    };
  },
  created() {
    this.rowData = getData();
  },
  methods: {
    onBtPrinterFriendly() {
      var eGridDiv = document.querySelector("#myGrid");
      eGridDiv.style.width = "";
      eGridDiv.style.height = "";
      this.gridApi.setDomLayout("print");
    },
    onBtNormal() {
      var eGridDiv = document.querySelector("#myGrid");
      eGridDiv.style.width = "400px";
      eGridDiv.style.height = "200px";
      // Same as setting to 'normal' as it is the default
      this.gridApi.setDomLayout();
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

createApp(VueExample).mount("#app");
