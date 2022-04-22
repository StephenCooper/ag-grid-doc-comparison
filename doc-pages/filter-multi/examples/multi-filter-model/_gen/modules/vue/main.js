import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { AgGridVue } from '@ag-grid-community/vue';
import { ClipboardModule } from '@ag-grid-enterprise/clipboard';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { MultiFilterModule } from '@ag-grid-enterprise/multi-filter';
import { SetFilterModule } from '@ag-grid-enterprise/set-filter';
import Vue from 'vue';

// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MultiFilterModule,
  SetFilterModule,
  MenuModule,
  ClipboardModule,
]);

const VueExample = {
  template: `
        <div style="height: 100%">
            <div class="example-wrapper">
                <div style="margin-bottom: 1rem;">
                    <button v-on:click="printState()">Print State</button>
                    <button v-on:click="saveState()">Save State</button>
                    <button v-on:click="restoreState()">Restore State</button>
                    <button v-on:click="resetState()">Reset State</button>
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
        { field: 'athlete', filter: 'agMultiColumnFilter' },
        {
          field: 'country',
          filter: 'agMultiColumnFilter',
          filterParams: {
            filters: [
              {
                filter: 'agTextColumnFilter',
                filterParams: { defaultOption: 'startsWith' },
              },
              { filter: 'agSetColumnFilter' },
            ],
          },
        },
        {
          field: 'gold',
          filter: 'agMultiColumnFilter',
          filterParams: {
            filters: [
              { filter: 'agNumberColumnFilter' },
              { filter: 'agSetColumnFilter' },
            ],
          },
        },
        {
          field: 'date',
          filter: 'agMultiColumnFilter',
          filterParams: dateFilterParams,
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 200,
        resizable: true,
        menuTabs: ['filterMenuTab'],
      },
      rowData: null,
    };
  },
  created() {},
  methods: {
    printState() {
      var filterState = this.gridApi.getFilterModel();
      console.log('Current filter state: ', filterState);
    },
    saveState() {
      savedFilterState = this.gridApi.getFilterModel();
      console.log('Filter state saved');
    },
    restoreState() {
      this.gridApi.setFilterModel(savedFilterState);
      console.log('Filter state restored');
    },
    resetState() {
      this.gridApi.setFilterModel(null);
      console.log('Filter state reset');
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

window.getDate = function getDate(value) {
  var dateParts = value.split('/');
  return new Date(
    Number(dateParts[2]),
    Number(dateParts[1]) - 1,
    Number(dateParts[0])
  );
};

var dateFilterParams = {
  filters: [
    {
      filter: 'agDateColumnFilter',
      filterParams: {
        comparator: (filterDate, cellValue) => {
          if (cellValue == null) return -1;
          return getDate(cellValue).getTime() - filterDate.getTime();
        },
      },
    },
    {
      filter: 'agSetColumnFilter',
      filterParams: {
        comparator: (a, b) => {
          return getDate(a).getTime() - getDate(b).getTime();
        },
      },
    },
  ],
};

var savedFilterState;

new Vue({
  el: '#app',
  components: {
    'my-component': VueExample,
  },
});
