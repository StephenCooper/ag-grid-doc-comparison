import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { AgGridVue } from '@ag-grid-community/vue';
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel';
import { FiltersToolPanelModule } from '@ag-grid-enterprise/filter-tool-panel';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import Vue from 'vue';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  SetFilterModule,
  MenuModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div class="example-header">
                    <button v-on:click="getMiniFilterText()">Get Mini Filter Text</button>
                    <button v-on:click="saveMiniFilterText()">Save Mini Filter Text</button>
                    <button v-on:click="restoreMiniFilterText()">Restore Mini Filter Text</button>
                    <button v-on:click="resetFilter()">Reset Filter</button>
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :sideBar="sideBar"
                :rowData="rowData"></ag-grid-vue>
            </div>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [{ field: 'athlete', filter: 'agSetColumnFilter' }],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 150,
        filter: true,
        sortable: true,
      },
      sideBar: null,
      rowData: null,
    };
  },
  created() {
    this.sideBar = 'filters';
  },
  methods: {
    getMiniFilterText() {
      const athleteFilter = this.gridApi.getFilterInstance('athlete');
      console.log(athleteFilter.getMiniFilter());
    },
    saveMiniFilterText() {
      const athleteFilter = this.gridApi.getFilterInstance('athlete');
      savedMiniFilterText = athleteFilter.getMiniFilter();
    },
    restoreMiniFilterText() {
      const athleteFilter = this.gridApi.getFilterInstance('athlete');
      athleteFilter.setMiniFilter(savedMiniFilterText);
    },
    resetFilter() {
      const athleteFilter = this.gridApi.getFilterInstance('athlete');
      athleteFilter.setModel(null);
      this.gridApi.onFilterChanged();
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      params.api.getToolPanelInstance('filters').expandFilters();

      const updateData = (data) => params.api.setRowData(data);

      fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
        .then((resp) => resp.json())
        .then((data) => updateData(data));
    },
  },
};

let savedMiniFilterText = '';

new Vue({
  el: '#app',
  components: {
    'my-component': VueExample,
  },
});
