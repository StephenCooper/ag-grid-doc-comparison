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
          headerName: 'Set filter column',
          field: 'value',
          flex: 1,
          filter: 'agSetColumnFilter',
          floatingFilter: true,
          filterParams: filterParams,
        },
      ],
      gridApi: null,
      columnApi: null,

      rowData: null,
    };
  },
  created() {
    this.rowData = [
      { value: 'value 1' },
      { value: 'value 1' },
      { value: 'value 1' },
      { value: 'value 1' },
      { value: 'value 2' },
      { value: 'value 2' },
      { value: 'value 2' },
      { value: 'value 2' },
      { value: 'value 2' },
    ];
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
  },
};

var filterParams = {
  values: function (params) {
    setTimeout(function () {
      params.success(['value 1', 'value 2']);
    }, 3000);
  },
};

createApp(VueExample).mount('#app');
