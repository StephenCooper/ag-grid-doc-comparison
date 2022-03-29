import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "ag-grid-enterprise";
import { AgGridVue } from "ag-grid-vue3";
import { createApp } from "vue";

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div style="margin-bottom: 5px;">
                    <div>
                        <button class="bt-action" v-on:click="onAddRow('For Sale')">Add For Sale</button>
                        <button class="bt-action" v-on:click="onAddRow('In Workshop')">Add In Workshop</button>
                        <button class="bt-action" v-on:click="onRemoveSelected()">Remove Selected</button>
                        <button class="bt-action" v-on:click="getRowData()">Get Row Data</button>
                    </div>
                    <div style="margin-top: 5px;">
                        <button class="bt-action" v-on:click="onMoveToGroup('For Sale')">Move to For Sale</button>
                        <button class="bt-action" v-on:click="onMoveToGroup('In Workshop')">Move to In Workshop</button>
                        <button class="bt-action" v-on:click="onMoveToGroup('Sold')">Move to Sold</button>
                    </div>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :autoGroupColumnDef="autoGroupColumnDef"
                :groupDefaultExpanded="groupDefaultExpanded"
                :rowData="rowData"
                :suppressRowClickSelection="true"
                :rowSelection="rowSelection"
                :animateRows="true"
                :groupSelectsChildren="true"
                :suppressAggFuncInHeader="true"
                :getRowClass="getRowClass"></ag-grid-vue>
            </div>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: "category", rowGroupIndex: 1, hide: true },
        { field: "price", aggFunc: "sum", valueFormatter: poundFormatter },
        { field: "zombies" },
        { field: "style" },
        { field: "clothes" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        width: 100,
        sortable: true,
      },
      autoGroupColumnDef: null,
      groupDefaultExpanded: null,
      rowData: null,
      rowSelection: null,
      getRowClass: null,
    };
  },
  created() {
    this.autoGroupColumnDef = {
      headerName: "Group",
      minWidth: 250,
      field: "model",
      rowGroupIndex: 1,
      cellRenderer: "agGroupCellRenderer",
      cellRendererParams: {
        checkbox: true,
      },
    };
    this.groupDefaultExpanded = 1;
    this.rowData = getData();
    this.rowSelection = "multiple";
    this.getRowClass = (params) => {
      var rowNode = params.node;
      if (rowNode.group) {
        switch (rowNode.key) {
          case "In Workshop":
            return "category-in-workshop";
          case "Sold":
            return "category-sold";
          case "For Sale":
            return "category-for-sale";
          default:
            return undefined;
        }
      } else {
        // no extra classes for leaf rows
        return undefined;
      }
    };
  },
  methods: {
    getRowData() {
      var rowData = [];
      this.gridApi.forEachNode(function (node) {
        rowData.push(node.data);
      });
      console.log("Row Data:");
      console.log(rowData);
    },
    onAddRow(category) {
      var rowDataItem = createNewRowData(category);
      this.gridApi.applyTransaction({ add: [rowDataItem] });
    },
    onMoveToGroup(category) {
      var selectedRowData = this.gridApi.getSelectedRows();
      selectedRowData.forEach(function (dataItem) {
        dataItem.category = category;
      });
      this.gridApi.applyTransaction({ update: selectedRowData });
    },
    onRemoveSelected() {
      var selectedRowData = this.gridApi.getSelectedRows();
      this.gridApi.applyTransaction({ remove: selectedRowData });
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

window.poundFormatter = function poundFormatter(params) {
  return (
    "£" +
    Math.floor(params.value)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  );
};

createApp(VueExample).mount("#app");
