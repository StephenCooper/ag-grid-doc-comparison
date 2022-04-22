import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { AgGridVue } from '@ag-grid-community/vue';
import Vue from 'vue';

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
                :rowSelection="rowSelection"
                :suppressRowClickSelection="true"
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
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        {
          valueGetter: "'Drag'",
          dndSource: true,
          dndSourceOnRowDrag: onRowDrag,
          checkboxSelection: true,
        },
        { field: 'id' },
        { field: 'color' },
        { field: 'value1' },
        { field: 'value2' },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        width: 80,
        sortable: true,
        filter: true,
        resizable: true,
      },
      rowSelection: null,
      rowClassRules: null,
      rowData: null,
    };
  },
  created() {
    this.rowSelection = 'multiple';
    this.rowClassRules = {
      'red-row': 'data.color == "Red"',
      'green-row': 'data.color == "Green"',
      'blue-row': 'data.color == "Blue"',
    };
    this.rowData = getData();
  },
  methods: {
    onDragOver(event) {
      var dragSupported = event.dataTransfer.types.length;
      if (dragSupported) {
        event.dataTransfer.dropEffect = 'move';
      }
      event.preventDefault();
    },
    onDrop(event) {
      event.preventDefault();
      var jsonData = event.dataTransfer.getData('application/json');
      var eJsonRow = document.createElement('div');
      eJsonRow.classList.add('json-row');
      eJsonRow.innerText = jsonData;
      var eJsonDisplay = document.querySelector('#eJsonDisplay');
      eJsonDisplay.appendChild(eJsonRow);
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

window.onRowDrag = function onRowDrag(params) {
  // create the data that we want to drag
  var rowNode = params.rowNode;
  var e = params.dragEvent;
  var jsonObject = {
    grid: 'GRID_001',
    operation: 'Drag on Column',
    rowId: rowNode.data.id,
    selected: rowNode.isSelected(),
  };
  var jsonData = JSON.stringify(jsonObject);
  e.dataTransfer.setData('application/json', jsonData);
  e.dataTransfer.setData('text/plain', jsonData);
};

new Vue({
  el: '#app',
  components: {
    'my-component': VueExample,
  },
});
