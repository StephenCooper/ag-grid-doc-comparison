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
                :groupDisplayType="groupDisplayType"
                :enableRangeSelection="true"
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
        {
          headerName: 'Group',
          cellRenderer: 'agGroupCellRenderer',
          showRowGroup: true,
          minWidth: 210,
        },
        { field: 'country', rowGroup: true, hide: true },
        { field: 'year', rowGroup: true, hide: true },
        { field: 'athlete', minWidth: 200 },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
      ],
      gridApi: null,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        sortable: true,
        resizable: true,
      },
      groupDisplayType: null,
      rowData: null,
    };
  },
  created() {
    this.groupDisplayType = 'custom';
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
