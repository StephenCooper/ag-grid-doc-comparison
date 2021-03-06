import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { AgGridVue } from '@ag-grid-community/vue';
import Vue from 'vue';
import MedalCellRenderer from './medalCellRendererVue.js';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([ClientSideRowModelModule]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div style="margin-bottom: 5px;">
                    <button v-on:click="onCallGold()">Gold</button>
                    <button v-on:click="onFirstRowGold()">First Row Gold</button>
                    <button v-on:click="onCallAllCells()">All Cells</button>
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
    MedalCellRenderer,
  },
  data: function () {
    return {
      columnDefs: [
        { field: 'athlete', width: 150 },
        { field: 'country', width: 150 },
        { field: 'year', width: 100 },
        { field: 'gold', width: 100, cellRenderer: 'MedalCellRenderer' },
        { field: 'silver', width: 100, cellRenderer: 'MedalCellRenderer' },
        { field: 'bronze', width: 100, cellRenderer: 'MedalCellRenderer' },
        { field: 'total', width: 100 },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        editable: true,
        sortable: true,
        flex: 1,
        minWidth: 100,
        filter: true,
        resizable: true,
      },
      rowData: null,
    };
  },
  created() {},
  methods: {
    onCallGold() {
      console.log('=========> calling all gold');
      // pass in list of columns, here it's gold only
      const params = { columns: ['gold'] };
      const instances = this.gridApi.getCellRendererInstances(params);
      instances.forEach((instance) => {
        instance.medalUserFunction();
      });
    },
    onFirstRowGold() {
      console.log('=========> calling gold row one');
      // pass in one column and one row to identify one cell
      const firstRowNode = this.gridApi.getDisplayedRowAtIndex(0);
      const params = { columns: ['gold'], rowNodes: [firstRowNode] };
      const instances = this.gridApi.getCellRendererInstances(params);
      instances.forEach((instance) => {
        instance.medalUserFunction();
      });
    },
    onCallAllCells() {
      console.log('=========> calling everything');
      // no params, goes through all rows and columns where cell renderer exists
      const instances = this.gridApi.getCellRendererInstances();
      instances.forEach((instance) => {
        instance.medalUserFunction();
      });
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const updateData = (data) => {
        this.rowData = data;
      };

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
