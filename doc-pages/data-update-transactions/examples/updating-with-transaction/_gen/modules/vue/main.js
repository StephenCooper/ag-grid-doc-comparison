import Vue from "vue";
import { AgGridVue } from "@ag-grid-community/vue";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <div style="height: 100%; display: flex; flex-direction: column;">
                <div style="margin-bottom: 4px;">
                    <button v-on:click="addItems()">Add Items</button>
                    <button v-on:click="addItems(2)">Add Items addIndex=2</button>
                    <button v-on:click="updateItems()">Update Top 2</button>
                    <button v-on:click="onRemoveSelected()">Remove Selected</button>
                    <button v-on:click="getRowData()">Get Row Data</button>
                    <button v-on:click="clearData()">Clear Data</button>
                </div>
                <div style="flex-grow: 1;">
                    <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"
                :rowSelection="rowSelection"
                :animateRows="true"></ag-grid-vue>
                </div>
            </div>
        </div>
    `,
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: "make" },
        { field: "model" },
        { field: "price" },
        { field: "zombies" },
        { field: "style" },
        { field: "clothes" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
      },
      rowData: null,
      rowSelection: null,
    };
  },
  created() {
    this.rowData = getData();
    this.rowSelection = "multiple";
  },
  methods: {
    getRowData() {
      const rowData = [];
      this.gridApi.forEachNode(function (node) {
        rowData.push(node.data);
      });
      console.log("Row Data:");
      console.log(rowData);
    },
    clearData() {
      this.gridApi.setRowData([]);
    },
    addItems(addIndex) {
      const newItems = [
        createNewRowData(),
        createNewRowData(),
        createNewRowData(),
      ];
      const res = this.gridApi.applyTransaction({
        add: newItems,
        addIndex: addIndex,
      });
      printResult(res);
    },
    updateItems() {
      // update the first 5 items
      const itemsToUpdate = [];
      this.gridApi.forEachNodeAfterFilterAndSort(function (rowNode, index) {
        // only do first 5
        if (index >= 2) {
          return;
        }
        const data = rowNode.data;
        data.price = Math.floor(Math.random() * 20000 + 20000);
        itemsToUpdate.push(data);
      });
      const res = this.gridApi.applyTransaction({ update: itemsToUpdate });
      printResult(res);
    },
    onRemoveSelected() {
      const selectedData = this.gridApi.getSelectedRows();
      const res = this.gridApi.applyTransaction({ remove: selectedData });
      printResult(res);
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

window.createNewRowData = function createNewRowData() {
  const newData = {
    make: "Toyota " + newCount,
    model: "Celica " + newCount,
    price: 35000 + newCount * 17,
    zombies: "Headless",
    style: "Little",
    clothes: "Airbag",
  };
  newCount++;
  return newData;
};

window.printResult = function printResult(res) {
  console.log("---------------------------------------");
  if (res.add) {
    res.add.forEach(function (rowNode) {
      console.log("Added Row Node", rowNode);
    });
  }
  if (res.remove) {
    res.remove.forEach(function (rowNode) {
      console.log("Removed Row Node", rowNode);
    });
  }
  if (res.update) {
    res.update.forEach(function (rowNode) {
      console.log("Updated Row Node", rowNode);
    });
  }
};

let newCount = 1;

new Vue({
  el: "#app",
  components: {
    "my-component": VueExample,
  },
});
