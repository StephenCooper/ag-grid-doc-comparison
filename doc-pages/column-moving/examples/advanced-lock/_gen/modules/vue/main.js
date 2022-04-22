import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { AgGridVue } from '@ag-grid-community/vue';
import Vue from 'vue';
import ControlsCellRenderer from './controlsCellRendererVue.js';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div class="legend-bar">
                    <button v-on:click="onPinAthlete()">Pin Athlete</button>
                    <button v-on:click="onUnpinAthlete()">Un-Pin Athlete</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span class="locked-col legend-box"></span> Position Locked Column
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :suppressDragLeaveHidesColumns="true"
                :rowData="rowData"
                @column-pinned="onColumnPinned"></ag-grid-vue>
            </div>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
    ControlsCellRenderer,
  },
  data: function () {
    return {
      columnDefs: [
        {
          lockPosition: 'left',
          valueGetter: 'node.rowIndex',
          cellClass: 'locked-col',
          width: 60,
          suppressNavigable: true,
        },
        {
          lockPosition: 'left',
          cellRenderer: 'ControlsCellRenderer',
          cellClass: 'locked-col',
          width: 120,
          suppressNavigable: true,
        },
        { field: 'athlete' },
        { field: 'age' },
        { field: 'country' },
        { field: 'year' },
        { field: 'date' },
        { field: 'sport' },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        width: 150,
        resizable: true,
      },
      rowData: null,
    };
  },
  created() {},
  methods: {
    onColumnPinned(event) {
      const allCols = event.columnApi.getAllGridColumns();
      const allFixedCols = allCols.filter(
        (col) => col.getColDef().lockPosition
      );
      const allNonFixedCols = allCols.filter(
        (col) => !col.getColDef().lockPosition
      );
      const pinnedCount = allNonFixedCols.filter(
        (col) => col.getPinned() === 'left'
      ).length;
      const pinFixed = pinnedCount > 0;
      const columnStates = [];
      allFixedCols.forEach((col) => {
        if (pinFixed !== col.isPinned()) {
          columnStates.push({
            colId: col.getId(),
            pinned: pinFixed ? 'left' : null,
          });
        }
      });
      if (columnStates.length > 0) {
        event.columnApi.applyColumnState({ state: columnStates });
      }
    },
    onPinAthlete() {
      this.gridColumnApi.applyColumnState({
        state: [{ colId: 'athlete', pinned: 'left' }],
      });
    },
    onUnpinAthlete() {
      this.gridColumnApi.applyColumnState({
        state: [{ colId: 'athlete', pinned: null }],
      });
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => params.api.setRowData(data);

      fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

new Vue({
  el: '#app',
  components: {
    'my-component': VueExample,
  },
});
