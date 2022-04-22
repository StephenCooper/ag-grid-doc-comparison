import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridVue } from 'ag-grid-vue3';
import { createApp } from 'vue';
import CustomCellRenderer from './customCellRendererVue.js';

const VueExample = {
  template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :rowDragManaged="true"
                :animateRows="true"
                :rowData="rowData"></ag-grid-vue>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
    CustomCellRenderer,
  },
  data: function () {
    return {
      columnDefs: [
        {
          field: 'athlete',
          cellClass: 'custom-athlete-cell',
          cellRenderer: 'CustomCellRenderer',
        },
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
