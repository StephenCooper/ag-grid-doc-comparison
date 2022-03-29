import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridVue } from "ag-grid-vue3";
import { createApp } from "vue";

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div style="margin-bottom: 5px; font-family: Verdana, Geneva, Tahoma, sans-serif; font-size: 13px;">
                    <div>
                        Top Level Groups:
                        <button v-on:click="setGroupHeight(42)">42px</button>
                        <button v-on:click="setGroupHeight(75)">75px</button>
                        <button v-on:click="setGroupHeight(125)">125px</button>
                    </div>
                    <div style="margin-top: 5px;">
                        Swimming Leaf Rows:
                        <button v-on:click="setSwimmingHeight(42)">42px</button>
                        <button v-on:click="setSwimmingHeight(75)">75px</button>
                        <button v-on:click="setSwimmingHeight(125)">125px</button>
                    </div>
                    <div style="margin-top: 5px;">
                        Russia Leaf Rows:
                        <button v-on:click="setRussiaHeight(42)">42px</button>
                        <button v-on:click="setRussiaHeight(75)">75px</button>
                        <button v-on:click="setRussiaHeight(125)">125px</button>
                    </div>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :rowData="rowData"
                :animateRows="true"
                :groupDefaultExpanded="groupDefaultExpanded"
                :getRowHeight="getRowHeight"></ag-grid-vue>
            </div>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: "country", rowGroup: true },
        { field: "athlete" },
        { field: "date" },
        { field: "sport" },
        { field: "gold" },
        { field: "silver" },
        { field: "bronze" },
        { field: "total" },
      ],
      gridApi: null,
      columnApi: null,

      rowData: null,
      groupDefaultExpanded: null,
    };
  },
  created() {
    this.rowData = getData();
    this.groupDefaultExpanded = 1;
  },
  methods: {
    setSwimmingHeight(height) {
      swimmingHeight = height;
      this.gridApi.resetRowHeights();
    },
    setGroupHeight(height) {
      groupHeight = height;
      this.gridApi.resetRowHeights();
    },
    setRussiaHeight(height) {
      // this is used next time resetRowHeights is called
      russiaHeight = height;
      this.gridApi.forEachNode(function (rowNode) {
        if (rowNode.data && rowNode.data.country === "Russia") {
          rowNode.setRowHeight(height);
        }
      });
      this.gridApi.onRowHeightChanged();
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
    getRowHeight(params) {
      if (params.node.group && groupHeight != null) {
        return groupHeight;
      } else if (
        params.data &&
        params.data.country === "Russia" &&
        russiaHeight != null
      ) {
        return russiaHeight;
      } else if (
        params.data &&
        params.data.sport === "Swimming" &&
        swimmingHeight != null
      ) {
        return swimmingHeight;
      }
    },
  },
};

var swimmingHeight;

var groupHeight;

var russiaHeight;

createApp(VueExample).mount("#app");
