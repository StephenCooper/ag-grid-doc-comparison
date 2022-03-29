import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridVue } from "ag-grid-vue3";
import { createApp } from "vue";

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div style="margin-bottom: 5px">
                    <button v-on:click="expandAll()">Expand All</button>
                    <button v-on:click="collapseAll()">Collapse All</button>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :autoGroupColumnDef="autoGroupColumnDef"
                :sideBar="true"
                :enableRangeSelection="true"
                :getGroupRowAgg="getGroupRowAgg"
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
        { field: "country", rowGroup: true, hide: true },
        { field: "year", rowGroup: true, hide: true },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
        { headerName: "Gold*pi", field: "goldPi", minWidth: 200 },
        { headerName: "Silver*pi", field: "silverPi", minWidth: 200 },
        { headerName: "Bronze*pi", field: "bronzePi", minWidth: 200 },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        filter: true,
        sortable: true,
      },
      autoGroupColumnDef: null,
      rowData: null,
    };
  },
  created() {
    this.autoGroupColumnDef = {
      headerName: "Athlete",
      field: "athlete",
      minWidth: 250,
    };
  },
  methods: {
    expandAll() {
      this.gridApi.expandAll();
    },
    collapseAll() {
      this.gridApi.collapseAll();
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => params.api.setRowData(data);

      fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
    getGroupRowAgg(params) {
      const result = {
        gold: 0,
        silver: 0,
        bronze: 0,
        goldPi: 0,
        silverPi: 0,
        bronzePi: 0,
      };
      params.nodes.forEach((node) => {
        const data = node.group ? node.aggData : node.data;
        if (typeof data.gold === "number") {
          result.gold += data.gold;
          result.goldPi += data.gold * Math.PI;
        }
        if (typeof data.silver === "number") {
          result.silver += data.silver;
          result.silverPi += data.silver * Math.PI;
        }
        if (typeof data.bronze === "number") {
          result.bronze += data.bronze;
          result.bronzePi += data.bronze * Math.PI;
        }
      });
      return result;
    },
  },
};

createApp(VueExample).mount("#app");
