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
            <div id="grid-wrapper" style="width:100%; height: 100%">
                <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowData="rowData"
                @first-data-rendered="onFirstDataRendered"
                @grid-size-changed="onGridSizeChanged"></ag-grid-vue>
            </div>
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
    };
  },
  created() {},
  methods: {
    onFirstDataRendered(params) {
      params.api.sizeColumnsToFit();
    },
    onGridSizeChanged(params) {
      // get the current grids width
      var gridWidth = document.getElementById('grid-wrapper').offsetWidth;
      // keep track of which columns to hide/show
      var columnsToShow = [];
      var columnsToHide = [];
      // iterate over all columns (visible or not) and work out
      // now many columns can fit (based on their minWidth)
      var totalColsWidth = 0;
      var allColumns = params.columnApi.getAllColumns();
      if (allColumns && allColumns.length > 0) {
        for (var i = 0; i < allColumns.length; i++) {
          var column = allColumns[i];
          totalColsWidth += column.getMinWidth() || 0;
          if (totalColsWidth > gridWidth) {
            columnsToHide.push(column.getColId());
          } else {
            columnsToShow.push(column.getColId());
          }
        }
      }
      // show/hide columns based on current grid width
      params.columnApi.setColumnsVisible(columnsToShow, true);
      params.columnApi.setColumnsVisible(columnsToHide, false);
      // fill out any available space to ensure there are no gaps
      params.api.sizeColumnsToFit();
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

createApp(VueExample).mount('#app');
