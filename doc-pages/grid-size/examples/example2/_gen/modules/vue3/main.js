import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { AgGridVue } from '@ag-grid-community/vue3';
import { createApp } from 'vue';

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
                :rowData="rowData"
                :getRowHeight="getRowHeight"
                @first-data-rendered="onFirstDataRendered"
                @grid-size-changed="onGridSizeChanged"></ag-grid-vue>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: 'athlete', minWidth: 150 },
        { field: 'age', minWidth: 70, maxWidth: 90 },
        { field: 'country', minWidth: 130 },
        { field: 'year', minWidth: 70, maxWidth: 90 },
        { field: 'date', minWidth: 120 },
        { field: 'sport', minWidth: 120 },
        { field: 'gold', minWidth: 80 },
        { field: 'silver', minWidth: 80 },
        { field: 'bronze', minWidth: 80 },
        { field: 'total', minWidth: 80 },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        resizable: true,
      },
      rowData: null,
      getRowHeight: null,
    };
  },
  created() {
    this.rowData = getData();
    this.getRowHeight = (params) => {
      return currentRowHeight;
    };
  },
  methods: {
    onFirstDataRendered(params) {
      updateRowHeight(params);
    },
    onGridSizeChanged(params) {
      updateRowHeight(params);
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      minRowHeight = params.api.getSizesForCurrentTheme().rowHeight;
      currentRowHeight = minRowHeight;
      params.api.sizeColumnsToFit();
    },
  },
};

var minRowHeight = 25;

var currentRowHeight;

const updateRowHeight = (params) => {
  // get the height of the grid body - this excludes the height of the headers
  const bodyViewport = document.querySelector('.ag-body-viewport');
  if (!bodyViewport) {
    return;
  }
  var gridHeight = bodyViewport.clientHeight;
  // get the rendered rows
  var renderedRowCount = params.api.getDisplayedRowCount();
  // if the rendered rows * min height is greater than available height, just just set the height
  // to the min and let the scrollbar do its thing
  if (renderedRowCount * minRowHeight >= gridHeight) {
    if (currentRowHeight !== minRowHeight) {
      currentRowHeight = minRowHeight;
      params.api.resetRowHeights();
    }
  } else {
    // set the height of the row to the grid height / number of rows available
    currentRowHeight = Math.floor(gridHeight / renderedRowCount);
    params.api.resetRowHeights();
  }
};

createApp(VueExample).mount('#app');
