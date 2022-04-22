import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { AgGridVue } from '@ag-grid-community/vue';
import { ClipboardModule } from '@ag-grid-enterprise/clipboard';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import Vue from 'vue';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  RangeSelectionModule,
  ClipboardModule,
]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div>
                    <span class="button-group">
                        <label>Available Undo's</label>
                        <input id="undoInput" class="undo-redo-input">
                        <label>Available Redo's</label>
                        <input id="redoInput" class="undo-redo-input">
                        <button id="undoBtn" class="undo-btn" v-on:click="undo()">Undo</button>
                        <button id="redoBtn" class="redo-btn" v-on:click="redo()">Redo</button>
                    </span>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"
                :enableRangeSelection="true"
                :enableFillHandle="true"
                :undoRedoCellEditing="true"
                :undoRedoCellEditingLimit="undoRedoCellEditingLimit"
                :enableCellChangeFlash="true"
                @first-data-rendered="onFirstDataRendered"
                @cell-value-changed="onCellValueChanged"></ag-grid-vue>
            </div>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: 'a' },
        { field: 'b' },
        { field: 'c' },
        { field: 'd' },
        { field: 'e' },
        { field: 'f' },
        { field: 'g' },
        { field: 'h' },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        editable: true,
      },
      rowData: null,
      undoRedoCellEditingLimit: null,
    };
  },
  created() {
    this.rowData = getRows();
    this.undoRedoCellEditingLimit = 5;
  },
  methods: {
    onFirstDataRendered() {
      setValue('#undoInput', 0);
      disable('#undoInput', true);
      disable('#undoBtn', true);
      setValue('#redoInput', 0);
      disable('#redoInput', true);
      disable('#redoBtn', true);
    },
    onCellValueChanged(params) {
      var undoSize = params.api.getCurrentUndoSize();
      setValue('#undoInput', undoSize);
      disable('#undoBtn', undoSize < 1);
      var redoSize = params.api.getCurrentRedoSize();
      setValue('#redoInput', redoSize);
      disable('#redoBtn', redoSize < 1);
    },
    undo() {
      this.gridApi.undoCellEditing();
    },
    redo() {
      this.gridApi.redoCellEditing();
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

window.disable = function disable(id, disabled) {
  document.querySelector(id).disabled = disabled;
};

window.setValue = function setValue(id, value) {
  document.querySelector(id).value = value;
};

window.getRows = function getRows() {
  return Array.apply(null, Array(100)).map(function (_, i) {
    return {
      a: 'a-' + i,
      b: 'b-' + i,
      c: 'c-' + i,
      d: 'd-' + i,
      e: 'e-' + i,
      f: 'f-' + i,
      g: 'g-' + i,
      h: 'h-' + i,
    };
  });
};

new Vue({
  el: '#app',
  components: {
    'my-component': VueExample,
  },
});
