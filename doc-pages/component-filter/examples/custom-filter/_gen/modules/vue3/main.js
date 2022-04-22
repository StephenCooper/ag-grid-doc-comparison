import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';
import { AgGridVue } from '@ag-grid-community/vue3';
import { createApp } from 'vue';
import PersonFilter from './personFilterVue.js';
import YearFilter from './yearFilterVue.js';

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
    PersonFilter,
    YearFilter,
  },
  data: function () {
    return {
      columnDefs: [
        { field: 'athlete', minWidth: 150, filter: 'PersonFilter' },
        { field: 'age', filter: 'agNumberColumnFilter' },
        { field: 'country', minWidth: 150 },
        { field: 'year', filter: 'YearFilter' },
        {
          field: 'date',
          minWidth: 130,
          filter: 'agDateColumnFilter',
          filterParams: {
            comparator: (filterLocalDateAtMidnight, cellValue) => {
              const dateAsString = cellValue;
              const dateParts = dateAsString.split('/');
              const cellDate = new Date(
                Number(dateParts[2]),
                Number(dateParts[1]) - 1,
                Number(dateParts[0])
              );
              if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
                return 0;
              }
              if (cellDate < filterLocalDateAtMidnight) {
                return -1;
              }
              if (cellDate > filterLocalDateAtMidnight) {
                return 1;
              }
            },
          },
        },
        { field: 'sport' },
        { field: 'gold', filter: 'agNumberColumnFilter' },
        { field: 'silver', filter: 'agNumberColumnFilter' },
        { field: 'bronze', filter: 'agNumberColumnFilter' },
        { field: 'total', filter: 'agNumberColumnFilter' },
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

createApp(VueExample).mount('#app');
