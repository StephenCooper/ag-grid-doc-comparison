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
            <div class="example-wrapper">
                <div class="legend-bar">
                    <span class="legend-box resizable-header"></span> Resizable Column
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span class="legend-box fixed-size-header"></span> Fixed Width Column
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
          headerName: 'Everything Resizes',
          children: [
            { field: 'athlete', headerClass: 'resizable-header' },
            { field: 'age', headerClass: 'resizable-header' },
            { field: 'country', headerClass: 'resizable-header' },
          ],
        },
        {
          headerName: 'Only Year Resizes',
          children: [
            { field: 'year', headerClass: 'resizable-header' },
            {
              field: 'date',
              resizable: false,
              headerClass: 'fixed-size-header',
            },
            {
              field: 'sport',
              resizable: false,
              headerClass: 'fixed-size-header',
            },
          ],
        },
        {
          headerName: 'Nothing Resizes',
          children: [
            {
              field: 'gold',
              resizable: false,
              headerClass: 'fixed-size-header',
            },
            {
              field: 'silver',
              resizable: false,
              headerClass: 'fixed-size-header',
            },
            {
              field: 'bronze',
              resizable: false,
              headerClass: 'fixed-size-header',
            },
            {
              field: 'total',
              resizable: false,
              headerClass: 'fixed-size-header',
            },
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
