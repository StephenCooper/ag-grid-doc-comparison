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
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :animateRows="true"
                :getRowId="getRowId"
                @sort-changed="onSortChanged"
                @filter-changed="onFilterChanged"
                @row-drag-move="onRowDragMove"></ag-grid-vue>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: 'athlete', rowDrag: true },
        { field: 'country' },
        { field: 'year', width: 100 },
        { field: 'date' },
        { field: 'sport' },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        width: 170,
        sortable: true,
        filter: true,
      },
    };
  },
  created() {},
  methods: {
    // listen for change on sort changed
    onSortChanged() {
      var colState = this.gridColumnApi.getColumnState() || [];
      sortActive = colState.some((c) => c.sort);
      // suppress row drag if either sort or filter is active
      var suppressRowDrag = sortActive || filterActive;
      console.log(
        'sortActive = ' +
          sortActive +
          ', filterActive = ' +
          filterActive +
          ', allowRowDrag = ' +
          suppressRowDrag
      );
      this.gridApi.setSuppressRowDrag(suppressRowDrag);
    },
    // listen for changes on filter changed
    onFilterChanged() {
      filterActive = this.gridApi.isAnyFilterPresent();
      // suppress row drag if either sort or filter is active
      var suppressRowDrag = sortActive || filterActive;
      console.log(
        'sortActive = ' +
          sortActive +
          ', filterActive = ' +
          filterActive +
          ', allowRowDrag = ' +
          suppressRowDrag
      );
      this.gridApi.setSuppressRowDrag(suppressRowDrag);
    },
    onRowDragMove(event) {
      var movingNode = event.node;
      var overNode = event.overNode;
      var rowNeedsToMove = movingNode !== overNode;
      if (rowNeedsToMove) {
        // the list of rows we have is data, not row nodes, so extract the data
        var movingData = movingNode.data;
        var overData = overNode.data;
        var fromIndex = immutableStore.indexOf(movingData);
        var toIndex = immutableStore.indexOf(overData);
        var newStore = immutableStore.slice();
        moveInArray(newStore, fromIndex, toIndex);
        immutableStore = newStore;
        this.gridApi.setRowData(newStore);
        this.gridApi.clearFocusedCell();
      }
      function moveInArray(arr, fromIndex, toIndex) {
        var element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);
      }
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      // add id to each item, needed for immutable store to work
      immutableStore.forEach(function (data, index) {
        data.id = index;
      });
      params.api.setRowData(immutableStore);
    },
    getRowId(params) {
      return params.data.id;
    },
  },
};

var immutableStore = getData();

var sortActive = false;

var filterActive = false;

new Vue({
  el: '#app',
  components: {
    'my-component': VueExample,
  },
});
