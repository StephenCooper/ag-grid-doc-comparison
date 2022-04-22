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
                :rowData="rowData"></ag-grid-vue>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        {
          headerName: 'Athlete Details',
          marryChildren: true,
          children: [
            { field: 'athlete', colId: 'athlete' },
            { field: 'country', colId: 'country' },
          ],
        },
        { field: 'age', colId: 'age' },
        {
          headerName: 'Sports Results',
          marryChildren: true,
          children: [
            { field: 'sport', colId: 'sport' },
            { field: 'total', colId: 'total' },
            { field: 'gold', colId: 'gold' },
            { field: 'silver', colId: 'silver' },
            { field: 'bronze', colId: 'bronze' },
          ],
        },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        resizable: true,
        width: 160,
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

createApp(VueExample).mount('#app');
