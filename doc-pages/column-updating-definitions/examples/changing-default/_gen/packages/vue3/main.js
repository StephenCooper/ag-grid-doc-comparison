import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridVue } from 'ag-grid-vue3';
import { createApp } from 'vue';

const VueExample = {
  template: `
      <div style="height: 100%">
      <div class="test-container">
        <div class="test-header">
          <button v-on:click="onBtWithDefault()">Set Columns with Initials</button>
          <button v-on:click="onBtRemove()">Remove Columns</button>
        </div>
        <ag-grid-vue
            style="width: 100%; height: 100%;"
            class="ag-theme-alpine"
            id="myGrid"
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
      columnDefs: [],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        initialWidth: 100,
        sortable: true,
        resizable: true,
      },
      rowData: null,
    };
  },
  beforeMount() {
    this.columnDefs = this.getColumnDefs();
  },
  methods: {
    onBtWithDefault() {
      this.gridApi.setColumnDefs(this.getColumnDefs());
    },
    onBtRemove() {
      this.gridApi.setColumnDefs([]);
    },
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
    getColumnDefs() {
      return [
        {
          field: 'athlete',
          initialWidth: 100,
          initialSort: 'asc',
        },
        { field: 'age' },
        {
          field: 'country',
          initialPinned: 'left',
        },
        { field: 'sport' },
        { field: 'year' },
        { field: 'date' },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
        { field: 'total' },
      ];
    },
  },
};

createApp(VueExample).mount('#app');
