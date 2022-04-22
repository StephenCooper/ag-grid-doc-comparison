import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { AgGridVue } from 'ag-grid-vue';
import Vue from 'vue';

const VueExample = {
  template: `
        <div style="height: 100%">
            <div style="height: 100%; display: flex; flex-direction: column;">
                <div style="margin-bottom: 5px;">
                    <button v-on:click="saveState()">Save State</button>
                    <button v-on:click="restoreState()">Restore State</button>
                    <button v-on:click="printState()">Print State</button>
                    <button v-on:click="resetState()">Reset State</button>
                    <button v-on:click="togglePivotMode()">Toggle Pivot Mode</button>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :autoGroupColumnDef="autoGroupColumnDef"
                :sideBar="true"
                :pivotMode="true"
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
        { field: 'athlete', enableRowGroup: true, enablePivot: true },
        { field: 'age', enableValue: true },
        {
          field: 'country',
          enableRowGroup: true,
          enablePivot: true,
          rowGroup: true,
        },
        { field: 'year', enableRowGroup: true, enablePivot: true },
        { field: 'date', enableRowGroup: true, enablePivot: true },
        {
          field: 'sport',
          enableRowGroup: true,
          enablePivot: true,
          pivot: true,
        },
        { field: 'gold', enableValue: true, aggFunc: 'sum' },
        { field: 'silver', enableValue: true, aggFunc: 'sum' },
        { field: 'bronze', enableValue: true },
        { field: 'total', enableValue: true },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        filter: true,
        resizable: true,
      },
      autoGroupColumnDef: null,
      rowData: null,
    };
  },
  created() {
    this.autoGroupColumnDef = {
      minWidth: 300,
    };
  },
  methods: {
    printState() {
      var state = this.gridColumnApi.getColumnState();
      console.log(state);
    },
    saveState() {
      savedState = this.gridColumnApi.getColumnState();
      savedPivotMode = this.gridColumnApi.isPivotMode();
      console.log('column state saved');
    },
    restoreState() {
      if (savedState) {
        // Pivot mode must be set first otherwise the columns we're trying to set state for won't exist yet
        this.gridColumnApi.setPivotMode(savedPivotMode);
        this.gridColumnApi.applyColumnState({
          state: savedState,
          applyOrder: true,
        });
        console.log('column state restored');
      } else {
        console.log('no previous column state to restore!');
      }
    },
    togglePivotMode() {
      var pivotMode = this.gridColumnApi.isPivotMode();
      this.gridColumnApi.setPivotMode(!pivotMode);
    },
    resetState() {
      this.gridColumnApi.resetColumnState();
      this.gridColumnApi.setPivotMode(false);
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

var savedState;

var savedPivotMode;

new Vue({
  el: '#app',
  components: {
    'my-component': VueExample,
  },
});
