import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { AgGridVue } from '@ag-grid-community/vue';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';
import Vue from 'vue';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule, RowGroupingModule]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="test-container">
                <div class="test-header">
                    <div class="example-section">
                        Column State:
                        <button v-on:click="saveState()">Save State</button>
                        <button v-on:click="restoreState()">Restore State</button>
                        <button v-on:click="resetState()">Reset State</button>
                    </div>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"></ag-grid-vue>
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
          headerName: 'Athlete',
          children: [
            { field: 'athlete' },
            { field: 'country', columnGroupShow: 'open' },
            { field: 'sport', columnGroupShow: 'open' },
            { field: 'year', columnGroupShow: 'open' },
            { field: 'date', columnGroupShow: 'open' },
          ],
        },
        {
          headerName: 'Medals',
          children: [
            { field: 'total', columnGroupShow: 'closed' },
            { field: 'gold', columnGroupShow: 'open' },
            { field: 'silver', columnGroupShow: 'open' },
            { field: 'bronze', columnGroupShow: 'open' },
          ],
        },
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
    saveState() {
      window.groupState = this.gridColumnApi.getColumnGroupState();
      console.log('group state saved', window.groupState);
      console.log('column state saved');
    },
    restoreState() {
      if (!window.groupState) {
        console.log(
          'no columns state to restore by, you must save state first'
        );
        return;
      }
      this.gridColumnApi.setColumnGroupState(window.groupState);
      console.log('column state restored');
    },
    resetState() {
      this.gridColumnApi.resetColumnGroupState();
      console.log('column state reset');
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
