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
            <div class="wrapper">
                <div class="legend-bar">
                    <span class="legend-box locked-col"></span> Position Locked Column
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span class="legend-box suppress-movable-col"></span> Suppress Movable Column
                </div>
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :suppressDragLeaveHidesColumns="true"
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
          field: 'athlete',
          suppressMovable: true,
          cellClass: 'suppress-movable-col',
        },
        { field: 'age', lockPosition: 'left', cellClass: 'locked-col' },
        { field: 'country' },
        { field: 'year' },
        { field: 'total', lockPosition: 'right', cellClass: 'locked-col' },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        lockPinned: true, // Dont allow pinning for this example
      },
      rowData: null,
    };
  },
  created() {},
  methods: {
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
