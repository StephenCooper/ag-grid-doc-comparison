import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridVue } from "ag-grid-vue3";
import { createApp } from "vue";

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div style="margin-bottom: 1rem;">
                    <button v-on:click="onBtForEachNode()">For-Each Node</button>
                    <button v-on:click="onBtForEachNodeAfterFilter()">For-Each Node After Filter</button>
                    <button v-on:click="onBtForEachNodeAfterFilterAndSort()">For-Each Node After Filter and Sort</button>
                    <button v-on:click="onBtForEachLeafNode()">For-Each Leaf Node</button>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :autoGroupColumnDef="autoGroupColumnDef"
                :groupDefaultExpanded="groupDefaultExpanded"
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
        { field: "athlete", minWidth: 180 },
        { field: "age" },
        { field: "year" },
        { field: "date", minWidth: 150 },
        { field: "sport", minWidth: 150 },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
        { field: "total" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        sortable: true,
        filter: true,
      },
      autoGroupColumnDef: null,
      groupDefaultExpanded: null,
      rowData: null,
    };
  },
  created() {
    this.autoGroupColumnDef = {
      minWidth: 200,
    };
    this.groupDefaultExpanded = 1;
  },
  methods: {
    onBtForEachNode() {
      console.log("### api.forEachNode() ###");
      this.gridApi.forEachNode(printNode);
    },
    onBtForEachNodeAfterFilter() {
      console.log("### api.forEachNodeAfterFilter() ###");
      this.gridApi.forEachNodeAfterFilter(printNode);
    },
    onBtForEachNodeAfterFilterAndSort() {
      console.log("### api.forEachNodeAfterFilterAndSort() ###");
      this.gridApi.forEachNodeAfterFilterAndSort(printNode);
    },
    onBtForEachLeafNode() {
      console.log("### api.forEachLeafNode() ###");
      this.gridApi.forEachLeafNode(printNode);
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => params.api.setRowData(data.slice(0, 50));

      fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

const printNode = (node, index) => {
  if (node.group) {
    console.log(index + " -> group: " + node.key);
  } else {
    console.log(
      index + " -> data: " + node.data.country + ", " + node.data.athlete
    );
  }
};

createApp(VueExample).mount("#app");
