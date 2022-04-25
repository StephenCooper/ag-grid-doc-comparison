import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridVue } from 'ag-grid-vue';
import Vue from 'vue';

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div class="toolbar">
                    <label><input type="checkbox"> Enable suppressMoveWhenRowDragging</label>
                </div>
                <div class="drop-containers">
                    <div class="grid-wrapper">
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
                    <div class="drop-col">
                        <span id="eDropTarget" class="drop-target">==&gt; Drop to here</span>
                        <div class="tile-container"></div>
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
        { field: 'id', rowDrag: true },
        { field: 'color' },
        { field: 'value1' },
        { field: 'value2' },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        sortable: true,
        filter: true,
        resizable: true,
        flex: 1,
      },
      rowClassRules: null,
      rowData: null,
    };
  },
  created() {
    this.rowClassRules = {
      'red-row': 'data.color == "Red"',
      'green-row': 'data.color == "Green"',
      'blue-row': 'data.color == "Blue"',
    };
    this.rowData = createRowData();
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      addDropZones(params);
      addCheckboxListener(params);
    },
  },
};

window.addCheckboxListener = function addCheckboxListener(params) {
  var checkbox = document.querySelector('input[type=checkbox]');
  checkbox.addEventListener('change', function () {
    params.api.setSuppressMoveWhenRowDragging(checkbox.checked);
  });
};

window.createRowData = function createRowData() {
  var data = [];
  [
    'Red',
    'Green',
    'Blue',
    'Red',
    'Green',
    'Blue',
    'Red',
    'Green',
    'Blue',
  ].forEach(function (color) {
    var newDataItem = {
      id: rowIdSequence++,
      color: color,
      value1: Math.floor(Math.random() * 100),
      value2: Math.floor(Math.random() * 100),
    };
    data.push(newDataItem);
  });
  return data;
};

window.createTile = function createTile(data) {
  var el = document.createElement('div');
  el.classList.add('tile');
  el.classList.add(data.color.toLowerCase());
  el.innerHTML =
    '<div class="id">' +
    data.id +
    '</div>' +
    '<div class="value">' +
    data.value1 +
    '</div>' +
    '<div class="value">' +
    data.value2 +
    '</div>';
  return el;
};

window.addDropZones = function addDropZones(params) {
  var tileContainer = document.querySelector('.tile-container');
  var dropZone = {
    getContainer: () => {
      return tileContainer;
    },
    onDragStop: (params) => {
      var tile = createTile(params.node.data);
      tileContainer.appendChild(tile);
    },
  };
  params.api.addRowDropZone(dropZone);
};

var rowIdSequence = 100;

new Vue({
  el: '#app',
  components: {
    'my-component': VueExample,
  },
});
