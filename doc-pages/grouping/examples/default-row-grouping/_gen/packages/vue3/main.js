import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { AgGridVue } from 'ag-grid-vue3';
import { createApp } from 'vue';

const VueExample = {
  template: `
        <div style="height: 100%">
            <ag-grid-vue
                
                style="width: 100%; height: 100%;"
                class="ag-theme-alpine"
                :columnDefs="columnDefs"
                @grid-ready="onGridReady"
                :defaultColDef="defaultColDef"
                :autoGroupColumnDef="autoGroupColumnDef"
                :animateRows="true"
                :rowData="rowData"></ag-grid-vue>
        </div>
    `,
  components: {
    'ag-grid-vue': AgGridVue,
  },
  data: function () {
    return {
      columnDefs: [
        { field: 'country', rowGroup: true, hide: true },
        { field: 'year', rowGroup: true, hide: true },
        { field: 'athlete' },
        { field: 'sport' },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        minWidth: 100,
        sortable: true,
        resizable: true,
      },
      autoGroupColumnDef: null,
      rowData: null,
    };
  },
  created() {
    this.autoGroupColumnDef = {
      minWidth: 200,
    };
  },
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
