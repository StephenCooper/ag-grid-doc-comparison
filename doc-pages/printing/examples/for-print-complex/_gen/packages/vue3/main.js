import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridVue } from "ag-grid-vue3";
import { createApp } from "vue";

const VueExample = {
  template: `
        <div style="height: 100%">
            <button v-on:click="onBtPrint()">Print</button>
            <h3>
                Latin Text
            </h3>
            <p>
                Lorem ipsum dolor sit amet, ne cum repudiare abhorreant. Atqui molestiae neglegentur ad nam, mei amet eros ea, populo deleniti scaevola et pri. Pro no ubique explicari, his reque nulla consequuntur in. His soleat doctus constituam te, sed at alterum repudiandae. Suas ludus electram te ius.
            </p>
            <ag-grid-vue
                id="myGrid"
                style="width: 700px; height: 200px;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"
                :animateRows="true"
                :groupDisplayType="groupDisplayType"
                @first-data-rendered="onFirstDataRendered"></ag-grid-vue>
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
        { field: "group", rowGroup: true, hide: true },
        { field: "id", pinned: "left", width: 70 },
        { field: "model", width: 180 },
        { field: "color", width: 100 },
        {
          field: "price",
          valueFormatter: "'$' + value.toLocaleString()",
          width: 100,
        },
        { field: "year", width: 100 },
        { field: "country", width: 120 },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        sortable: true,
      },
      rowData: null,
      groupDisplayType: null,
    };
  },
  created() {
    this.rowData = getData();
    this.groupDisplayType = "groupRows";
  },
  methods: {
    onFirstDataRendered(params) {
      params.api.expandAll();
    },
    onBtPrint() {
      const api = this.gridApi;
      setPrinterFriendly(api);
      setTimeout(function () {
        print();
        setNormal(api);
      }, 2000);
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

window.setPrinterFriendly = function setPrinterFriendly(api) {
  const eGridDiv = document.querySelector("#myGrid");
  eGridDiv.style.height = "";
  api.setDomLayout("print");
};

window.setNormal = function setNormal(api) {
  const eGridDiv = document.querySelector("#myGrid");
  eGridDiv.style.width = "700px";
  eGridDiv.style.height = "200px";
  api.setDomLayout();
};

createApp(VueExample).mount("#app");
