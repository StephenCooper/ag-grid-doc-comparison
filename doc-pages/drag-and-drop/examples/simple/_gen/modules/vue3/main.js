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
            <div class="outer">
                <div class="grid-col">
                    <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowClassRules="rowClassRules"
                :rowData="rowData"
                :rowDragManaged="true"
                :animateRows="true"></ag-grid-vue>
                </div>
                <div class="drop-col" v-on:dragover="onDragOver($event)" v-on:drop="onDrop($event)">
                    <span id="eDropTarget" class="drop-target">
                        ==&gt; Drop to here
                    </span>
                    <div id="eJsonDisplay" class="json-display">
                    </div>
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
        { valueGetter: "'Drag'", dndSource: true },
        { field: "id" },
        { field: "color" },
        { field: "value1" },
        { field: "value2" },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        width: 80,
        sortable: true,
        filter: true,
        resizable: true,
      },
      rowClassRules: null,
      rowData: null,
    };
  },
  created() {
    this.rowClassRules = {
      "red-row": 'data.color == "Red"',
      "green-row": 'data.color == "Green"',
      "blue-row": 'data.color == "Blue"',
    };
    this.rowData = getData();
  },
  methods: {
    onDragOver(event) {
      var dragSupported = event.dataTransfer.length;
      if (dragSupported) {
        event.dataTransfer.dropEffect = "move";
      }
      event.preventDefault();
    },
    onDrop(event) {
      var jsonData = event.dataTransfer.getData("application/json");
      var eJsonRow = document.createElement("div");
      eJsonRow.classList.add("json-row");
      eJsonRow.innerText = jsonData;
      var eJsonDisplay = document.querySelector("#eJsonDisplay");
      eJsonDisplay.appendChild(eJsonRow);
      event.preventDefault();
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

createApp(VueExample).mount("#app");
